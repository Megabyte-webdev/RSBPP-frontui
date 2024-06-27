import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import createIcon from "../assets/add-schedule.svg"
import { MdAddBox } from "react-icons/md";
import { UserContext } from '../context/AuthContext'
import UpdateForm from '../components/instructor/UpdateForm';
import { CiCircleCheck } from "react-icons/ci";

const UpdateProfile = () => {

    const { userCredentials } = useContext(UserContext)
    const [profileCV, setProfileCV] = useState()

    // console.log(profileCV)

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
                    <p className="fw-semibold">Complete Your Profile</p>
                    <p>Connect and sync your calendar events with Google Calendar</p>
                </div>
            </div>
            <Row>
                <Col md={9} className='mb-3'>
                    <UpdateForm setProfileCV={setProfileCV} profileCV={profileCV} />
                </Col>
                <Col md={3} className='mb-3'>
                    {/* <div className="" style={{ color: "#8A8A8A" }}>
                        <div className='d-flex mb-3 text-primary justify-content-m-between'>
                            <div>
                                <MdAddBox size={25} />
                            </div>
                            <p className='ms-2'>Require Document</p>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="cv" className='border rounded-3 w-100 bg-white btn text-secondary'>
                                {profileCV ? profileCV.name : "C.V"}  <span className='text-success'>
                                    {profileCV && <CiCircleCheck size={25} />}
                                </span>
                            </label>
                        </div>
                        <div className="mb-2">
                            <button className='border rounded-3 w-100 btn bg-white text-secondary'>Other related documents</button>
                        </div>
                        <div className="mb-2">
                            <button className='border rounded-3 w-100 btn bg-white text-secondary'>Aggrements</button>
                        </div>
                    </div> */}
                </Col>
            </Row>
        </div>
    )
}

export default UpdateProfile