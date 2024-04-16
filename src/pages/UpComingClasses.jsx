import React from 'react'
import { Col, Row } from 'react-bootstrap'
import CoursesWithTime from '../components/Learning/CoursesWithTime'
import { Link } from 'react-router-dom'

const UpComingClasses = () => {
    return (
        <div
            className="p-3 p-md-5"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .3)" }}
        >
            <div className="col-md-8">
                <div className=" border-bottom">
                    <h2>Upcoming Schedule</h2>
                </div>
                <div className="d-flex fs_xsm my-4" >
                    <button className='brown_bg text-white border-0 fw-semibold p-2'>All Programs</button>
                    <button className=' inherit_bg border-0 fw-semibold p-2'>Masters Programmes</button>
                    <button className=' inherit_bg border-0 fw-semibold p-2'>Online Programmes</button>
                    <button className=' inherit_bg border-0 fw-semibold p-2'>Faculty of Business</button>
                    <button className=' inherit_bg border-0 fw-semibold p-2'>Faculty of Good Governance</button>
                </div>
            </div>
            <div className="my-5">
                <Row>
                    <Col md={8}>
                        <Row>
                            <Col xs={6} md={4} className='mb-3'>
                                <CoursesWithTime />
                            </Col>
                            <Col xs={6} md={4} className='mb-3'>
                                <CoursesWithTime />
                            </Col>
                            <Col xs={6} md={4} className='mb-3'>
                                <CoursesWithTime />
                            </Col>
                            <Col xs={6} md={4} className='mb-3'>
                                <CoursesWithTime />
                            </Col>
                            <Col xs={6} md={4} className='mb-3'>
                                <CoursesWithTime />
                            </Col>
                            <Col xs={6} md={4} className='mb-3'>
                                <CoursesWithTime />
                            </Col>
                        </Row>
                    </Col>
                    <Col className="my-3 my-md-0" md={4}>
                        <div className="shadow p-2">
                            <div className="d-flex justify-content-between">
                                <p className="my-4">Group Activities</p>
                                <Link className="d-flex nav-link text-primary align-items-center">
                                    <p className="fw-bold prime_brown">see all</p>
                                </Link>
                            </div>
                            <div className="light_danger my-2 rounded p-1">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="rounded brown_bg p-1 px-2 text-white">
                                        <span className="fw-bold">31</span>
                                    </div>
                                    <div className="px-2 fw-semibold">
                                        <p className="fs_sm">Meeting with the VC</p>
                                        <p className="fs_xsm"> <Link className='nav-link' to={""}>Meeting link//www.zoom.com Upcoming</Link> </p>
                                    </div>
                                    <div className="">
                                        <p className="fs_xsm">10:25 am</p>
                                        <p className="fs_xsm fw-semibold text-danger">Due soon</p>
                                    </div>
                                </div>
                            </div>
                            <div className="light_danger my-2 rounded p-1">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="rounded brown_bg p-1 px-2 text-white">
                                        <span className="fw-bold">31</span>
                                    </div>
                                    <div className="px-2 fw-semibold">
                                        <p className="fs_sm">Meeting with the VC</p>
                                        <p className="fs_xsm"> <Link className='nav-link' to={""}>Meeting link//www.zoom.com Upcoming</Link> </p>
                                    </div>
                                    <div className="">
                                        <p className="fs_xsm">10:25 am</p>
                                        <p className="fs_xsm fw-semibold text-danger">Due soon</p>
                                    </div>
                                </div>
                            </div>
                            <div className="light_danger my-2 rounded p-1">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="rounded brown_bg p-1 px-2 text-white">
                                        <span className="fw-bold">31</span>
                                    </div>
                                    <div className="px-2 fw-semibold">
                                        <p className="fs_sm">Meeting with the VC</p>
                                        <p className="fs_xsm"> <Link className='nav-link' to={""}>Meeting link//www.zoom.com Upcoming</Link> </p>
                                    </div>
                                    <div className="">
                                        <p className="fs_xsm">10:25 am</p>
                                        <p className="fs_xsm fw-semibold text-danger">Due soon</p>
                                    </div>
                                </div>
                            </div>
                            <div className="light_danger my-2 rounded p-1">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="rounded brown_bg p-1 px-2 text-white">
                                        <span className="fw-bold">31</span>
                                    </div>
                                    <div className="px-2 fw-semibold">
                                        <p className="fs_sm">Meeting with the VC</p>
                                        <p className="fs_xsm"> <Link className='nav-link' to={""}>Meeting link//www.zoom.com Upcoming</Link> </p>
                                    </div>
                                    <div className="">
                                        <p className="fs_xsm">10:25 am</p>
                                        <p className="fs_xsm fw-semibold text-danger">Due soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default UpComingClasses