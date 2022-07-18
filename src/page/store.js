import {fetchTicketsOf} from '../api/UseCaver';
import {useState, useEffect} from 'react';


//environment that file is gitignored, so you have to make that file


//Components
import Tickets from '../component/tickets';
import PopUp from '../component/modal';
import QrComponent from '../component/qrcode';
import {TICKET_MARKET_CONTRACT_ADDRESS} from '../env'
import * as KlipAPI from '../api/UseKlip'

function Store({qrvalue,setQrvalue,showModal,setShowModal,modalData, setModalData}) {

  const buyTicket = (id) =>{
    setModalData({
      title:"티켓 구매",
      content:"티켓을 구매하시겠습니까?",
      onConfirm: (id)=>{
            KlipAPI.buyTicket(id,setQrvalue,(res)=>{
            alert(JSON.stringify(res))
      });
      }
    })
    setShowModal(true)
  }
  const [tickets, setTickets] = useState([]);
  const fetchMyTickets = async () =>{
    // if (myAddress == DEFAULT_ADDRESS){
    //   alert("NO ADDRESS");
    //   return;
    // }
    const _tickets = await fetchTicketsOf(TICKET_MARKET_CONTRACT_ADDRESS)
    console.log(_tickets)
    setTickets(_tickets);
  }

  useEffect((el)=>{
    fetchMyTickets()
  },[])
  
  return (
    <div className="MyTickets">

        <QrComponent qrvalue={qrvalue} setQrvalue ={setQrvalue}/>

        <Tickets tickets={tickets} clickTicket={buyTicket}/>

        <PopUp showModal={showModal} setShowModal={setShowModal} modalData={modalData}/>

    </div>
  );
}

export default Store;
