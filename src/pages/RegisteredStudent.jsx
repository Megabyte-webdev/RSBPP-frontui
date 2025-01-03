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
import AllStudents from '../components/stats/AllStudents';
import AllCategory from '../components/stats/AllCategory';
import {useLocation} from 'react-router-dom'
const RegisteredStudent = () => {
    const location=useLocation();

    const { getAllFaculty,
        setGetAllFaculty,
        getAllUsers,
        getAllCourses,
        getAllCategory,
        setGetAllCourses,
        setGetAllUsers,
        setGetAllCategory } = useContext(ResourceContext)

    const {userCredentials} = useContext(UserContext)
    const [show, setShow] = useState()

    useEffect(() => {
        console.log(location.state?.id)
       if(location.state?.id){
        setShow(location.state?.id)
       }else{
        setShow("users")
       }
    }, [location.state?.id])
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
        setGetAllCategory((prev) => {
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

    const studentsOnly = getAllUsers.data?.filter((student) => student.role === "student");

console.log(getAllCategory)
    return (
        <div
            className="p-3 p-md-5"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
        >
            <div className="p-3 bg-white rounded-3 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    <div className='mb-3'>
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
                    </div>
                    <div className='mb-3'>
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
                                    <p className="fs_sm ash_text">Students</p>
                                    <h4>{studentsOnly?.length}</h4>
                                    <p className='fs_xsm prime_brown'>
                                        <span> <FaArrowUpLong /> </span>
                                        <span>16%</span>
                                        <span className='ash_text ms-2'>This month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <div className={show === "category" ? "registra_nav" : ""}>
                            <div
                                onClick={() => setShow("category")}
                                className="border-end p-1 pointer d-flex">
                                <div className="student_stats_icon">
                                    <span>
                                        <GrMonitor size={30} />
                                    </span>
                                </div>
                                <div className="ms-2">
                                    <p className="fs_sm ash_text">Category</p>
                                    <h4>{getAllCategory.data?.length}</h4>
                                    <p className='fs_xsm prime_brown'>
                                        <span> <FaArrowUpLong /> </span>
                                        <span>16%</span>
                                        <span className='ash_text ms-2'>This month</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3'>
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
                    </div>
                    <div className='mb-3'>
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
                    </div>
                </div>
            </div>
            {show === "users" && (<AllUsers userCredentials={userCredentials} getAllUsers={getAllUsers.data} />)}
            {show === "members" && (<AllStudents getAllUsers={studentsOnly} />)}
            {show === "faculty" && (<AllFaculties userCredentials={userCredentials} getAllFaculty={getAllFaculty.data} />)}
            {show === "courses" && (<AllCourses userCredentials={userCredentials} getAllCourses={getAllCourses.data} />)}
            {show === "category" && (<AllCategory userCredentials={userCredentials} getAllCategory={getAllCategory.data} />)}

        </div>
    )
}

export default RegisteredStudent