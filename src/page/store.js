import {fetchTicketsOf, fetchTicketsBySellerOf} from '../api/UseCaver';
import {useState, useEffect} from 'react';
import {Tab,Tabs} from 'react-bootstrap';

//environment that file is gitignored, so you have to make that file


//Components
import Tickets from '../component/tickets';
import PopUp from '../component/modal';
import QrComponent from '../component/qrcode';
import {TICKET_MARKET_CONTRACT_ADDRESS} from '../env'
import * as KlipAPI from '../api/UseKlip'

import {DEFAULT_ADDRESS} from '../env';

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

  const sellTicket = (id) =>{
     setModalData({
      title:"티켓 판매",
      content:"해당 티켓을 판매하시겠습니까?",
      onConfirm: ()=>{
          KlipAPI.listingTicket(myAddress, id,setQrvalue,(res)=>{
          alert(JSON.stringify(res))
        });
      }
    })
    setShowModal(true)
  }

  const cancelSelling = (id) =>{
     setModalData({
      title:"티켓 판매 취소",
      content:"해당 티켓 판매를 취소하겠습니까?",
      onConfirm: ()=>{
          KlipAPI.cancelTicket(id,setQrvalue,(res)=>{
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
    //console.log(_tickets)
    setTickets(_tickets);
  }

  const fetchTicketsBySeller = async (addr) =>{
    const _tickets = await fetchTicketsBySellerOf(addr)
    //console.log(_tickets)
    setTickets(_tickets);
  }

  const clickTicket = (id) =>{
    if(tab=="STORE"){
      buyTicket(id)
    }
    if(tab=="MYTICKETS"){
      sellTicket(id)
    }
    if(tab=="MYSTORE"){
      cancelSelling(id)
    }
  };

  useEffect((el)=>{
    if(tab=="STORE"){
      fetchTickets(TICKET_MARKET_CONTRACT_ADDRESS)
    }
    if(tab=="MYTICKETS"){
      if(myAddress==DEFAULT_ADDRESS){
        alert(JSON.stringify("지갑을 먼저 연동하세요"))
        setTab("STORE")
        //setTickets([])
        return;
      }
      fetchTickets(myAddress);
    }
    if(tab=="MYSTORE"){
      if(myAddress==DEFAULT_ADDRESS){
        alert(JSON.stringify("지갑을 먼저 연동하세요"))
        setTab("STORE")
        //setTickets([])
        return;
      }
      fetchTicketsBySeller(myAddress)
    }
  },[tab])
  
  return (
    <div className="MyTickets">

        <QrComponent qrvalue={qrvalue} setQrvalue ={setQrvalue}/>
        <Tabs
          activeKey={tab}
          onSelect={(k) => setTab(k)}
          className="mb-3"
        >
          <Tab eventKey="STORE" title="상점" onClick={()=>setTab("STORE")}>
          </Tab>
          <Tab eventKey="MYSTORE" title="내가 판매중인 티켓" onClick={()=>setTab("MYSTORE")}>
          </Tab>
          <Tab eventKey="MYTICKETS" title="내 티켓 판매하기" onClick={()=>setTab("MYTICKETS")}>
          </Tab>
        </Tabs>
        <Tickets tickets={tickets} clickTicket={clickTicket}/>
        <PopUp showModal={showModal} setShowModal={setShowModal} modalData={modalData}/>

    </div>
  );
}

export default Store;
