import {Container, Modal} from 'react-bootstrap';
import {DEFAULT_QR_CODE} from '../env'
import './modal.css'

function TicketInfo({qrvalue, setQrvalue, ticket, text, callback}){

    return  <Modal centered show={qrvalue!=DEFAULT_QR_CODE} onHide={()=>{
            setQrvalue(DEFAULT_QR_CODE);
            }}>
            <Modal.Header closeButton className="header">
                <Modal.Title>
                    <>{text}</>
                </Modal.Title>
            </Modal.Header>
            <Card className='ticket'>
                     <Card.Img className='imgSrc' src={ticket.info.imgSrc}/>
                    <span className='ticketName'>{ticket.info.ticketName}</span>
                    <span className='placeName'>{ticket.info.placeName}</span>
                    <span className='expired'>{ticket.info.expired}</span>
                    <a href={ticket.info.webUrl}  target={'blank'}  className='webUrl'>{ticket.info.webUrl}</a>
                    <span className='canTrade'>{ticket.info.canTrade == true ? <>교환 가능</>: <>교환 불가능</>}</span>
                    <span className='expired'>Price : {ticket.price}Klay</span>
                 </Card>
            <Modal.Footer className='footer'>
                <Button variant="secondary" onClick={()=>{setShowModal(false)}}>닫기</Button>
                <Button variant="primary" className="okButton" onClick={()=>{
                    callback();
                    setShowModal(false);
                }}>진행</Button>
            </Modal.Footer>
        </Modal>
}

export default TicketInfo;