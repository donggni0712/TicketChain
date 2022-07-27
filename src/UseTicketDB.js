import axios from "axios";

import {TICKETDB_USER_URL,USER_API_KEY} from './env.js'

const getTicketInfo = async (_id)=>{

  let header = {
    headers: {
      'x-api-key':USER_API_KEY,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Headers" : "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    }
  }

  let body = {
    "id":_id
  }
  return await axios
    .post(TICKETDB_USER_URL, body,header)
    .then((response)=>{
      console.log(response.data)
      return response.data;
    })
}

getTicketInfo(1).then((data)=>{
  console.log("get")
  console.log(data)
});