import React, { useEffect, useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FiSearch } from 'react-icons/fi'
import LearningCourse from '../components/Learning/LearningCourse'
import CourseCarousel from '../components/general/CourseCarousel'
import { ResourceContext } from '../context/ResourceContext'
import { UserContext } from '../context/AuthContext'
import Loading from '../components/loader/Loading'

const InstructorCourses = () => {
    const { userCredentials, } = useContext(UserContext);
    const [filterCourse, setFilterCourse] = useState("Faculty")

    const [searchInput, setSearchInput] = useState("");
    const { getAllFaculty,
        setGetAllFaculty,
        getAllInstructors,
        setGetAllInstructors,
        getAllCourses,
        setGetAllCourses,
        setGetAllUsers,
        getAllCarts, } = useContext(ResourceContext)

    const userId = userCredentials.user?.id

    const setCoursesFunc = (item) => setFilterCourse(item)

    useEffect(() => {
        setGetAllUsers((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetAllInstructors((prev) => {
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
    const typeSearch = getAllCourses.data?.filter((user) =>
        user.title?.toLowerCase().includes(searchInput.toLowerCase())
    )
    const offLineCourse = typeSearch?.filter((course) => course.course_type === "offline" && course.created_by_id == userId)
    const onLineCourse = typeSearch?.filter((course) => course.course_type === "online" && course.created_by_id == userId)

    // const listUsers = getAllCourses.data?.map((course) => {
    //     return (
    //         <LearningCourse key={course.id} userCredentials={userCredentials} course={course} />
    //     )
    // })
    return (
        <div className='p-3 p-md-5 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>
            <h3>All Courses Created by You</h3>
            {/* <p className="">On this page, you will be able to find all your learning paths along with the other learning paths available on the platform</p> */}
            <div className="my-3">
                <p className="fw-bold mb-2">Onsite</p>
                <div className="d-md-flex">
                    {/* <div className="row col-md-7">
                        <div className="col">
                            <div className="dropdown">
                                <button className="btn border-black border w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {filterCourse}
                                </button>
                                <ul className="dropdown-menu px-2">
                                    <li
                                    onClick={()=> setCoursesFunc("one")}
                                     className='pointer'>One</li>
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
                    </div> */}
                    <div className="col-md-6 mt-4 mt-md-0 position-relative">
                        <input
                            onChange={(e) => setSearchInput(e.target.value)}
                            type='text' className='py-1 border w-100 rounded px-4' />
                        <span className='position-absolute ps-1  top-50 start-0 translate-middle-y'>
                            <FiSearch />
                        </span>
                    </div>
                </div>
                <div>
                    <div className="my-5">
                        {!getAllCourses.data && (
                            <Loading />
                        )}
                        {getAllCourses.data && (
                            <CourseCarousel>
                                {onLineCourse?.map((course) => {
                                    return (
                                        <LearningCourse
                                            getAllInstructors={getAllInstructors.data}
                                            key={course.id}
                                            cartList={getAllCarts.data}
                                            userCredentials={userCredentials}
                                            course={course} />
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
                                        <LearningCourse
                                            getAllInstructors={getAllInstructors.data}
                                            key={course.id}
                                            cartList={getAllCarts.data}
                                            userCredentials={userCredentials}
                                            course={course} />
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

export default InstructorCourses