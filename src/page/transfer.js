import {fetchTicketsOf} from '../api/UseCaver';
import {useState, useEffect} from 'react';


//environment that file is gitignored, so you have to make that file


//Components
import TransferToWallet from '../components/submit/transferToWallet';
import Tickets from '../components/query/tickets';
import PopUp from '../components/modal/modal';
import QrComponent from '../components/modal/qrcode';
import { DEFAULT_ADDRESS } from '../env';
import Title from '../components/title.js'

const isMobile = window.screen.width >= 1280 ? false : true;

function Transfer({myAddress,qrvalue,setQrvalue,showModal,setShowModal,modalData,setModalData}) {
  const [component, setComponent] = useState("Tickets");
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({});

  const CanNotSell = () =>{
     setModalData({
      title:"해당 티켓을 판매할 수 없습니다.",
      content:"해당 티켓은 판매할 수 없습니다.",
      onConfirm: ()=>{}
    })
    setShowModal(true)
  }
  
  const clickTicket =(ticket) =>{
    if(ticket.info.canTrade==false){
        CanNotSell();
        return;
      }
    let id = ticket.info.id
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
    if(myAddress==DEFAULT_ADDRESS){
      return;
    }
    fetchMyTickets()
  },[myAddress])

  return (
    <div className="Transfer">
      <Title text="Transfer"/>
      <QrComponent qrvalue={qrvalue} setQrvalue ={setQrvalue} text={"QR코드를 스캔해 진행하세요"}/>

      {component=="Tickets" ? <div><div>전송할 티켓을 고르세요</div><Tickets tickets={tickets} clickTicket={clickTicket}/></div> : null}
      {component=="Transfer" ? <TransferToWallet myaddress={tickets} ticketInfo={selectedTicket} setQrvalue={setQrvalue}/> : null}

      <PopUp showModal={showModal} setShowModal={setShowModal} modalData={modalData}/>

    </div>
  );
}

export default Transfer;
