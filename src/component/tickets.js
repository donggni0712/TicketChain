import {Row,Col,Card} from 'react-bootstrap';
import './tickets.css'

function Tickets({tickets}){
  const rows = tickets.slice(tickets.length/2);


  return <div className="tickets">
            {rows.map((o,rowIndex)=>{
              return <Row key = {`row:${rowIndex}`}>
                <Col className="ticket_col">
                  <Card className='ticket'>
                     <Card.Img src={tickets[rowIndex*2].info.imgSrc}/>
                    {tickets[rowIndex*2].info.ticketName}<br/>
                    {tickets[rowIndex*2].info.placeName}<br/>
                    {tickets[rowIndex*2].info.expired}<br/>
                    {tickets[rowIndex*2].info.webUrl}<br/>
                    {tickets[rowIndex*2].info.canTrade == true ? <>교환 가능</>: <>교환 불가능</>}
                  </Card>
                </Col>
                <Col className='ticket_col'>
                  {
                    tickets.length > rowIndex*2+1 ? (
                    <Card className='ticket'>
                     <Card.Img src={tickets[rowIndex*2+1].info.imgSrc}/>
                    {tickets[rowIndex*2+1].info.ticketName}<br/>
                    {tickets[rowIndex*2+1].info.placeName}<br/>
                    {tickets[rowIndex*2+1].info.expired}<br/>
                    {tickets[rowIndex*2+1].info.webUrl}<br/>
                    {tickets[rowIndex*2+1].info.canTrade == true ? <>교환 가능</>: <>교환 불가능</>}
                    </Card>) : null
                  }
                </Col>
              </Row>
              
            })}
          </div>
        
}

export default Tickets;