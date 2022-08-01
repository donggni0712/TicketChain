import {fetchTicketsOf, fetchTicketsBySellerOf} from '../api/UseCaver';
import {useState, useEffect} from 'react';
import {Tab,Tabs} from 'react-bootstrap';

//environment that file is gitignored, so you have to make that file


//Components
import Tickets from '../components/query/tickets';
import PopUp from '../components/modal/modal';
import QrComponent from '../components/modal/qrcode';
import {TICKET_MARKET_CONTRACT_ADDRESS} from '../env'
import * as KlipAPI from '../api/UseKlip.js'
import Title from "../components/title.js"

import {DEFAULT_ADDRESS} from '../env';

function Store({myAddress,qrvalue,setQrvalue,showModal,setShowModal,modalData, setModalData}) {
  const [tab, setTab] = useState("STORE");
  const [text,setText] = useState("Store")
  const buyTicket = (id) =>{
    if(myAddress==DEFAULT_ADDRESS){
      setModalData({
      title:"지갑 연동 필요",
      content:"지갑을 먼저 연동하세요",
      onConfirm: ()=>{}
    })
    setShowModal(true)
    return;
    }
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

  const CanNotSell = () =>{
     setModalData({
      title:"해당 티켓을 판매할 수 없습니다.",
      content:"해당 티켓은 판매할 수 없습니다.",
      onConfirm: ()=>{}
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

  const clickTicket = (ticket) =>{
    let id = ticket.id
    console.log(`ticekt ID = ${id}`)
    if(tab=="STORE"){
      buyTicket(id)
    }
    if(tab=="MYTICKETS"){
      if(ticket.info.canTrade==false){
        CanNotSell();
        return;
      }
      sellTicket(id)
    }
    if(tab=="MYSTORE"){
      cancelSelling(id)
    }
  };

  useEffect((el)=>{
    if(tab=="STORE"){
      fetchTickets(TICKET_MARKET_CONTRACT_ADDRESS)
      setText("Stroe")
    }
    if(tab=="MYTICKETS"){
      if(myAddress==DEFAULT_ADDRESS){
        alert(JSON.stringify("지갑을 먼저 연동하세요"))
        setTab("STORE")
        //setTickets([])
        return;
      }
      fetchTickets(myAddress);
      setText("Stroe > MyTickets")
    }
    if(tab=="MYSTORE"){
      if(myAddress==DEFAULT_ADDRESS){
        alert(JSON.stringify("지갑을 먼저 연동하세요"))
        setTab("STORE")
        //setTickets([])
        return;
      }
      fetchTicketsBySeller(myAddress)
      setText("Stroe > MyStore")
    }
  },[tab,myAddress])
  
  return (
    <div className="MyTickets">
        <Title text={text}/>
        <QrComponent qrvalue={qrvalue} setQrvalue ={setQrvalue} text={"qr코드를 스캔해 진행하세요"}/>
        <Tabs
          activeKey={tab}
          onSelect={(k) => setTab(k)}
          className="mb-3"
        >
          <Tab eventKey="STORE"  title="상점" onClick={()=>setTab("STORE")}>
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
