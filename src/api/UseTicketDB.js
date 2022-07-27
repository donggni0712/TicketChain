import axios from "axios";

import {TICKETDB_USER_URL,USER_API_KEY} from '../env.js'

export const getTicketInfo = async (_id)=>{

  let header = {
    headers: {
      'x-api-key':USER_API_KEY,
      'Content-Type': 'application/json',
    }
  }

  let body = {
    "id":_id
  }
  return await axios
    .post(TICKETDB_USER_URL, body,header)
    .then((response)=>{
      return response.data;
    })
}