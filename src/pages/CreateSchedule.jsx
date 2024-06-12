import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import CoursesWithTime from '../components/Learning/CoursesWithTime'
import { Link } from 'react-router-dom'
import CreateForm from '../components/create_schedule/CreateForm'
import createIcon from "../assets/add-schedule.svg"
import { MdAddBox } from "react-icons/md";
import CreateLiveClass from '../components/video-sdk/CreateLiveClass'

const CreateSchedule = () => {

    const [meetingCode, setMeetingCode] = useState("");
    return (
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
                    <div className="" style={{ color: "#8A8A8A" }}>
                        <div className='d-flex mb-3 text-primary justify-content-md-between'>
                            <div>
                                <MdAddBox size={25} />
                            </div>
                            <p>Invite Other Participant</p>
                        </div>
                        <div className="mb-2">
                            <button className='border rounded-pill w-100 btn bg-white'>Add Guest</button>
                        </div>
                        <div className="mt-3">
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
                        </div>
                        <CreateLiveClass meetingCode={meetingCode} setMeetingCode={setMeetingCode} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CreateSchedule