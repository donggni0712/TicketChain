import {fetchTicketsOf} from '../api/UseCaver';
import {useState, useEffect} from 'react';
import * as KlipAPI from "../api/UseKlip.js"

//environment that file is gitignored, so you have to make that file
import {DEFAULT_ADDRESS,DEFAULT_QR_CODE} from '../env';

//Components
import TicketSilder from '../component/ticketSlider';
import Tickets from '../component/tickets';
import Head from '../component/head';
import PopUp from '../component/modal';
import QrComponent from '../component/qrcode';

const isMobile = window.screen.width >= 1280 ? false : true;

function MyTickets() {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [tickets, setTickets] = useState([])
  const [myAddress, setMyAddress] = useState('0xbC14CB49b93Ee36AfdF4b49eCB7C9512f9353c93')
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title:"MODAL",
    onConfirm : () =>{},
  });

  const getUserData = () =>{
    setModalData({
      title:"Klip 지갑을 연동하시겠습니까?",
      onConfirm: ()=>{
        KlipAPI.getAddress(setQrvalue, async (address)=>{
            setMyAddress(address);
          });
      }
    })
    setShowModal(true)
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
      <Head myAddress={myAddress} getUserData={getUserData}/>

      <QrComponent qrvalue={qrvalue} setQrvalue ={setQrvalue}/>

      {isMobile ? <TicketSilder tickets={tickets} /> : <Tickets tickets={tickets}/>}
      <PopUp showModal={showModal} setShowModal={setShowModal} modalData={modalData}/>
    </div>
  );
}

export default MyTickets;
