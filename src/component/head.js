import {Alert, Button} from 'react-bootstrap';
import {DEFAULT_ADDRESS} from '../env'
import './head.css'

function Head({myAddress,getUserData,setTab}){

    return <Alert className='head' variant={"balance"} >
          <div className='wallet'>
          {myAddress != DEFAULT_ADDRESS ? `지갑 주소: ${myAddress}` : "지갑을 연동하세요"} 
          </div>
           <Button onClick={getUserData}  type="button" className='headerButton' variant="secondary">
            지갑 연동
          </Button>
          <Button onClick={()=>{setTab("MYPAGE")}} type="button" className='headerButton' variant="secondary">
            My Page
          </Button>
        </Alert>
}

export default Head;