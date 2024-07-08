import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { PiCertificateLight } from "react-icons/pi";
import { BsInfoLg } from "react-icons/bs";
import { GiVideoConference } from "react-icons/gi";
import { MdOutlineOfflinePin } from "react-icons/md";

const Widget = ({ handleClose }) => {

    const navigate = useNavigate()

    // const handleOnboarding = () => {
    //     navigate("/")
    // }
    return (
        <div className='mb-3'>
            <div className='my-3 my-md-5 text-center'>
                <h3>Kindly use the Widget</h3>
                <p>To select the Type of course you want to subscribe to</p>
            </div>
            <Row>
                <Col md={4} className='mb-3'>
                    <div
                        onClick={() => {
                            navigate("/learning")
                            handleClose()
                        }}
                        className='nav-link pointer h-100'>
                        <div className="p-3 rounded border-2 border_brown border h-100">
                            <div className="d-flex justify-content-between">
                                <h5>Certificate Course</h5>
                                <div>
                                    <PiCertificateLight size={40} />
                                </div>
                            </div>
                            <div className="d-flex">
                                <p> <BsInfoLg size={30} /> </p>
                                <p className='fs_xsm'>Description about the certifate course is here</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4} className='mb-3'>
                    <div
                        onClick={() => {
                            navigate("/learning")
                            handleClose()
                        }}
                        className='nav-link pointer h-100'>
                        <div className="p-3 rounded border-2 border_brown border h-100">
                            <div className="d-flex justify-content-between">
                                <h5>Executive Online</h5>
                                <div>
                                    <GiVideoConference size={40} />
                                </div>
                            </div>
                            <div className="d-flex">
                                <p> <BsInfoLg size={30} /> </p>
                                <p className='fs_xsm'>Description about the certifate course is here</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4} className='mb-3'>
                    <div
                        onClick={() => {
                            navigate("/learning")
                            handleClose()
                        }}
                        className='nav-link pointer h-100'>
                        <div className="p-3 rounded border-2 border_brown border h-100">
                            <div className="d-flex justify-content-between">
                                <h5>Offline</h5>
                                <div>
                                    <MdOutlineOfflinePin size={40} />
                                </div>
                            </div>
                            <div className="d-flex">
                                <p> <BsInfoLg size={30} /> </p>
                                <p className='fs_xsm'>Description about the certifate course is here</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="mt-5 col-6 mx-auto">
                <Button
                    onClick={() => handleClose()}
                    type="submit" className="brown_bg rounded-3 border-0 w-100">
                    {/* {isLoading && (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )} */}
                    {/* {!isLoading &&  */}
                    Skip to proceed
                    {/* } */}
                </Button>
            </div>
        </div >
    )
}

export default Widget