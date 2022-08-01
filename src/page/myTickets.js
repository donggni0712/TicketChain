import {fetchTicketsOf} from '../api/UseCaver';
import {useState, useEffect} from 'react';


//environment that file is gitignored, so you have to make that file


//Components
import TicketSilder from '../components/query/ticketSlider';
import Tickets from '../components/query/tickets';
import QrComponent from '../components/modal/qrcode';
import { DEFAULT_ADDRESS } from '../env';
import Title from "../components/title.js"

const isMobile = window.screen.width >= 1280 ? false : true;

function MyTickets({myAddress,qrvalue,setQrvalue,showModal,setShowModal,modalData}) {

  const [tickets, setTickets] = useState([]);

  const clickTicket =(ticket) =>{
    var crypto = require('crypto');
    var shasum = crypto.createHash('sha512');
    shasum.update(ticket.info.id);
    var output = shasum.digest('hex');
     setQrvalue(output)
  }

  const fetchMyTickets = async () =>{
    // if (myAddress == DEFAULT_ADDRESS){
    //   alert("NO ADDRESS");
    //   return;
    // }
    const _tickets = await fetchTicketsOf(myAddress)
    console.log(_tickets)
    setTickets(_tickets);
  }

  useEffect((el)=>{
    if(myAddress==DEFAULT_ADDRESS){
      return;
    }
    fetchMyTickets()
  },[myAddress])

  return (
    <div className="MyTickets">
      <Title text="MyTickets"/>
      <QrComponent qrvalue={qrvalue} setQrvalue ={setQrvalue} text={"QR코드로 티켓을 사용하세요"}/>

      {isMobile ? <TicketSilder tickets={tickets} clickTicket={clickTicket} /> : <Tickets tickets={tickets} clickTicket={clickTicket}/>}
      {/* <PopUp showModal={showModal} setShowModal={setShowModal} modalData={modalData}/> */}

    </div>
  );
}

export default MyTickets;
