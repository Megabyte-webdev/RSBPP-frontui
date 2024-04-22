import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaArrowUpLong } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import { GrMonitor, GrUserExpert } from 'react-icons/gr';
import { HiOutlineUsers } from "react-icons/hi2";
import THead from '../components/general/THead';
import { MdChevronLeft, MdChevronRight, MdEventAvailable } from 'react-icons/md';
import { ResourceContext } from '../context/ResourceContext';

const RegisteredStudent = () => {
    const { getAllFaculty,
        setGetAllFaculty,
        getAllUsers,
        getAllCourses,
        setGetAllCourses,
        setGetAllUsers } = useContext(ResourceContext)


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
    // console.log(getAllFaculty.data?.length)
    console.log(getAllCourses)
    // console.log(getAllUsers.data?.length)
    console.count("render")

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
                        <div className="border-end d-flex">
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
                    </Col>
                    <Col md={3} xs={6} className='mb-3 mb-md-0'>
                        <div className="border-end d-flex">
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
                    </Col>
                    <Col md={3} xs={6} className='mb-3 mb-md-0'>
                        <div className="border-end d-flex">
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
                    </Col>
                    <Col md={3} xs={6} className='mb-3 mb-md-0'>
                        <div className="border-end d-flex">
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
                    </Col>
                </Row>
            </div>
            <div className="p-3 my-5 bg-white rounded-3 shadow-sm">
                <div className="d-md-flex justify-content-between">
                    <div className="mb-3">
                        <h5>All Registered Student</h5>
                        <span className='prime_blue fs_sm'>Active Members</span>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col">
                                <div className='position-relative'>
                                    <input type="text" className="btn border bg-white text-start px-5 py-2 w-100" id="search" placeholder='Search' />
                                    <span className="position-absolute start-0 top-0 p-2"><FiSearch /> </span>
                                </div>
                            </div>
                            <div className="col">
                                <div className='position-relative'>
                                    <input type="text" className="btn border bg-white text-start px-5 py-2 w-100" id="search" placeholder='Search' />
                                    <span className="position-absolute start-0 top-0 p-2"><FiSearch /> </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow_y_50">
                    <div className="mt-4 table-responsive-md">
                        <table className="table  table-hover">
                            <thead>
                                <tr>
                                    <THead name="Name" />
                                    <THead name="Organization" />
                                    <THead name="Position" />
                                    <THead name="Email" />
                                    <THead name="Role" />
                                    <THead name="Status" />
                                </tr>
                            </thead>
                            <tbody>
                                {getAllUsers.data?.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.first_name}</td>
                                            <td>{user.organization}</td>
                                            <td>{user.position}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button className='btn' style={{ border: "1px solid hsla(166, 79%, 42%, 1)", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>Active</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {/* <tr>
                                <td>Jane Cooper</td>
                                <td>Microsoft</td>
                                <td>(225) 555-0118</td>
                                <td>jane@microsoft.com</td>
                                <td>United States</td>
                                <td>
                                    <button className='btn' style={{ border: "1px solid hsla(0, 97%, 44%, 1))", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>Active</button>
                                </td>
                            </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-5 ash_text d-md-flex justify-content-between">
                    <div>
                        <p>Showing data 1 to 8 of  256K entries</p>
                    </div>
                    <div className='d-flex my-4'>
                        <button className='border-0 rounded ms-2'> <MdChevronLeft /></button>
                        <button className='border-0 rounded ms-2'> 1</button>
                        <button className='border-0 rounded ms-2'> 2</button>
                        <button className='border-0 rounded ms-2'> ...</button>
                        <button className='border-0 rounded ms-2'> 40</button>
                        <button className='border-0 rounded ms-2'> <MdChevronRight /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisteredStudent