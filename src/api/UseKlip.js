import axios from "axios";
import { TICKETCHAIN_CONTRACT_ADDRESS, TICKET_MARKET_CONTRACT_ADDRESS } from "../env";

const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const APP_NAME = "TICKET_CHAIN";
const isMobile = window.screen.width >= 1280 ? false : true;

const getKlipAccessUrl = (method, request_key) =>{
  if(method === "OR"){
    return `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
  }
  if(method === "IOS"){
    return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
  }
  if(method === "android"){
    return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
    }
  
  return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`; 
}

export const buyCard = async ( tokenId, setQrvalue, callback) =>{
  const functionJson = ' { "constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" }, { "name": "NFT", "type": "address" } ], "name": "buyNFT", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }';
  executeContract(TICKET_MARKET_CONTRACT_ADDRESS, functionJson, "10000000000000000", `[\"${tokenId}\",\"${TICKETCHAIN_CONTRACT_ADDRESS}\"]`,setQrvalue,callback );
}

export const listingCard = async (fromAddress, tokenId, setQrvalue, callback) =>{
  const functionJson = '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
    executeContract(TICKETCHAIN_CONTRACT_ADDRESS, functionJson, "0", `[\"${fromAddress}\",\"${TICKET_MARKET_CONTRACT_ADDRESS}\",\"${tokenId}\"]`,setQrvalue,callback );
}

export const mintCardWithURI = async (toAddress, tokenId, uri, setQrvalue, callback) =>{
  const functionJson = '{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
  executeContract(TICKETCHAIN_CONTRACT_ADDRESS, functionJson, "0", `[\"${toAddress}\",\"${tokenId}\",\"${uri}\"]`,setQrvalue,callback );
  
}

export const executeContract = (txTo, functionJSON, value, params, setQrvalue, callback) =>{
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "execute_contract",
      transaction: {
        to: txTo,
        abi:functionJSON,
        value: value,
        params: params,
      },
    })
    .then((response) => {
      const { request_key } = response.data;
      if(isMobile){
        window.location.href = getKlipAccessUrl("android",request_key);
      }else{
        setQrvalue(getKlipAccessUrl("QR",request_key));
      }
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log(`[Result] ${JSON.stringify(res.data.result)}`);
              callback(res.data.result)
              clearInterval(timerId);
              setQrvalue("DEFAULT");
            }
          });
      }, 1000);
    });
}
export const getAddress = (setQrvalue, callback) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "auth",
    })
    .then((response) => {
      const { request_key } = response.data;
      if(isMobile){
        window.location.href = getKlipAccessUrl("android",request_key);
      }else{
        setQrvalue(getKlipAccessUrl("QR",request_key));
      }
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log(`[Result] ${JSON.stringify(res.data.result)}`);
              callback(res.data.result.klaytn_address);
              clearInterval(timerId);
              setQrvalue("DEFAULT")
            }
          });
      }, 1000);
    });
};