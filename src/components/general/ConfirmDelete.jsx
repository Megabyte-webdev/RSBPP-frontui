import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmDelete({ course, show, setShow, errorMesage, isDeleting, deleteFunc, }) {

    // console.log(course)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="secondary" className='w-100' onClick={handleShow}>
                Delete
            </Button>

            <Modal 
            show={show} 
            centered
            onHide={handleClose}>
                <Modal.Header closeButton className='bottom_brown'>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center fw-semibold">Are you want to delete:</p>
                    <p className="text-center fw-bold">{course.title} ?</p>
                    {errorMesage && (
                        <p className='prime_brown text-center'>{errorMesage}</p>
                    )}
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <Button variant="secondary hover_effect" onClick={handleClose}>
                        Back
                    </Button>
                    <Button variant="primary hover_effect w-50 brown_bg border-0" onClick={() => deleteFunc()}>
                        Delete {isDeleting && (<Spinner size='sm' />)}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmDelete;