import {fetchTicketsOf} from '../api/UseCaver';
import {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';

//environment that file is gitignored, so you have to make that file


//Components
import Tickets from '../component/tickets';
import PopUp from '../component/modal';
import QrComponent from '../component/qrcode';
import {TICKET_MARKET_CONTRACT_ADDRESS} from '../env'
import * as KlipAPI from '../api/UseKlip'

function Store({myAddress,qrvalue,setQrvalue,showModal,setShowModal,modalData, setModalData}) {
  const [tab, setTab] = useState("STORE");

  const buyTicket = (id) =>{
    setModalData({
      title:"티켓 구매",
      content:"티켓을 구매하시겠습니까?",
      onConfirm: ()=>{
            KlipAPI.buyTicket(id,setQrvalue,(res)=>{
            alert(JSON.stringify(res))
      });
      }
    })
    setShowModal(true)
  }
  const [tickets, setTickets] = useState([]);
  const fetchTickets = async (addr) =>{
    // if (myAddress == DEFAULT_ADDRESS){
    //   alert("NO ADDRESS");
    //   return;
    // }
    const _tickets = await fetchTicketsOf(addr)
    console.log(_tickets)
    setTickets(_tickets);
  }

  useEffect((el)=>{
    if(tab=="STORE"){
      fetchTickets(TICKET_MARKET_CONTRACT_ADDRESS)
    }
    if(tab=="MYTICKETS"){
      fetchTickets(myAddress)
    }
    if(tab=="MYSTORE"){
      fetchTickets(myAddress)
    }
  },[tab])
  
  return (
    <div className="MyTickets">

        <QrComponent qrvalue={qrvalue} setQrvalue ={setQrvalue}/>
        <div>
          <Button onClick={()=>setTab("MYSTORE")}>상점</Button>
          <Button onClick={()=>setTab("MYSTORE")}>내가 판매중인 티켓</Button>
          <Button onClick={()=>setTab("MYTICKETS")}>내 티켓 판매하기</Button>
        </div>
        <Tickets tickets={tickets} clickTicket={buyTicket}/>
        <PopUp showModal={showModal} setShowModal={setShowModal} modalData={modalData}/>

    </div>
  );
}

export default Store;
