import { useState } from "react";
import {makeTicekt} from '../api/UseTicketDB.js'
import {Form,Card,Button} from 'react-bootstrap'

function MakeTicket(){
    const [ticketId,setTicketId] = useState(0);
    const [ticketName, setTicketName] = useState("");
    const [place, setPlace] = useState("");
    const [expired, setExpired] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [webUrl, setWebUrl] = useState("");
    const [canTrade,setCanTrade] = useState(false);

    const ClickMake = async (ticketName, place, expired, canTrade, imgSrc, webUrl) =>{
        makeTicekt(ticketName,place,expired,canTrade,imgSrc,webUrl);
    };

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
                        value={ticketName}
                        onChange = {(e) =>{
                                setTicketName(e.target.value);
                            }
                        }
                        type="text"
                        placeholder="티켓 이름"
                    />
                    <br/>
                    <Form.Control 
                        value={place}
                        onChange = {(e) =>{
                                setPlace(e.target.value);
                            }
                        }
                        type="text"
                        placeholder="장소"
                    />
                    <br/>
                    <Form.Control 
                        value={expired}
                        onChange = {(e) =>{
                                setExpired(e.target.value);
                            }
                        }
                        type="text"
                        placeholder="날짜(yyyy-mm-dd)"
                    />
                    <br/>
                    <Form.Control 
                        value={imgSrc}
                        onChange = {(e) =>{
                                setImgSrc(e.target.value);
                            }
                        }
                        type="text"
                        placeholder="이미지 주소"
                    />
                    <br/>
                    <Form.Control 
                        value={webUrl}
                        onChange = {(e) =>{
                                setWebUrl(e.target.value);
                            }
                        }
                        type="text"
                        placeholder="홈페이지 주소"
                    />
                    <br/>
                    <Form.Check
                        onChange = {(e) =>{
                                setCanTrade(!canTrade);
                            }
                        }
                        type="switch"
                        id="custom-switch"
                        label={canTrade==false ? "교환 불가능" : "교환 가능"}
                        style={{color:"white", width:"150px"}}
                    />
                </Form.Group>
                <Button
                onClick={()=>ClickMake(ticketName,place,expired,canTrade,imgSrc,webUrl)} 
                variant="primary" style={{backgroundColor:"#810034", borderColor:"#810034", marginTop:"1rem"}}>전송하기</Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
}

export default MakeTicket;