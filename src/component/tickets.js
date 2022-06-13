import {Row,Col,Card} from 'react-bootstrap';
import './tickets.css'

function Tickets({tickets}){
  const rows = tickets.slice(tickets.length/2);


  return <div className="tickets">
            {rows.map((o,rowIndex)=>{
              return <Row key = {`row:${rowIndex}`}>
                <Col className="ticket_col">
                  <Card className='ticket'>
                     <Card.Img className='imgSrc' src={tickets[rowIndex*2].info.imgSrc}/>
                    <span className='ticketName'>{tickets[rowIndex*2].info.ticketName}</span>
                    <span className='placeName'>{tickets[rowIndex*2].info.placeName}</span>
                    <span className='expired'>{tickets[rowIndex*2].info.expired}</span>
                    <a href={tickets[rowIndex*2].info.webUrl} target={'blank'} className='webUrl'>{tickets[rowIndex*2].info.webUrl}</a>
                    <span className='canTrade'>{tickets[rowIndex*2].info.canTrade == true ? <>교환 가능</>: <>교환 불가능</>}</span>
                  </Card>
                </Col>
                <Col className='ticket_col'>
                  {
                    tickets.length > rowIndex*2+1 ? (
                    <Card className='ticket'>
                     <Card.Img className='imgSrc' src={tickets[rowIndex*2+1].info.imgSrc}/>
                    <span className='ticketName'>{tickets[rowIndex*2+1].info.ticketName}</span>
                    <span className='placeName'>{tickets[rowIndex*2+1].info.placeName}</span>
                    <span className='expired'>{tickets[rowIndex*2+1].info.expired}</span>
                    <a href={tickets[rowIndex*2].info.webUrl}  target={'blank'}  className='webUrl'>{tickets[rowIndex*2+1].info.webUrl}</a>
                    <span className='canTrade'>{tickets[rowIndex*2+1].info.canTrade == true ? <>교환 가능</>: <>교환 불가능</>}</span>
                 </Card>) : null
                  }
                </Col>
              </Row>
              
            })}
          </div>
        
}

export default Tickets;