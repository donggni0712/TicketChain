import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MyTickets from './page/myTickets'
import Store from './page/store'
import Trade from './page/trade'
import Footer from './component/footer'
import Head from './component/head'
import {useState, useEffect} from 'react';
import * as KlipAPI from "./api/UseKlip"

import {DEFAULT_ADDRESS,DEFAULT_QR_CODE} from './env';

function App() {
  const [tab, setTab] = useState("MYTICKET");
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [showModal, setShowModal] = useState(false);
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS)
  const [modalData, setModalData] = useState({
    title:"MODAL",
    content:"content",
    onConfirm : () =>{},
  });

    const getUserData = () =>{
    setModalData({
      title:"Klip 지갑 연동",
      content:"진행을 누르면 지갑 연동이 진행됩니다.",
      onConfirm: ()=>{
        KlipAPI.getAddress(setQrvalue, async (address)=>{
            setMyAddress(address);
          });
      }
    })
    setShowModal(true)
  }

  return (
    <div className="App">
      <Head myAddress={myAddress} getUserData={getUserData}/>
      <div className="component">
        {tab=="MYTICKET" ? <MyTickets myAddress={myAddress} qrvalue={qrvalue} setQrvalue={setQrvalue} showModal={showModal} setShowModal={setShowModal} modalData={modalData}/> : null}
        {tab=="STORE" ? <Store myAddress={myAddress} qrvalue={qrvalue} setQrvalue={setQrvalue} showModal={showModal} setShowModal={setShowModal} modalData={modalData} setModalData={setModalData}/> : null}
        {tab=="TRADE" ? <Trade/> : null}
      </div>
      <Footer setTab={setTab}/>
    </div>
  );
}

export default App;
