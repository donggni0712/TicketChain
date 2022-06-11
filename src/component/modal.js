import {Button,Modal} from 'react-bootstrap';
import './modal.css'

function PopUp({showModal,setShowModal, modalData}){
    return <Modal className='popup' centered size="sm" show={showModal} onHide={()=>{
            setShowModal(false);
            }}>
            <Modal.Header closeButton className="header">
                <Modal.Title>
                    {modalData.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer className='footer'>
            <Button variant="secondary" onClick={()=>{setShowModal(false)}}>닫기</Button>
            <Button variant="primary" className="okButton" onClick={()=>{
                modalData.onConfirm();
                setShowModal(false);
            }}>진행</Button>
            </Modal.Footer>
        </Modal>
}

export default PopUp;