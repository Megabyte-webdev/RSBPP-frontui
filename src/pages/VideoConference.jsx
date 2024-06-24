import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import videoConference from "../assets/main-video-screen.png"
import Listeners from '../components/video_conference/Listeners'
import VideoButtons from '../components/video_conference/VideoButtons'
import { FiChevronDown, FiChevronUp, FiSearch, FiUser } from 'react-icons/fi'
import { MdOutlineGroupAdd, MdAttachFile, MdSend } from "react-icons/md";
import VideoParticipants from '../components/video_conference/VideoParticipants'
import VideoChats from '../components/video_conference/VideoChats'
import { ThemeContext } from '../context/ThemeContext'
import VideoApp from '../components/video-sdk/VideoApp'
import { useLocation } from 'react-router-dom'

const VideoConference = () => {
    const { state } = useLocation()
    const { setSideBg } = useContext(ThemeContext);
    // console.log(state)
    const day = new Date(state.list.day).toDateString()

    setSideBg("brown_sidebar")
    return ( 
        <div className='p-3 p-md-5 poppins min-vh-100' style={{ backgroundColor: "hsla(219, 50%, 95%, 1)" }}>
            <Row>
                <Col md={7}>
                    <div className="my-3">
                        <h4>Live class</h4>
                        <p className='fw-semibold'>{state.oneCourse?.title}</p>
                        <p>{day} | {state.list.start_time}</p>
                    </div>
                </Col>
                <Col md={5}>
                    <div>
                        <form className='open_sans mb-3 ' style={{ color: "hsla(242, 97%, 15%, .6)" }}>
                            <div className="mb-4">
                                <div className='position-relative'>
                                    <input type="text" className="btn border bg-white text-start px-5 py-2 w-100" id="search" placeholder='Search' />
                                    <span className="position-absolute start-0 top-0 p-2"><FiSearch /> </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={7}>
                    <div>
                        <div className=''>
                            {/* <img src={videoConference} alt="" className="img-fluid" /> */}
                        </div>
                        <div>
                            <VideoApp state={state} />
                        </div>
                        {/* <div className="bg-white p-3 rounded">
                            <Row>
                                <Col xs={6} md={3}>
                                    <Listeners />
                                </Col>
                                <Col xs={6} md={3}>
                                    <Listeners />
                                </Col>
                                <Col xs={6} md={3}>
                                    <Listeners />
                                </Col>
                                <Col xs={6} md={3}>
                                    <Listeners />
                                </Col>
                            </Row>
                        </div>
                        <VideoButtons /> */}
                    </div>
                </Col>
                {/* <Col md={5}>
                    <div className="bg-white rounded mb-5">
                        <div className="brown_bg p-2 px-3 d-flex align-items-center rounded">
                            <p className='text-white fs_sm me-2'>Participants</p>
                            <div className='position-relative me-2'>
                                <input type="text" className="btn border rounded-pill bg-white text-start px-5 w-100" id="search" placeholder='Search' />
                                <span className="position-absolute start-0 top-0 p-1 ps-2"><MdOutlineGroupAdd /> </span>
                            </div>
                            <span>
                                <FiChevronUp color='#fff' />
                            </span>
                        </div>
                        <div className="p-3">
                            <VideoParticipants />
                            <VideoParticipants />
                            <VideoParticipants />
                        </div>
                    </div>
                    <div className="bg-white rounded mb-5">
                        <div className="blue_bg p-2 px-3 d-flex align-items-center justify-content-between rounded">
                            <p className='text-white fs_sm me-2'>Chats</p>
                            <div className="bg-white py-1 ps-1 pe-3 rounded-pill d-flex align-items-center">
                                <button className='btn blue_bg text-white py-0 px-3 rounded-pill me-2'>Groups</button>
                                <p>Personal</p>
                            </div>
                            <span>
                                <FiChevronUp color='#fff' />
                            </span>
                        </div>
                        <div className="p-3 py-4">
                            <VideoChats />
                            <VideoChats />
                            <VideoChats />
                        </div>
                    </div>
                    <div className="typing_section">
                        <div className="bg-white p-2 px-3 d-flex align-items-center rounded">
                            <p className='text-white fs_sm me-2'>
                                <MdAttachFile className='text-dark' size={20} />
                            </p>
                            <div className='position-relative me-2'>
                                <input type="text" className="btn border rounded-pill bg-white text-start px-3 w-100" id="search" placeholder='Type Something....' />
                            </div>
                            <div className='border-dark border  border-2 video_btns'>
                                <MdSend color='#000' />
                            </div>
                        </div>
                    </div>
                </Col> */}
            </Row>
        </div>
    )
}

export default VideoConference