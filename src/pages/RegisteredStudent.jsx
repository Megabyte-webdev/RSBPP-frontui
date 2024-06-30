import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaArrowUpLong } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import { GrMonitor, GrUserExpert } from 'react-icons/gr';
import { HiOutlineUsers } from "react-icons/hi2";
import THead from '../components/general/THead';
import { MdChevronLeft, MdChevronRight, MdEventAvailable } from 'react-icons/md';
import { ResourceContext } from '../context/ResourceContext';
import AllUsers from '../components/stats/AllUsers';
import AllFaculties from '../components/stats/AllFaculties';
import AllCourses from '../components/stats/AllCourses';
import { UserContext } from '../context/AuthContext';

const RegisteredStudent = () => {
    const { getAllFaculty,
        setGetAllFaculty,
        getAllUsers,
        getAllCourses,
        setGetAllCourses,
        setGetAllUsers } = useContext(ResourceContext)

    const {userCredentials} = useContext(UserContext)
    const [show, setShow] = useState("users")

    useEffect(() => {
        setGetAllUsers((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetAllFaculty((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetAllFaculty((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    return (
        <div
            className="p-3 p-md-5"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
        >
            <div className="p-3 bg-white rounded-3 shadow-sm">
                <Row>
                    <Col md={3} xs={6} className='mb-3 mb-md-0'>
                        <div className={show === "users" ? "registra_nav" : ""}>
                            <div
                                onClick={() => setShow("users")}
                                className="border-end p-1 pointer d-flex">
                                <div className="student_stats_icon">
                                    <span>
                                        <HiOutlineUsers size={30} />
                                    </span>
                                </div>
                                <div className="ms-2">
                                    <p className="fs_sm ash_text">Total Users</p>
                                    <h4>{getAllUsers.data?.length}</h4>
                                    <p className='fs_xsm prime_brown'>
                                        <span> <FaArrowUpLong /> </span>
                                        <span>16%</span>
                                        <span className='ash_text ms-2'>This month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={3} xs={6} className='mb-3 mb-md-0'>
                        <div className={show === "members" ? "registra_nav" : ""}>
                            <div
                                onClick={() => setShow("members")}
                                className="border-end p-1 pointer d-flex">
                                <div className="student_stats_icon">
                                    <span>
                                        <GrUserExpert size={30} />
                                    </span>
                                </div>
                                <div className="ms-2">
                                    <p className="fs_sm ash_text">Member</p>
                                    <h4>5,423</h4>
                                    <p className='fs_xsm prime_brown'>
                                        <span> <FaArrowUpLong /> </span>
                                        <span>16%</span>
                                        <span className='ash_text ms-2'>This month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={3} xs={6} className='mb-3 mb-md-0'>
                        <div className={show === "faculty" ? "registra_nav" : ""}>
                            <div
                                onClick={() => setShow("faculty")}
                                className="border-end p-1 pointer d-flex">
                                <div className="student_stats_icon">
                                    <span>
                                        <GrMonitor size={30} />
                                    </span>
                                </div>
                                <div className="ms-2">
                                    <p className="fs_sm ash_text">Faculties</p>
                                    <h4>{getAllFaculty.data?.length}</h4>
                                    <p className='fs_xsm prime_brown'>
                                        <span> <FaArrowUpLong /> </span>
                                        <span>16%</span>
                                        <span className='ash_text ms-2'>This month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={3} xs={6} className='mb-3 mb-md-0'>
                        <div className={show === "courses" ? "registra_nav" : ""}>
                            <div
                                onClick={() => setShow("courses")}
                                className="border-end p-1 pointer d-flex">
                                <div className="student_stats_icon">
                                    <span>
                                        <MdEventAvailable size={30} />
                                    </span>
                                </div>
                                <div className="ms-2">
                                    <p className="fs_sm ash_text">Courses</p>
                                    <h4>{getAllCourses.data?.length}</h4>
                                    <p className='fs_xsm prime_brown'>
                                        <span> <FaArrowUpLong /> </span>
                                        <span>16%</span>
                                        <span className='ash_text ms-2'>This month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            {show === "users" && (<AllUsers userCredentials={userCredentials} getAllUsers={getAllUsers.data} />)}
            {show === "members" && (<AllUsers getAllUsers={getAllUsers.data} />)}
            {show === "faculty" && (<AllFaculties userCredentials={userCredentials} getAllFaculty={getAllFaculty.data} />)}
            {show === "courses" && (<AllCourses getAllCourses={getAllCourses.data} />)}

        </div>
    )
}

export default RegisteredStudent