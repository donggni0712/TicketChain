import { Button } from "react-bootstrap";
import {useState} from "react"
import MakeTicket from "../component/makeTicket.js";
import MintTicket from "../component/mintTicket.js"

function MyPage ({setShowModal,setModalData, myAdress, setQrvalue}) {
      const [component, setComponent] = useState("MyPage");

    return <div>
        미구현 <br/>
        Klay 잔고 조회, 입출금, 민팅 권한 있는 계정에 한해 민팅기능 등 구현 에정<br/>
        <Button onClick={()=>{setComponent("Make")}}>
            Make Ticket
        </Button>
        <Button onClick={()=>{setComponent("Mint")}}>
            Mint Ticket
        </Button>
        {component=="Make" ? <MakeTicket setShowModal={setShowModal} setModalData={setModalData} /> : null}
        {component=="Mint" ? <MintTicket setModalData={setModalData} myAdress={myAdress} setQrvalue={setQrvalue} setShowModal={setShowModal}/> : null}
        
    </div>
}

export default MyPage;