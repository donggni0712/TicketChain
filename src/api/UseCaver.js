import Caver from 'caver-js';
import TICKETCHAINABI from '../abi/TicketChainABI.json';
import TICKETMARKETABI from '../abi/TicketMarketABI.json'
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, MAINNET_CHAIN_ID,TICKETCHAIN_CONTRACT_ADDRESS, TICKET_MARKET_CONTRACT_ADDRESS } from '../env.js';
import {getTicketInfo} from './UseTicketDB.js'

const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64")
    },
    {name: "x-chain-id", value: MAINNET_CHAIN_ID}
  ]
}

const caver =  new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const TICKETCHAINContract = new caver.contract(TICKETCHAINABI, TICKETCHAIN_CONTRACT_ADDRESS);
const TICKETMARKETContract = new caver.contract(TICKETMARKETABI, TICKET_MARKET_CONTRACT_ADDRESS);

export const fetchTicketsOf = async (address)=>{
  // Fetch Balance
   const _balance = await TICKETCHAINContract.methods.balanceOf(address).call();
  //console.log(`balance = ${_balance}`)
  // Fetch Token IDs
  const tokenIds = [];
  for(let i=0;i<_balance;i++){
    const id = await  TICKETCHAINContract.methods.ticketOfOwnerByIndex(address, i).call();
//console.log(`id = ${id}`)
    tokenIds.push(id);
  }
  // Fetch Token Names
  const ticketInfos = [];
  for(let i=0;i<_balance;i++){
    const _ticketId = await  TICKETCHAINContract.methods.ticketId(tokenIds[i]).call();
    var _Price = await TICKETCHAINContract.methods.ticketPrice(tokenIds[i]).call();
    _Price = _Price/1000000000000000000;
    console.log(_ticketId)
    const _ticketInfo = await getTicketInfo(_ticketId)
    console.log(_ticketInfo)
    ticketInfos.push(_ticketInfo);
  }

  const tickets = [];
  for(let i=0;i<_balance;i++){
    tickets.push({info: ticketInfos[i], id:tokenIds[i], price:_Price})
  }

  return tickets;
}

export const fetchTicketsBySellerOf = async (address)=>{
  // Fetch Balance
  console.log('call func')
   const _balance = await TICKETMARKETContract.methods.getTicketNumBySeller(address).call();
  console.log(`balance = ${_balance}`)
  // Fetch Token IDs
  const tokenIds = [];
  for(let i=0;i<_balance;i++){
    const id = await  TICKETMARKETContract.methods.ticketOfSellerByIndex(address, i).call();
    tokenIds.push(id);
  }
  // Fetch Token Names
   const ticketInfos = [];
  for(let i=0;i<_balance;i++){
    const _id = tokenIds[i];
    const _ticketId = await  TICKETCHAINContract.methods.ticketId(tokenIds[i]).call();
    var _Price = await TICKETCHAINContract.methods.ticketPrice(tokenIds[i]).call();
    _Price = _Price/1000000000000000000;
    console.log(`ticketid=${_ticketId}`)
    const _ticketInfo = await getTicketInfo(_ticketId)
    console.log(_ticketInfo)
    ticketInfos.push(_ticketInfo);
  }

  const tickets = [];
  for(let i=0;i<_balance;i++){
    tickets.push({info: ticketInfos[i], id:tokenIds[i], price:_Price})
  }


  return tickets;
}

export const getPrice = async (ticketId) => {
  const price = await  TICKETCHAINContract.methods.ticketPrice(ticketId).call();
  return price;
}


export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(`BALANCE: ${balance}`);
    return balance;
  })
}