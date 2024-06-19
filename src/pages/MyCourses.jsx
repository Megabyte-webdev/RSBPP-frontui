import { MdOutlineMoreHoriz } from "react-icons/md"
import { Link } from "react-router-dom"
import EnrolledCourse from "../components/courses/EnrolledCourse"
import { useContext, useEffect, useState } from "react"
import { ResourceContext } from "../context/ResourceContext"
import axios from "axios"
import { BASE_URL } from "../components/utils/base"
import { UserContext } from "../context/AuthContext"
import Loading from "../components/loader/Loading"

const MyCourses = () => {
    const { getAllCourses,
        setGetAllSchedules,
        getAllSchedules,
        setGetAllCourses,
        getEnrolledCourses,
        setGetEnrolledCourses, } = useContext(ResourceContext)
    const { userCredentials } = useContext(UserContext)
    useEffect(() => {
        setGetEnrolledCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetAllSchedules((prev) => {
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
    }, [getEnrolledCourses])
    
    const enrollCourses = getAllCourses.data?.filter(
        (course) => getEnrolledCourses.data?.some((enroll) => enroll.courseId === course.id)
    );
   
    const myClasses = getAllSchedules.data?.filter((schedule) => getEnrolledCourses.data?.some((enrollCourse) => enrollCourse.courseId == schedule.course_id))

    // console.log(enrollCourses)
    return (
        <div className='p-3 p-md-5 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, 1)", minHeight: "100vh" }}>
            {getEnrolledCourses.data && (
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <h3 className="prime_brown bottom_brown py-3">My Courses</h3>
                    </div>
                    <div className="d-flex align-items-center">
                        <Link to="" className="nav-link me-3">View</Link>
                        <div className="dropdown">
                            <button className="btn border-black border w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Type
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                        <span className="ms-2">
                            <MdOutlineMoreHoriz size={25} />
                        </span>
                    </div>

                </div>)}
            <div className="my-5">
                <div className="col-md-11">
                    {
                        enrollCourses?.map((course) => (
                            <EnrolledCourse
                                key={course.id}
                                course={course}
                                myClasses={myClasses} />
                        ))
                    }
                    {enrollCourses < 1 && (<p>Empty course list</p>)}
                </div>
            </div>
            {!getEnrolledCourses.data && <Loading />}

        </div>
    )
}

export default MyCourses