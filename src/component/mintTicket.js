import {useState} from 'react'
import {Card, Form, Button} from 'react-bootstrap'
import * as KlipAPI from '../api/UseKlip'

function MintTicket({setModalData, myAdress, setQrvalue, setShowModal}){
    const [ticketId,setTicketId] = useState("")
    const [ticketPrice, setTicketPrice] = useState(0)
    const [ticketNum, setTicketNum] = useState(0)

    const mintTicket = (id,price,num) =>{
        setModalData({
        title:"티켓 배포",
        content:"티켓을 배포하시겠습니까?",
        onConfirm: ()=>{
            KlipAPI.mintTicket(myAdress,id,price,num,setQrvalue,(res)=>{
            alert(JSON.stringify(res))
            });
        }
        })
        setShowModal(true)
    }

    return <div>
         <Card className="text-center" style={{color:"black", borderColor:"#C5B358"}}>
            <Card.Body style={{opacity: 0.9, backgroundColor:"black"}}>
                <Form>
                <Form.Group>
                    <Form.Control
                        value={ticketId}
                        onChange = {(e) =>{
                                setTicketId(e.target.value);
                            }
                        }
                        type="text"
                        placeholder="티켓 ID"
                    />
                    <br/>
                    <Form.Control
                        value={ticketPrice}
                        onChange = {(e) =>{
                                setTicketPrice(e.target.value);
                            }
                        }
                        type="text"
                        placeholder="티켓 가격"
                    />
                    <br/>
                    <Form.Control
                        value={ticketNum}
                        onChange = {(e) =>{
                                setTicketNum(e.target.value);
                            }
                        }
                        type="text"
                        placeholder="개수"
                    />
                    <br/>
                </Form.Group>
                <Button
                onClick={()=>mintTicket(ticketId,ticketPrice,ticketNum)} 
                variant="primary" style={{backgroundColor:"#810034", borderColor:"#810034", marginTop:"1rem"}}>전송하기</Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
}

export default MintTicket;