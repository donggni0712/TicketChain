import {fetchTicketsOf} from '../api/UseCaver';
import {useState, useEffect} from 'react';


//environment that file is gitignored, so you have to make that file


//Components
import TransferToWallet from '../component/transferToWallet';
import Tickets from '../component/tickets';
import PopUp from '../component/modal';
import QrComponent from '../component/qrcode';

const isMobile = window.screen.width >= 1280 ? false : true;

function Transfer({myAddress,qrvalue,setQrvalue,showModal,setShowModal,modalData}) {
  const [component, setComponent] = useState("Tickets");
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({});

  const clickTicket =(id) =>{
    console.log('start')
    console.log(id)
    console.log(tickets)
    let _ticket = tickets.reduce((res,el)=>{
      console.log(el)
      if(el.info.id==id){
        return res = {
          id : el.info.id,
          ticketName : el.info.ticketname,
          placeName : el.info.placeName,
          expired : el.info.expired,
          canTrade : el.info.canTrade,
          imgSrc : el.info.imgSrc,
          webUrl : el.info.ebUrl
        }
      }
    },{})
    console.log('ticketInfo')
    console.log(_ticket)
    setSelectedTicket(_ticket)
    setComponent("Transfer");
  }

  const fetchMyTickets = async () =>{
    const _tickets = await fetchTicketsOf(myAddress)
    console.log(_tickets)
    setTickets(_tickets);
  }

  useEffect((el)=>{
    fetchMyTickets()
  },[])

  return (
    <div className="Transfer">
      <div>전송할 티켓을 고르세용</div>
      <QrComponent qrvalue={qrvalue} setQrvalue ={setQrvalue}/>

      {component=="Tickets" ? <Tickets tickets={tickets} clickTicket={clickTicket}/> : null}
      {component=="Transfer" ? <TransferToWallet myaddress={tickets} ticketInfo={selectedTicket} setQrvalue={setQrvalue}/> : null}

      <PopUp showModal={showModal} setShowModal={setShowModal} modalData={modalData}/>

    </div>
  );
}

export default Transfer;
