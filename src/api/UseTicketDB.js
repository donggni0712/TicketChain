import axios from "axios";

import {TICKETDB_USER_URL,USER_API_KEY,TICKETDB_CREATOR_URL,CREATER_API_KEY} from '../env.js'

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

export const makeTicekt = async (_id,_ticketName,_place,_expired,_canTrade,_imgSrc,_webUrl)=>{

  let header = {
    headers: {
      'x-api-key':CREATER_API_KEY,
      'Content-Type': 'application/json',
    }
  }
  console.log(`{"id":${_id},"ticketName":"${_ticketName}","place":"${_place}","expired":"${_expired}","canTrade":${_canTrade},"imgSrc":"${_imgSrc}","webUrl":"${_webUrl}"}`)
  return await axios
    .post(TICKETDB_CREATOR_URL, `{"id":${_id},"ticketName":"${_ticketName}","place":"${_place}","expired":"${_expired}","canTrade":${_canTrade},"imgSrc":"${_imgSrc}","webUrl":"${_webUrl}"}`,header)
    .then(()=>{
      return true
    })
}