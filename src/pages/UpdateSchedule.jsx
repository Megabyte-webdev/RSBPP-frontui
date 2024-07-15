import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import CreateForm from '../components/create_schedule/CreateForm'
import createIcon from "../assets/add-schedule.svg"
import CreateLiveClass from '../components/video-sdk/CreateLiveClass'

function UpdateSchedule() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [meetingCode, setMeetingCode] = useState("");

  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
        <div
            className="p-3 p-md-5"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .3)" }}
        >
            <div className="d-flex px-2">
                <div>
                    <img src={createIcon} className='img-fluid' alt="" />
                </div>
                <div className='ms-3'>
                    <p className="fw-semibold">Schedule a class</p>
                    <p>Connect and sync your calendar events with Google Calendar</p>
                </div>
            </div>
            <Row>
                <Col md={9} className='mb-3'>
                    <CreateForm meetingCode={meetingCode} setMeetingCode={setMeetingCode} />
                </Col>
                <Col md={3} className='mb-3'>
                    <div className="h-100 d-flex pb-5" style={{ color: "#8A8A8A" }}>
                        {/* <div className='d-flex mb-3 text-primary justify-content-md-between'>
                            <div>
                                <MdAddBox size={25} />
                            </div>
                            <p>Invite Other Participant</p>
                        </div> */}
                        {/* <div className="mb-2">
                            <button className='border rounded-pill w-100 btn bg-white'>Add Guest</button>
                        </div> */}
                        {/* <div className="mt-3">
                            <h5 className='text-dark'>Guest Permission</h5>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="modify" />
                                <label className="form-check-label" htmlFor="modify">
                                    Modify Events
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invites" />
                                <label className="form-check-label" htmlFor="invites">
                                    Invite others
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="guest" />
                                <label className="form-check-label" htmlFor="guest">
                                    See guest List
                                </label>
                            </div>
                        </div> */}
                        <div className='mb-5 pb-5'>
                            <CreateLiveClass meetingCode={meetingCode} setMeetingCode={setMeetingCode} />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default UpdateSchedule

