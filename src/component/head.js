import {Alert} from 'react-bootstrap';
import {DEFAULT_ADDRESS} from '../env'
import './head.css'

function Head({myAddress,getUserData}){

    return <Alert className='head' variant={"balance"} onClick={getUserData}>
          {myAddress != DEFAULT_ADDRESS ? `지갑 주소: ${myAddress}` : "지갑 연동하기"} 
        </Alert>
}

export default Head;