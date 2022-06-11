import {Button,Modal} from 'react-bootstrap';

function PopUp({showModal,setShowModal, modalData}){
    return <Modal className='popup' centered size="sm" show={showModal} onHide={()=>{
            setShowModal(false);
            }}>
            <Modal.Header closeButton style={{border:0, opacity:0.8}}>
                <Modal.Title>
                    {modalData.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer style={{border:0,  opacity:0.8}}>
            <Button variant="secondary" onClick={()=>{setShowModal(false)}}>닫기</Button>
            <Button variant="primary" onClick={()=>{
                modalData.onConfirm();
                setShowModal(false);
            }} style={{backgroundColor:"#810034", borderColor:"#810034"}}>진행</Button>
            </Modal.Footer>
        </Modal>
}

export default PopUp;