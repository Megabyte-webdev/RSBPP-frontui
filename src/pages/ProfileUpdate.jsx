
import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import createIcon from "../assets/add-schedule.svg"
import { MdAddBox } from "react-icons/md";
import { UserContext } from '../context/AuthContext'
import { CiCircleCheck } from "react-icons/ci";
import ProfileUpdateForm from '../components/update-user/ProfileUpdateForm';

const ProfileUpdate = () => {

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
                    <p className="fw-semibold">Update Your Profile</p>
                    {/* <p>Connect and sync your calendar events with Google Calendar</p> */}
                </div>
            </div>
            <Row>
                <div className='mb-3'>
                    <ProfileUpdateForm setProfileCV={setProfileCV} profileCV={profileCV} />
                </div>
                <Col md={3} className='mb-3'>
                </Col>
            </Row>
        </div>
    )
}

export default ProfileUpdate