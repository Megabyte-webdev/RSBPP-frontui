import React from 'react'
import { Col, Row } from 'react-bootstrap'
import dashVideo from "../assets/dashboard-video.png"
import classVideo from "../assets/dash-icons/classes.svg"
import forum from "../assets/dash-icons/forum.svg"
import schedule from "../assets/dash-icons/schedule.svg"
import { Link } from 'react-router-dom'

const DashboardTwo = () => {
    return (
        <div className='p-5' style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}>
            <Row>
                <Col md={8}>
                    <h6 className='my-4'>Ngozi, Introduction to Public Procurement</h6>
                    <Row>
                        <Col md={6} className=' my-4 dash_grid'>
                            <div className="shadow h-100 p-0 rounded">
                                <Link to={""} className='nav-link h-100'>
                                    <img src={dashVideo} alt="" className="img-fluid h-100 w-100" />
                                </Link>
                            </div>
                        </Col>
                        <Col md={6} className=' my-4 dash_grid'>
                            <Link to={""} className='nav-link h-100'>
                                <div className="shadow p-0 h-100 rounded d-flex justify-content-center align-items-center">
                                    <div>
                                        <div>
                                            <img src={classVideo} alt="" className="img-fluid" />
                                        </div>
                                        <p className='fw-semibold fs_sm'>Enter Class Room</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col md={6} className=' my-4 dash_grid'>
                            <Link to={""} className='nav-link h-100'>
                                <div className="shadow p-0 h-100 rounded d-flex justify-content-center align-items-center">
                                    <div>
                                        <div>
                                            <img src={forum} alt="" className="img-fluid" />
                                        </div>
                                        <p className='fw-semibold fs_sm'>Forum</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col md={6} className=' my-4 dash_grid'>
                            <Link to={""} className='nav-link h-100'>
                                <div className="shadow p-0 h-100 rounded d-flex justify-content-center align-items-center">
                                    <div>
                                        <div>
                                            <img src={schedule} alt="" className="img-fluid" />
                                        </div>
                                        <p className='fw-semibold fs_sm'>Course Schedule / <br /> Time Table</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    <h6 className='my-4'>Class for the Week</h6>
                    <div className='py-4'>
                        <div className="d-flex mb-2" style={{ backgroundColor: "hsla(0, 0%, 85%, 1)" }}>
                            <div className="brown_bg px-1 me-2"></div>
                            <div className="w-100 fs_sm d-flex align-items-center">
                                <p>New Class Published</p>
                            </div>
                            <div className='fs_xsm'>
                                <div className="py-1 px-1 mb-1 blue_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                                <div className="py-1 px-1 brown_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mb-2" style={{ backgroundColor: "hsla(0, 0%, 85%, 1)" }}>
                            <div className="blue_bg px-1 me-2"></div>
                            <div className="w-100 fs_sm d-flex align-items-center">
                                <p>New Class Published</p>
                            </div>
                            <div className='fs_xsm'>
                                <div className="py-1 px-1 mb-1 blue_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                                <div className="py-1 px-1 brown_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mb-2" style={{ backgroundColor: "hsla(0, 0%, 85%, 1)" }}>
                            <div className="brown_bg px-1 me-2"></div>
                            <div className="w-100 fs_sm d-flex align-items-center">
                                <p>New Class Published</p>
                            </div>
                            <div className='fs_xsm'>
                                <div className="py-1 px-1 mb-1 blue_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                                <div className="py-1 px-1 brown_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mb-2" style={{ backgroundColor: "hsla(0, 0%, 85%, 1)" }}>
                            <div className="blue_bg px-1 me-2"></div>
                            <div className="w-100 fs_sm d-flex align-items-center">
                                <p>New Class Published</p>
                            </div>
                            <div className='fs_xsm'>
                                <div className="py-1 px-1 mb-1 blue_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                                <div className="py-1 px-1 brown_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mb-2" style={{ backgroundColor: "hsla(0, 0%, 85%, 1)" }}>
                            <div className="brown_bg px-1 me-2"></div>
                            <div className="w-100 fs_sm d-flex align-items-center">
                                <p>New Class Published</p>
                            </div>
                            <div className='fs_xsm'>
                                <div className="py-1 px-1 mb-1 blue_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                                <div className="py-1 px-1 brown_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mb-2" style={{ backgroundColor: "hsla(0, 0%, 85%, 1)" }}>
                            <div className="blue_bg px-1 me-2"></div>
                            <div className="w-100 fs_sm d-flex align-items-center">
                                <p>New Class Published</p>
                            </div>
                            <div className='fs_xsm'>
                                <div className="py-1 px-1 mb-1 blue_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                                <div className="py-1 px-1 brown_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mb-2" style={{ backgroundColor: "hsla(0, 0%, 85%, 1)" }}>
                            <div className="brown_bg px-1 me-2"></div>
                            <div className="w-100 fs_sm d-flex align-items-center">
                                <p>New Class Published</p>
                            </div>
                            <div className='fs_xsm'>
                                <div className="py-1 px-1 mb-1 blue_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                                <div className="py-1 px-1 brown_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mb-2" style={{ backgroundColor: "hsla(0, 0%, 85%, 1)" }}>
                            <div className="blue_bg px-1 me-2"></div>
                            <div className="w-100 fs_sm d-flex align-items-center">
                                <p>New Class Published</p>
                            </div>
                            <div className='fs_xsm'>
                                <div className="py-1 px-1 mb-1 blue_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                                <div className="py-1 px-1 brown_bg text-light">
                                    <p>07/FEB/2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DashboardTwo