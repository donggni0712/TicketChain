import Caver from 'caver-js';
import TICKETCHAINABI from '../abi/TicketChainABI.json';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, TESTNET_CHAIN_ID,TICKETCHAIN_CONTRACT_ADDRESS } from '../env.js';

const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64")
    },
    {name: "x-chain-id", value: TESTNET_CHAIN_ID}
  ]
}

const caver =  new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const TICKETCHAINContract = new caver.contract(TICKETCHAINABI, TICKETCHAIN_CONTRACT_ADDRESS);

export const fetchTicketsOf = async (address)=>{
  // Fetch Balance
   const _balance = await TICKETCHAINContract.methods.balanceOf(address).call();
  console.log(`balance = ${_balance}`)
  // Fetch Token IDs
  const tokenIds = [];
  for(let i=0;i<_balance;i++){
    const id = await  TICKETCHAINContract.methods.tokenOfOwnerByIndex(address, i).call();
    console.log(`id = ${id}`)
    tokenIds.push(id);
  }
  // Fetch Token Names
  const tokenNames = [];
  for(let i=0;i<_balance;i++){
    const name = await  TICKETCHAINContract.methods.ticketName(tokenIds[i]).call();
        console.log(`name = ${name}`)
    tokenNames.push(name);
  }

  const nfts = [];
  for(let i=0;i<_balance;i++){
    nfts.push({name: tokenNames[i], id:tokenIds[i]})
  }

  return nfts;
}


export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(`BALANCE: ${balance}`);
    return balance;
  })
}