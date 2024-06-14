import { MdArrowLeft, MdArrowRight, MdOutlineMoreHoriz } from "react-icons/md"
import { Link } from "react-router-dom"
import enrollIcon from "../../assets/enroll-icon.svg"
import CourseTimeTable from "./CourseTimeTable"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"

const EnrolledCourse = ({ course, getScheduleById }) => {

    const [courseSchedule, setCourseSchedule] = useState()
    const [classDropdown, setClassDropdown] = useState(false)

    useEffect(() => {
        getScheduleById(course.id, setCourseSchedule)
    }, [])

    const handleClassDropdown = () => {
        setClassDropdown((prev) => !prev)
    }
    // console.log(courseSchedule)

    const activeClass = {
        backgroundColor: "#ab3335",
        color: "#fff"
    }

    const NotActiveClass = {
        backgroundColor: "#fff",
        color: "hsla(0, 1%, 41%, 1)"
    }

    const brown = { backgroundColor: "#ab3335" }
    const white = { backgroundColor: "#fff" }

    const date = new Date(courseSchedule?.day)
    // console.log(courseSchedule)
    return (
        <div>
            <div className="mb-3 d-flex">
                <div className="w-100 p-2 py-5  d-flex" style={{ backgroundColor: "hsla(359, 54%, 44%, 0.15)" }}>
                    <div>
                        <img src={enrollIcon} alt="" className="me-2" />
                    </div>
                    <div>
                        <h6>{course.title}</h6>
                        <p>{course.description} </p>
                        {/* <p>Furthermore, it would address the crucial questions along the path towards a financially sustainable venture. Participants who successfully complete the course would be well positioned for entrepreneurship competencies now and real capital acquisition in the future</p> */}
                    </div>
                </div>
                <div
                    onClick={() => handleClassDropdown()}
                    className="brown_bg p-1 text-white pointer d-flex align-items-center">{classDropdown ? <span><MdArrowLeft size={25} /></span> : <span><MdArrowRight size={25} /></span>}</div>
            </div>
            {classDropdown && (<div className=" my-5">
                <button className="btn light_brown rounded-pill px-4 fw-bold mb-4 prime_brown">Class Schedules</button>
                {/* {!courseSchedule && (
                    <p className="text-center"> <Spinner/> </p>
                )} */}
                {/* {courseSchedule && (
                    <p><b>{date.toDateString()}</b></p>
                )} */}
                <div className="my-4">
                    <div className="row">
                        {courseSchedule?.map((schedule) => (
                            <div key={schedule.id} className="col-md-6 col mb-3">
                                <CourseTimeTable schedule={schedule} course={course} themeProp={activeClass} themeColor={white} />
                            </div>
                        ))}
                        {/* <div className="col-md-6 col mb-3">
                            <CourseTimeTable themeProp={activeClass} themeColor={white} />
                        </div>f
                        <div className="col-md-6 col mb-3">
                            <CourseTimeTable themeProp={NotActiveClass} themeColor={brown} />
                        </div>
                        <div className="col-md-6 col mb-3">
                            <CourseTimeTable  themeProp={NotActiveClass} themeColor={brown}/>
                        </div> */}
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default EnrolledCourse