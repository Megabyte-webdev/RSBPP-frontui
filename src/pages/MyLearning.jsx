import React, { useEffect, useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FiSearch } from 'react-icons/fi'
import LearningCourse from '../components/Learning/LearningCourse'
import CourseCarousel from '../components/general/CourseCarousel'
import { ResourceContext } from '../context/ResourceContext'
import { UserContext } from '../context/AuthContext'

const MyLearning = () => {
    const { userCredentials } = useContext(UserContext);

    const { getAllFaculty,
        setGetAllFaculty,
        getAllCourses,
        setGetAllCourses,
        setGetAllUsers,
        getAllCarts, } = useContext(ResourceContext)

    useEffect(() => {
        setGetAllUsers((prev) => {
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
    const offLineCourse = getAllCourses.data?.filter((course) => course.course_type === "offline")
    const onLineCourse = getAllCourses.data?.filter((course) => course.course_type === "online")

    // const listUsers = getAllCourses.data?.map((course) => {
    //     return (
    //         <LearningCourse key={course.id} userCredentials={userCredentials} course={course} />
    //     )
    // })

    return (
        <div className='p-3 p-md-5 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>
            <h3>My Learning Paths</h3>
            <p className="">On this page, you will be able to find all your learning paths along with the other learning paths available on the platform</p>
            <div className="my-3">
                <p className="fw-bold mb-2">Onsite</p>
                <div className="d-md-flex">
                    <div className="row col-md-7">
                        <div className="col">
                            <div className="dropdown">
                                <button className="btn border-black border w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Faculty
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="dropdown">
                                <button className="btn border-black border w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Duration
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="dropdown">
                                <button className="btn border-black border w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Get Brochure
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-4 mt-4 mt-md-0 position-relative">
                        <input type='text' className='py-1 border h-100 rounded px-4' />
                        <span className='position-absolute ps-1  top-50 start-0 translate-middle-y'>
                            <FiSearch />
                        </span>
                    </div>
                </div>
                <div>
                    <div className="my-5">
                        {!getAllCourses.data && (
                            <div style={{ height: "80vh", padding: "3rem" }}> Loading data......</div>
                        )}
                        {getAllCourses.data && (
                            <CourseCarousel>
                                {onLineCourse?.map((course) => {
                                    return (
                                        <LearningCourse key={course.id} cartList={getAllCarts.data} userCredentials={userCredentials} course={course} />
                                    )
                                })}
                            </CourseCarousel>
                        )}
                    </div>
                </div>
                <div className='my-5'>
                    <p className="fw-bold">Offline Course</p>
                    <div className="my-5">
                        {getAllCourses.data && (
                            <CourseCarousel>
                                {offLineCourse?.map((course) => {
                                    return (
                                        <LearningCourse key={course.id} cartList={getAllCarts.data} userCredentials={userCredentials} course={course} />
                                    )
                                })}
                            </CourseCarousel>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyLearning