import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { OutlinedButton } from '../buttons/OutlinedButton';
import EndIcon from '../../icons/Bottombar/EndIcon';
import { useNavigate } from 'react-router-dom';
import { useMeeting } from '@videosdk.live/react-sdk';

function EndCallDialog() {
  const navigate = useNavigate()

  const { leave, end } = useMeeting();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <OutlinedButton
        Icon={EndIcon}
        bgColor="bg-red-500"
        onClick={() => {
          handleShow();
          // leave();
          // navigate("/")
          // setIsMeetingLeft(true);
        }}
        tooltip="End Meeting"
      />

      <Modal
        centered
        size="sm"
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>Are you sure you want to end call? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <OutlinedButton
            Icon={EndIcon}
            bgColor="bg-red-500"
            onClick={() => {
              end();
              navigate("/");
              handleClose();
              handleRefresh();
              // setIsMeetingLeft(true);
            }}
            tooltip=""
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EndCallDialog;