import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { MdMoreVert } from "react-icons/md";
import { RiUserHeartLine } from "react-icons/ri";
import { TbMessagePlus } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Messages = () => {
    return (
        <div style={{ backgroundColor: "hsla(219, 50%, 95%, 1)" }}>
            <div className="p-5">
                <Row>
                    <Col md={8}>
                        <h5>General</h5>
                        <div className="p-3 mt-3 d-flex bg-white rounded">
                            <div className="d-flex justify-content-center align-items-center blue_bg rounded-circle text-white me-4 " style={{ width: "50px", height: "45px" }}>
                                <span className='fs-5'>PX</span>
                            </div>
                            <div className='position-relative w-100'>
                                <input type="text" className="btn border rounded bg-white text-start px-4 py-2 w-100" id="search" placeholder='Message' />
                                <div className="position-absolute top-50 end-0 translate-middle-y p-2">
                                </div>
                            </div>
                        </div>
                        <div className='my-3'>
                            <p><span className="fw-light">SORT POST BY</span> <span>MOST RECENT</span> </p>
                            <div className="p-3 mt-3 bg-white rounded">
                                <div className="p-3 mt-3 d-flex">
                                    <div className="d-flex justify-content-center align-items-center blue_bg rounded-circle text-white me-4 " style={{ width: "50px", height: "45px" }}>
                                        <span className='fs-5'>PX</span>
                                    </div>
                                    <div className='w-100'>
                                        <div className="d-flex justify-content-between">
                                            <h6>Nsikak Nelson</h6>
                                            <div>
                                                <MdMoreVert size={30} />
                                            </div>
                                        </div>
                                        <p>Gathering intel</p>
                                        <p className="fs_sm pe-2">
                                            How do you know your learners are retaining knowledge in
                                            appropriate volumes and timeframes? That’s right: You throw
                                            in assessments, and see if the students “catch your drift”. Obviously,
                                            there is a boring We could use many eloquent metaphors, yet it all boils
                                            down to the same: Keep your message
                                        </p>
                                        <div className="d-flex fs_xsm mt-3">
                                            <span className='me-2'>
                                                <RiUserHeartLine />
                                            </span>
                                            <span className='me-2'>
                                                7
                                            </span>
                                            <span className='me-3'>
                                                <TbMessagePlus />
                                            </span>
                                            <span className=''>
                                                6 COMMENTS
                                            </span>

                                        </div>
                                        <div className="d-flex justify-content-between pe-3">
                                            <p><Link to={""} className='text-dark'>View Previous comments</Link></p>
                                            <p><Link to={""} className='text-dark'>2 of 7</Link></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 mt-3 d-flex">
                                    <div className="d-flex justify-content-center align-items-center blue_bg rounded-circle text-white me-4 " style={{ width: "50px", height: "45px" }}>
                                        <span className='fs-5'>PX</span>
                                    </div>
                                    <div className='w-100'>
                                        <div className="d-flex justify-content-between">
                                            <h6>Nsikak Nelson</h6>
                                            <div>
                                                <MdMoreVert size={30} />
                                            </div>
                                        </div>
                                        <p>Gathering intel</p>
                                        <p className="fs_sm pe-2">
                                            How do you know your learners are retaining knowledge in
                                            appropriate volumes and timeframes? That’s right: You throw
                                            in assessments, and see if the students “catch your drift”. Obviously,
                                            there is a boring We could use many eloquent metaphors, yet it all boils
                                            down to the same: Keep your message
                                        </p>
                                        <div className="d-flex fs_xsm mt-3">
                                            <span className='me-2'>
                                                <RiUserHeartLine />
                                            </span>
                                            <span className='me-2'>
                                                7
                                            </span>
                                            <span className='me-3'>
                                                <TbMessagePlus />
                                            </span>
                                            <span className=''>
                                                6 COMMENTS
                                            </span>

                                        </div>
                                        <div className="d-flex justify-content-between pe-3">
                                            <p><Link to={""} className='text-dark'>View Previous comments</Link></p>
                                            <p><Link to={""} className='text-dark'>2 of 7</Link></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 mt-3 d-flex">
                                    <div className="d-flex justify-content-center align-items-center blue_bg rounded-circle text-white me-4 " style={{ width: "50px", height: "45px" }}>
                                        <span className='fs-5'>PX</span>
                                    </div>
                                    <div className='w-100'>
                                        <div className="d-flex justify-content-between">
                                            <h6>Nsikak Nelson</h6>
                                            <div>
                                                <MdMoreVert size={30} />
                                            </div>
                                        </div>
                                        <p>Gathering intel</p>
                                        <p className="fs_sm pe-2">
                                            How do you know your learners are retaining knowledge in
                                            appropriate volumes and timeframes? That’s right: You throw
                                            in assessments, and see if the students “catch your drift”. Obviously,
                                            there is a boring We could use many eloquent metaphors, yet it all boils
                                            down to the same: Keep your message
                                        </p>
                                        <div className="d-flex fs_xsm mt-3">
                                            <span className='me-2'>
                                                <RiUserHeartLine />
                                            </span>
                                            <span className='me-2'>
                                                7
                                            </span>
                                            <span className='me-3'>
                                                <TbMessagePlus />
                                            </span>
                                            <span className=''>
                                                6 COMMENTS
                                            </span>

                                        </div>
                                        <div className="d-flex justify-content-between pe-3">
                                            <p><Link to={""} className='text-dark'>View Previous comments</Link></p>
                                            <p><Link to={""} className='text-dark'>2 of 7</Link></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 mt-3 d-flex bg-white rounded">
                            <div className="d-flex justify-content-center align-items-center blue_bg rounded-circle text-white me-4 " style={{ width: "50px", height: "45px" }}>
                                <span className='fs-5'>PX</span>
                            </div>
                            <div className='position-relative w-100'>
                                <input type="text" className="btn border rounded bg-white text-start px-4 py-2 w-100" id="search" placeholder='Message' />
                                <div className="position-absolute top-50 end-0 translate-middle-y p-2">
                                </div>
                            </div>
                        </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="rounded bg-white pb-5">
                            <div className="rounded py-5 light_ash" style={{ minHeight: "200px" }}>
                            </div>
                            <div className="p-3">
                                <h4>Details</h4>
                                <p>
                                    Community wide announcements and discussions
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Messages