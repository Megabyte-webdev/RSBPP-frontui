import { MdOutlineMoreHoriz } from "react-icons/md"
import { Link } from "react-router-dom"
import EnrolledCourse from "../components/courses/EnrolledCourse"
import { useContext, useEffect, useState } from "react"
import { ResourceContext } from "../context/ResourceContext"
import axios from "axios"
import { BASE_URL } from "../components/utils/base"
import { UserContext } from "../context/AuthContext"
import Loading from "../components/loader/Loading"
import { FiSearch } from "react-icons/fi"

const MyCourses = () => {
    const [searchInput, setSearchInput] = useState("")

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
    const filteredSearch = enrollCourses?.filter((user) =>
        user.title.toLowerCase().includes(searchInput.toLowerCase())
    )

    const myClasses = getAllSchedules.data?.filter((schedule) => getEnrolledCourses.data?.some((enrollCourse) => enrollCourse.courseId == schedule.course_id))

    // console.log(typeSearch)
    return (
        <div className='p-3 p-md-5 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, 1)", minHeight: "100vh" }}>
            {getEnrolledCourses.data && (
                <div>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <h3 className="prime_brown bottom_brown py-3">My Courses</h3>
                        </div>
                        <div className="d-flex col-md-5 align-items-center">
                            {/* <Link to="" className="nav-link me-3">View</Link> */}
                            <div className=" mt-4 mt-md-0 position-relative">
                                <input
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text' className='py-1 border w-100 h-100 rounded px-4' />
                                <span className='position-absolute ps-1  top-50 start-0 translate-middle-y'>
                                    <FiSearch />
                                </span>
                            </div>
                            {/* <span className="ms-2">
                                <MdOutlineMoreHoriz size={25} />
                            </span> */}
                        </div>

                    </div>
                    <div className="my-5">
                        <div className="col-md-11">
                            {
                                filteredSearch?.map((course) => (
                                    <EnrolledCourse
                                        key={course.id}
                                        course={course}
                                        myClasses={myClasses} />
                                ))
                            }
                            {enrollCourses < 1 && (<p>Empty course list</p>)}
                        </div>
                    </div>

                </div>
            )}

            {!getEnrolledCourses.data && <Loading />}

        </div>
    )
}

export default MyCourses