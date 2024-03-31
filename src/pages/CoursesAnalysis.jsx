import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FiClock, FiSearch } from 'react-icons/fi'
import { PiHourglass } from "react-icons/pi";
import { MdOutlineAssignment } from "react-icons/md";
import CoursesStats from '../components/courses/CoursesStats'
import ReactCalendar from '../components/general/ReactCalendar'
import FeatureCourses from '../components/courses/FeatureCourses'
import { ThemeContext } from '../context/ThemeContext'
import user from "../assets/user-icon.png"
import RoundChart from '../components/general/RoundChart';
import BarChart from '../components/general/BarCharts';

const CoursesAnalysis = () => {
    const { setSideBg } = useContext(ThemeContext);

    useEffect(()=>{
        setSideBg("brown_sidebar")
    }, [])

    const strokeProps = {
        strokeCap: "round",
        strokeColor: "#AB3335",
        strokeSize: "65%"
    }

    return (
        <div className='p-5 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, 1)" }}>
            <div className='col-8 col-md-4'>
                <form className='open_sans mb-3 ' style={{ color: "hsla(242, 97%, 15%, .6)" }}>
                    <div className="mb-4">
                        <div className='position-relative'>
                            <input type="text" className="btn border bg-white text-start px-5 py-2 w-100" id="search" placeholder='Search' />
                            <span className="position-absolute start-0 top-0 p-2"><FiSearch /> </span>
                        </div>
                    </div>
                </form>
            </div>
            <Row>
                <Col md={9}>
                    <div className="brown_bg p-5 my-4 rounded">
                        <div className="d-flex align-items-center text-white">
                            <div className="me-3 border border-4 rounded-pill">
                                <img src={user} alt="" className="img-fluid" />
                            </div>
                            <div>
                                <p>Ekong  Lawal</p>
                                <p>S7 - Electronics and communication Engineering</p>
                                <p className="fs_xsm">Course No : 673664646</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex px-3 mb-3 justify-content-between">
                        <p>Subject Overview</p>
                    </div>
                    <div className="rounded bg-white p-3">
                        <p>Subject Overview</p>
                        <Row className='my-3'>
                            <Col>
                                <div className="p-2 d-flex" style={{ backgroundColor: "hsla(242, 97%, 15%, 0.2)" }}>
                                    <div className="d-flex video_btns" style={{ backgroundColor: "hsla(242, 97%, 15%, 1)" }}>
                                        <span>
                                            <FiClock color='fff' size={25} />
                                        </span>

                                    </div>
                                    <div className="ms-2 prime_blue">
                                        <p>Total Hours</p>
                                        <span>50</span>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="p-2 d-flex" style={{ backgroundColor: "hsla(120, 23%, 95%, 1)" }}>
                                    <div className="d-flex video_btns" style={{ backgroundColor: "hsla(113, 21%, 76%, 1)" }}>
                                        <span>
                                            <FiClock color='fff' size={25} />
                                        </span>

                                    </div>
                                    <div className="ms-2" style={{ color: "hsla(113, 21%, 76%, 1)" }}>
                                        <p>Teach Hours</p>
                                        <span>36</span>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="p-2 d-flex" style={{ backgroundColor: "hsla(8, 67%, 95%, 1)" }}>
                                    <div className="d-flex video_btns" style={{ backgroundColor: "hsla(2, 68%, 75%, 1)" }}>
                                        <span>
                                            <PiHourglass color='fff' size={25} />
                                        </span>

                                    </div>
                                    <div className="ms-2" style={{ color: "hsla(2, 68%, 75%, 1)" }}>
                                        <p>Remaining Hours</p>
                                        <span>14</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={3}>
                    <ReactCalendar />
                </Col>
            </Row>
            <div className="my-3">
                <h5 className="prime_blue mb-3" >Course Stats</h5>
                <Row>
                    <Col md={9}>
                        <div className="bg-white p-3">
                            <Row>
                                <Col md={5}>
                                    <div className="border p-2 h-100 rounded">
                                        <p className="text-center my-2">Syllabus Overview</p>
                                        <RoundChart strokeProps={strokeProps} />
                                    </div>
                                </Col>
                                <Col md={7}>
                                    <div className="border p-2 h-100 rounded">
                                        <div className="d-flex justify-content-between">
                                            <p>Attendance Overview</p>
                                            <p>Jan 2024</p>
                                        </div>
                                        <BarChart />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="bg-white rounded py-2" style={{ minHeight: "200px" }}>
                            <div className="border-bottom py-3">
                                <p className="text-center">Upcoming Events</p>
                            </div>
                            <div className="event_body px-3 mt-2 fs_xsm">
                                <div className="d-flex mb-2 align-items-center">
                                    <div className='tiny_circle border border-dark'>
                                        <span> <MdOutlineAssignment size={15} /> </span>
                                    </div>
                                    <div className='ms-3'>
                                        <p>Assignment conclusion</p>
                                        <p>19-0802023 Friday </p>
                                    </div>
                                </div>
                                <div className="d-flex mb-2 align-items-center">
                                    <div className='tiny_circle border border-dark'>
                                        <span> <MdOutlineAssignment size={15} /> </span>
                                    </div>
                                    <div className='ms-3'>
                                        <p>Assignment conclusion</p>
                                        <p>19-0802023 Friday </p>
                                    </div>
                                </div>
                                <div className="d-flex mb-2 align-items-center">
                                    <div className='tiny_circle border border-dark'>
                                        <span> <MdOutlineAssignment size={15} /> </span>
                                    </div>
                                    <div className='ms-3'>
                                        <p>Assignment conclusion</p>
                                        <p>19-0802023 Friday </p>
                                    </div>
                                </div>
                                <div className="d-flex mb-2 align-items-center">
                                    <div className='tiny_circle border border-dark'>
                                        <span> <MdOutlineAssignment size={15} /> </span>
                                    </div>
                                    <div className='ms-3'>
                                        <p>Assignment conclusion</p>
                                        <p>19-0802023 Friday </p>
                                    </div>
                                </div>
                                <div className="d-flex mb-2 align-items-center">
                                    <div className='tiny_circle border border-dark'>
                                        <span> <MdOutlineAssignment size={15} /> </span>
                                    </div>
                                    <div className='ms-3'>
                                        <p>Assignment conclusion</p>
                                        <p>19-0802023 Friday </p>
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

export default CoursesAnalysis