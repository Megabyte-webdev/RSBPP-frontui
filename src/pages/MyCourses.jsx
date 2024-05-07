import { MdOutlineMoreHoriz } from "react-icons/md"
import { Link } from "react-router-dom"
import EnrolledCourse from "../components/courses/EnrolledCourse"

const MyCourses = () => {
    return (
        <div className='p-3 p-md-5 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, 1)" }}>
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

            </div>
            <div className="my-5">
                <div className="col-md-11">
                    <EnrolledCourse />
                    <EnrolledCourse />
                </div>
            </div>
        </div>
    )
}

export default MyCourses