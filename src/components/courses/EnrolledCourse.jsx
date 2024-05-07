import { MdArrowRight, MdOutlineMoreHoriz } from "react-icons/md"
import { Link } from "react-router-dom"
import enrollIcon from "../../assets/enroll-icon.svg"
import CourseTimeTable from "./CourseTimeTable"

const EnrolledCourse = () => {

    const activeClass = {
        backgroundColor: "#ab3335",
        color: "#fff"
    }

    const NotActiveClass = {
        backgroundColor: "#fff",
        color: "hsla(0, 1%, 41%, 1)"
    }

    const brown = {backgroundColor : "#ab3335"}
    const white = {backgroundColor : "#fff"}
    return (
        <div>
            <div className=" d-flex">
                <div className="w-100 p-2 py-5  d-flex" style={{ backgroundColor: "hsla(359, 54%, 44%, 0.15)" }}>
                    <div>
                        <img src={enrollIcon} alt="" className="me-2" />
                    </div>
                    <div>
                        <h6>Understanding and Managing Global Business</h6>
                        <p>The course aims to equip participants with a broad understanding of the breadth and scope of international business and a solid foundation upon which to advance their careers and interests. This course prepares founders with the skills necessary to launch new ventures, critical to raising capital and funding start-ups.The course aims to equip participants with a broad understanding of the breadth and scope of </p>
                        <p>Furthermore, it would address the crucial questions along the path towards a financially sustainable venture. Participants who successfully complete the course would be well positioned for entrepreneurship competencies now and real capital acquisition in the future</p>
                    </div>
                </div>
                <div className="brown_bg p-1 text-white d-flex align-items-center"><span><MdArrowRight size={25} /></span></div>
            </div>
            <div className=" my-5">
                <button className="btn light_brown rounded-pill px-4 fw-bold mb-4 prime_brown">Class Schedules</button>
                <p><b>Dec 31</b> Wednesday</p>
                <div className="my-4">
                    <div className="row">
                        <div className="col-md-6 col mb-3">
                            <CourseTimeTable themeProp={activeClass} themeColor={white} />
                        </div>
                        <div className="col-md-6 col mb-3">
                            <CourseTimeTable themeProp={activeClass} themeColor={white} />
                        </div>
                        <div className="col-md-6 col mb-3">
                            <CourseTimeTable themeProp={NotActiveClass} themeColor={brown} />
                        </div>
                        <div className="col-md-6 col mb-3">
                            <CourseTimeTable  themeProp={NotActiveClass} themeColor={brown}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnrolledCourse