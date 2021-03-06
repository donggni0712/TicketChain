// Klaytn IDE uses solidity 0.4.24, 0.5.6 versions.
pragma solidity >=0.4.24 <=0.5.6;

contract IKIP17Receiver {
    function onKIP17Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes memory data
    ) public returns (bytes4);
}

contract TicketSimple {
    string public name = "TicketChain";
    string public symbol = "TCT";

    mapping(uint256 => address) public tokenOwner;
    mapping(uint256 => string) public tokenURIs;

    // 소유한 토큰 리스트
    mapping(address => uint256[]) private _ownedTokens;
    bytes4 private constant _KIP17_RECEIVED = 0x6745782b;

    // mint(tokenId, uri, owner)
    // transferFrom(from, to, tokenId) -> owner가 바뀌는 것(from -> to)

    function mintWithTokenURI(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) public returns (bool) {
        // to에게 tokenId(일련번호)를 발행하겠다.
        // 적힐 글자는 tokenURI
        tokenOwner[tokenId] = to;
        tokenURIs[tokenId] = tokenURI;

        // add token to the list
        _ownedTokens[to].push(tokenId);

        return true;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public {
        require(from == msg.sender, "from != msg.sender");
        require(
            from == tokenOwner[tokenId],
            "you are not the owner of the token"
        );
        //
        _removeTokenFromList(from, tokenId);
        _ownedTokens[to].push(tokenId);
        //
        tokenOwner[tokenId] = to;
        //
        require(
            _checkOnKIP17Received(from, to, tokenId, _data),
            "KIP17: transfer to non KIP17Receiver implementer"
        );
    }

    function _removeTokenFromList(address from, uint256 tokenId) private {
        // [10, 15, 19, 20] -> 19번을 삭제 하고 싶어요
        // [20, 15, 20, 19]
        // [10, 15, 20]
        uint256 lastTokenIdex = _ownedTokens[from].length - 1;
        for (uint256 i = 0; i < _ownedTokens[from].length; i++) {
            if (tokenId == _ownedTokens[from][i]) {
                // Swap last token with deleting token;
                _ownedTokens[from][i] = _ownedTokens[from][lastTokenIdex];
                _ownedTokens[from][lastTokenIdex] = tokenId;
                break;
            }
        }
        //
        _ownedTokens[from].length--;
    }

    function ownedTokens(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    function setTokenUri(uint256 id, string memory uri) public {
        tokenURIs[id] = uri;
    }

    function _checkOnKIP17Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal returns (bool) {
        bool success;
        bytes memory returndata;

        if (!isContract(to)) {
            return true;
        }

        (success, returndata) = to.call(
            abi.encodeWithSelector(
                _KIP17_RECEIVED,
                msg.sender,
                from,
                tokenId,
                _data
            )
        );
        if (
            returndata.length != 0 &&
            abi.decode(returndata, (bytes4)) == _KIP17_RECEIVED
        ) {
            return true;
        }

        return false;
    }

    function isContract(address account) internal view returns (bool) {
        // This method relies in extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}

interface other {
    function ticketPrice(uint256 tokenId) external view returns (uint256);
}

contract TicketMarket {
    mapping(uint256 => address) private seller;
    mapping(address => uint256) private _ownedticketsCount;
    mapping(address => uint256[]) private _ownedtickets;

    function getPrice(uint256 tokenId, address a)
        public
        view
        returns (uint256)
    {
        return other(a).ticketPrice(tokenId);
    }

    function CancelSelling(uint256 tokenId, address Contractaddr)
        public
        returns (bool)
    {
        require(
            msg.sender == seller[tokenId],
            "[TicketMarket] You are not seller of the ticket"
        );
        TicketSimple(Contractaddr).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId,
            "0x00"
        );
        _removeTicketFromSeller(seller[tokenId], tokenId);
    }

    function _removeTicketFromSeller(address from, uint256 tokenId) private {
        // [10, 15, 19, 20] -> 19번을 삭제 하고 싶어요
        // [20, 15, 20, 19]
        // [10, 15, 20]
        _ownedticketsCount[from]--;
        delete seller[tokenId];
        uint256 lastTokenIdex = _ownedtickets[from].length - 1;
        for (uint256 i = 0; i < _ownedtickets[from].length; i++) {
            if (tokenId == _ownedtickets[from][i]) {
                // Swap last token with deleting token;
                _ownedtickets[from][i] = _ownedtickets[from][lastTokenIdex];
                _ownedtickets[from][lastTokenIdex] = tokenId;
                break;
            }
        }
        //
        _ownedtickets[from].length--;
    }

    function getTicketNumBySeller(address seller)
        public
        view
        returns (uint256)
    {
        return _ownedticketsCount[seller];
    }

    function ticketOfSellerByIndex(address owner, uint256 index)
        public
        view
        returns (uint256)
    {
        require(
            index < _ownedticketsCount[owner],
            "KIP17Enumerable: owner index out of bounds"
        );
        return _ownedtickets[owner][index];
    }

    function buyTicket(uint256 tokenId, address Contractaddr)
        public
        payable
        returns (bool)
    {
        address payable receiver = address(uint160(seller[tokenId]));

        uint256 price = getPrice(tokenId, Contractaddr);
        // Send 0.01 klay to Seller 10**16 = 0.01 klay
        receiver.transfer(price);
        // Send Ticket if properly send klay
        TicketSimple(Contractaddr).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId,
            "0x00"
        );
        _removeTicketFromSeller(seller[tokenId], tokenId);
        return true;
    }

    // Called when SafeTransferFrom called from Ticket Contract
    function onKIP17Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes memory data
    ) public returns (bytes4) {
        // Set token seller, who was a token owner
        seller[tokenId] = from;
        _ownedtickets[from].push(tokenId);
        if (_ownedticketsCount[from] != 0) {
            _ownedticketsCount[from]++;
        } else {
            _ownedticketsCount[from] = 1;
        }
        // return signature which means this contract implemented interface for ERC721
        return
            bytes4(keccak256("onKIP17Received(address,address,uint256,bytes)"));
    }
}
