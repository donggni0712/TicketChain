import {Container, Modal} from 'react-bootstrap';
import {DEFAULT_QR_CODE} from '../env'
import QRCode from "qrcode.react";
import './qrcode.css'

function QrComponent({qrvalue, setQrvalue}){

    return  <Modal centered show={qrvalue!=DEFAULT_QR_CODE} onHide={()=>{
            setQrvalue(DEFAULT_QR_CODE);
            }}>
            <Modal.Header closeButton className="header">
                <Modal.Title>
                    <>QRCode를 이용해 진행하세요.</>
                </Modal.Title>
            </Modal.Header>
              {qrvalue !== DEFAULT_QR_CODE ? 
         <Container className='qrcomponent'> 
          <QRCode value={qrvalue} size={256}/>
        </Container>
        :<div className='qrcomponent'></div>}
        </Modal>
}

export default QrComponent;