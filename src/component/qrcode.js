import {Container} from 'react-bootstrap';
import {DEFAULT_QR_CODE} from '../env'
import QRCode from "qrcode.react";
import './qrcode.css'

function QrComponent({qrvalue}){

    return  <div>{qrvalue !== DEFAULT_QR_CODE ? 
         <Container className='qrcomponent'> 
          <QRCode value={qrvalue} size={256}/>
        </Container>
        :null}
        </div>
}   

export default QrComponent;