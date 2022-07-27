import { Button } from "react-bootstrap";
import {useState} from "react"
import MakeTicket from "../component/makeTicket.js";

function MyPage () {
      const [component, setComponent] = useState("MyPage");

    return <div>
        미구현 <br/>
        Klay 잔고 조회, 입출금, 민팅 권한 있는 계정에 한해 민팅기능 등 구현 에정<br/>
        <Button onClick={()=>{setComponent("Make")}}>
            Make Ticket
        </Button>

        {component=="Make" ? <MakeTicket/> : null}
        
    </div>
}

export default MyPage;