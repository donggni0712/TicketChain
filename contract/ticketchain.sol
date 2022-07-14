// Klaytn IDE uses solidity 0.4.24, 0.5.6 versions.
pragma solidity >=0.4.24 <=0.5.7;

contract IKIP17Receiver {
    function onKIP17Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes memory data
    ) public returns (bytes4);
}

contract NFTSimple {
    string public name = "TicketChain";
    string public symbol = "ticket";

    mapping(uint256 => address) public tokenOwner;
    mapping(uint256 => string) public ticketNames;
    mapping(uint256 => uint256) public ticketExpired;
    mapping(uint256 => string) public ticketPlaceName;
    mapping(uint256 => bool) public ticketCanTrade;
    mapping(uint256 => string) public ticketHomepageurl;
    mapping(uint256 => string) public ticketImgsrc;
    mapping(uint256 => uint256) public ticketPrice;

    // 소유한 토큰 리스트
    mapping(address => uint256[]) private _ownedTokens;
    bytes4 private constant _KIP17_RECEIVED = 0x6745782b;

    // mint(tokenId, uri, owner)
    // transferFrom(from, to, tokenId) -> owner가 바뀌는 것(from -> to)

    function mintWithTokenURI(
        address to,
        uint256 tokenId,
        string memory ticketName,
        uint256 expired,
        string memory placeName,
        bool canTrade,
        uint256 price
    ) public returns (bool) {
        // to에게 tokenId(일련번호)를 발행하겠다.
        // 적힐 글자는 tokenURI
        tokenOwner[tokenId] = to;
        ticketNames[tokenId] = ticketName;
        ticketExpired[tokenId] = expired;
        ticketPlaceName[tokenId] = placeName;
        ticketCanTrade[tokenId] = canTrade;
        ticketPrice[tokenId] = price;

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

    function setticketNames(uint256 id, string memory uri) public {
        ticketNames[id] = uri;
    }

    function setExpired(uint256 id, uint256 uri) public {
        ticketExpired[id] = uri;
    }

    function setPlaceName(uint256 id, string memory uri) public {
        ticketPlaceName[id] = uri;
    }

    function setCanTrade(uint256 id, bool uri) public {
        ticketCanTrade[id] = uri;
    }

    function setHomepageurl(uint256 id, string memory uri) public {
        ticketHomepageurl[id] = uri;
    }

    function setImgsrc(uint256 id, string memory uri) public {
        ticketImgsrc[id] = uri;
    }

    function setPrice(uint256 id, uint256 uri) public {
        ticketPrice[id] = uri;
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

contract NFTMarket {
    mapping(uint256 => address) public seller;

    function getPrice(uint256 tokenId, address a)
        public
        view
        returns (uint256)
    {
        return other(a).ticketPrice(tokenId);
    }

    function buyNFT(uint256 tokenId, address NFT)
        public
        payable
        returns (bool)
    {
        address payable receiver = address(uint160(seller[tokenId]));

        //0.000001 klay = 10**12
        uint256 price = other(NFT).ticketPrice(tokenId);
        receiver.transfer(price * (10**12));

        // Send NFT if properly send klay
        NFTSimple(NFT).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId,
            "0x00"
        );

        return true;
    }

    // Called when SafeTransferFrom called from NFT Contract
    function onKIP17Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes memory data
    ) public returns (bytes4) {
        // Set token seller, who was a token owner
        seller[tokenId] = from;

        // return signature which means this contract implemented interface for ERC721
        return
            bytes4(keccak256("onKIP17Received(address,address,uint256,bytes)"));
    }
}
