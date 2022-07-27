import axios from "axios";

import {TICKETDB_USER_URL,USER_API_KEY} from '../env.js'

export const getTicketInfo = async (_id)=>{

  let header = {
    headers: {
      'x-api-key':USER_API_KEY,
      'Content-Type': 'application/json',
    }
  }

  return await axios
    .post(TICKETDB_USER_URL, `{"id":${_id}}`,header)
    .then((response)=>{
      console.log(response.data)
      console.log("Internal")
      return response.data;
    })
}