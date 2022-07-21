import {useState} from 'react';
import * as KlipAPI from '../api/UseKlip'
import {Card, Form, Button} from 'react-bootstrap'

function TransferToWallet({myAddress, ticketInfo, setQrvalue}){
    const [transferAddr, setTransferAddr] = useState("");



    const ClickTransfer = async (tokenID, toAddr) =>{
        KlipAPI.transferTicket(myAddress,toAddr,tokenID,setQrvalue,(result)=>{
            alert(JSON.stringify(result));
        })
  };

    return <div className="TransferToWallet" style={{padding:0, width:"100%"}}>
        <Card className="text-center" style={{color:"black", borderColor:"#C5B358"}}>
            <Card.Body style={{opacity: 0.9, backgroundColor:"black"}}>
                <Card.Img src={ticketInfo.imgsrc} height={"50%"} />
                <Form>
                <Form.Group>
                    <Form.Control 
                        value={transferAddr}
                        onChange = {(e) =>{
                            setTransferAddr(e.target.value);
                        }
                        }
                        type="text"
                        placeholder="전송할 지갑의 주소를 입력하세요."
                    />
                    <br/>
                </Form.Group>
                <Button
                onClick={()=>ClickTransfer(ticketInfo.id,transferAddr)} 
                variant="primary" style={{backgroundColor:"#810034", borderColor:"#810034", marginTop:"1rem"}}>전송하기</Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
}

export default TransferToWallet;