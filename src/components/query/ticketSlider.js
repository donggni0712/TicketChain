import {Card} from 'react-bootstrap';
import './tickets.css'
import Slider from "react-slick";

function TicketSilder({tickets, clickTicket}){
 const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

  return <div className="tickets">
    <Slider {...settings}>
    {tickets.map((ticket,index)=>{    
                  return <div>
                  <Card className='ticket'  onClick={()=>{
                      clickTicket(tickets[index])
                    }}>
                     <Card.Img src={tickets[index].info.imgSrc}/>
                    {tickets[index].info.ticketName}<br/>
                    {tickets[index].info.place}<br/>
                    {tickets[index].info.expired}<br/>
                    {tickets[index].info.webUrl}<br/>
                    {tickets[index].info.canTrade == true ? <>교환 가능</>: <>교환 불가능</>}
                    Price : {tickets[index].price}Klay<br/>
                  </Card>
                  </div>
    }
    )}
    </Slider>
          </div>
        
}

export default TicketSilder;