import {Row,Col,Card} from 'react-bootstrap';

function Tickets({tickets}){
  const rows = tickets.slice(tickets.length/2);


  return <div className="tickets" style={{padding:0, width:"100%"}}>
            {rows.map((o,rowIndex)=>{
              return <Row key = {`row:${rowIndex}`}>
                <Col style={{marginRight:0, paddingRight:0}}>
                  <Card>
                    {tickets[rowIndex*2].info.ticketName}<br/>
                    {tickets[rowIndex*2].info.placeName}<br/>
                    {tickets[rowIndex*2].info.expired}<br/>
                    {tickets[rowIndex*2].info.canTrade == true ? <>교환 가능</>: <>교환 불가능</>}
                  </Card>
                </Col>
                <Col style={{marginRight:0, paddingRight:0}}>
                  {
                    tickets.length > rowIndex*2+1 ? (
                    <Card>
                    {tickets[rowIndex*2+1].info.ticketName}<br/>
                    {tickets[rowIndex*2+1].info.placeName}<br/>
                    {tickets[rowIndex*2+1].info.expired}<br/>
                    {tickets[rowIndex*2+1].info.canTrade == true ? <>교환 가능</>: <>교환 불가능</>}
                    </Card>) : null
                  }
                </Col>
              </Row>
              
            })}
          </div>
        
}

export default Tickets;