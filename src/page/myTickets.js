import {fetchTicketsOf} from '../api/UseCaver';
import {useState, useEffect} from 'react';


//environment that file is gitignored, so you have to make that file


//Components
import TicketSilder from '../component/ticketSlider';
import Tickets from '../component/tickets';
import PopUp from '../component/modal';
import QrComponent from '../component/qrcode';

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
    fetchMyTickets()
  },[])

  return (
    <div className="MyTickets">

      <QrComponent qrvalue={qrvalue} setQrvalue ={setQrvalue}/>

      {isMobile ? <TicketSilder tickets={tickets} clickTicket={clickTicket} /> : <Tickets tickets={tickets} clickTicket={clickTicket}/>}
      {/* <PopUp showModal={showModal} setShowModal={setShowModal} modalData={modalData}/> */}

    </div>
  );
}

export default MyTickets;
