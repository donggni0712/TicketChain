import {fetchTicketsOf} from '../api/UseCaver';
import {useState, useEffect} from 'react';
import * as KlipAPI from "../api/UseKlip.js"

//environment that file is gitignored, so you have to make that file
import {DEFAULT_ADDRESS,DEFAULT_QR_CODE} from '../env';

//Components
import Head from '../component/head';
import PopUp from '../component/modal';
import QrComponent from '../component/qrcode';

function MyTickets() {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [tickets, setTickets] = useState([])
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS)
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title:"MODAL",
    onConfirm : () =>{},
  });

  const getMyTicekts = async () =>{
    const Tickets= await fetchTicketsOf('0xbC14CB49b93Ee36AfdF4b49eCB7C9512f9353c93');
    setTickets(Tickets);
  }

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



  return (
    <div className="MyTickets">
      <Head myAddress={myAddress} getUserData={getUserData}/>

      <QrComponent qrvalue={qrvalue}/>

      {/* <button onClick={()=>{getMyTicekts()}}>test</button>
      <div>{tickets.map((el)=>{
        return <div key={el.id}>{el.name}</div>
      })}</div> */}

      <PopUp showModal={showModal} setShowModal={setShowModal} modalData={modalData}/>
    </div>
  );
}

export default MyTickets;
