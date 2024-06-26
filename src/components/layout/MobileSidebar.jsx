import { useContext, useEffect } from "react"
import userPics from "../../assets/user-icon.png"
import SideBarOptions from './sidebarComponents/SideBarOptions'
import { ThemeContext } from "../../context/ThemeContext"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { ResourceContext } from "../../context/ResourceContext"

const MobileSidebar = ({ userCredentials }) => {
    const { getEnrolledCourses, getAllCourses, setGetAllCourses, setGetEnrolledCourses } = useContext(ResourceContext)
    const { sideBg } = useContext(ThemeContext)

    const user = userCredentials?.user;

    useEffect(() => {
        setGetEnrolledCourses((prev) => {
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

    const myCoursesOnly = getAllCourses.data?.filter((course) => course.created_by_id == user.id)

    console.log(myCoursesOnly?.length)

    return (
        <div 
      className={user?.role === "instructor" ? "white_sidebar prime_blue border-end d-md-none" : "brown_sidebar border-end d-md-none"}

        // className="d-md-none"
        >
            <button className=" p-0 border rounded mt-5 ms-2 bg-white position-absolute top-0 start-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <MdChevronRight size={30} />
            </button>

            <div className="offcanvas offcanvas-start inherit_bg inherit_text" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header d-flex justify-content-end">
                    <button type="button" className="border inherit_bg rounded" data-bs-dismiss="offcanvas" aria-label="Close">
                        <MdChevronLeft size={30} />
                    </button>
                </div>
                <div className="offcanvas-body" style={{ scrollbarWidth: "none" }}>
                    <div className="inherit_bg">
                        <div className=" py-4">
                            <div className="user_details mb-5">
                                <div className="d-flex justify-content-center mb-2">
                                    <img className="img-fluid" src={userPics} alt="" />
                                </div>
                                <p className="text-center fw-semibold">{user?.first_name} {user?.last_name}</p>
                                <p className="text-center fw-light">{user?.role}</p>
                                {user?.role === "student" && (
                                    <div className="d-flex justify-content-between py-2">
                                        <div className="border-end col">
                                            <p className="text-center"><b>{getEnrolledCourses?.data?.length}</b></p>
                                            <p className="text-center">Courses</p>
                                        </div>
                                        <div className=" col">
                                            <p className="text-center"><b>0</b></p>
                                            <p className="text-center">Following</p>
                                        </div>
                                    </div>
                                )}
                                {user?.role === "instructor" && (
                                    <div className="d-flex justify-content-between py-2">
                                        <div className="border-end col">
                                            <p className="text-center"><b>{myCoursesOnly?.length}</b></p>
                                            <p className="text-center">Courses</p>
                                        </div>
                                        <div className=" col">
                                            <p className="text-center"><b>0</b></p>
                                            <p className="text-center">Following</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <SideBarOptions />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileSidebar