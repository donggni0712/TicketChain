import { Button } from "react-bootstrap";
import {useState} from "react"
import MakeTicket from "../components/submit/makeTicket.js";
import MintTicket from "../components/submit/mintTicket.js"
import Title from "../components/title.js"

function MyPage ({setShowModal,setModalData, myAdress, setQrvalue}) {
      const [component, setComponent] = useState("MyPage");
      const [text,setText] = useState("MyPage")
    return <div>
        <Title text={text}/>
        <Button className="Button" variant="danger" onClick={()=>{setText("MyPage > MakeTicket");setComponent("Make")}}>
            Make Ticket
        </Button>
        <Button className="Button" variant="danger" onClick={()=>{setText("MyPage > MintTicket");setComponent("Mint")}}>
            Mint Ticket
        </Button>
        {component=="Make" ? <MakeTicket setShowModal={setShowModal} setModalData={setModalData} /> : null}
        {component=="Mint" ? <MintTicket setModalData={setModalData} myAdress={myAdress} setQrvalue={setQrvalue} setShowModal={setShowModal}/> : null}
        
    </div>
}

export default MyPage;