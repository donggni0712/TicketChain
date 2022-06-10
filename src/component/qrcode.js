import {Container} from 'react-bootstrap';
import {DEFAULT_QR_CODE} from '../env'
import QRCode from "qrcode.react";

function QrComponent({qrvalue}){

    return  <div>{qrvalue !== DEFAULT_QR_CODE ? 
         <Container className='qrcomponent' style={{backgroundColor:'white', width:300,height:300,padding:20}}> 
          <QRCode value={qrvalue} size={256} style={{margin:"auto"}}/>
        </Container>
        :null}
        </div>
}   

export default QrComponent;