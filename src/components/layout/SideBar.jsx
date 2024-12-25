import { Col } from "react-bootstrap"
// import userPics from "../../assets/user-icon.png"
import SideBarOptions from "./sidebarComponents/SideBarOptions"
import { useContext, useEffect } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { ResourceContext } from "../../context/ResourceContext"
// import NewModal from "../general/NewModal"
import { BASE_URL, IMAGE_URL } from "../utils/base"

const SideBar = ({ userCredentials }) => {
  const { getEnrolledCourses,
    getAllInstructorsSchedules,
    setGetAllInstructorsSchedules,
    getAllCourses,
    setGetAllCourses,
    setGetEnrolledCourses
  } = useContext(ResourceContext)
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

  const userPics = `${IMAGE_URL}profile/${user.image}`;

  useEffect(() => {
    setGetAllInstructorsSchedules((prev) => {
      return {
        ...prev, isDataNeeded: true
      }
    })
  }, [])

  const myCoursesOnly = getAllCourses.data?.filter((course) => course.created_by_id == user.id)

  return (
    <div style={{"minWidth":"200px" }}
      className={user?.role === "instructor" ? "white_sidebar prime_blue border-end d-none d-md-block" : "brown_sidebar border-end d-none d-md-block h-full overflow-y-auto"}>
      <div
      // className={role === "instructor" ? "white_sidebar border-end d-none d-md-block" : "brown_sidebar border-end d-none d-md-block"}
      >
        <div className="py-4">
          <div className="user_details mb-5">
            <div className="d-flex justify-content-center mb-2">
              {user.image ? (
                <img className="border-4 rounded-circle w-28 h-28 object-fit" src={userPics} alt="profile" />
              ) : (
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 32 32"><path fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5" /><path fill="currentColor" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.9 13.9 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3q.418.457.87.87q.14.124.28.242q.48.415.99.782c.044.03.084.069.128.1v-.012a13.9 13.9 0 0 0 16 0v.012c.044-.031.083-.07.128-.1q.51-.368.99-.782q.14-.119.28-.242q.451-.413.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0" /></svg>
                </span>)
              }
            </div>
            <p className="text-center fw-semibold">{user?.first_name} {user?.last_name}</p>
            <p className="text-center fw-light">{user?.role}</p>
            {/* <NewModal /> */}
            {user?.role === "student" && (
              <div className="flex flex-wrap justify-between py-2">
                <div className="border-end col">
                  <p className="text-center"><b>{getEnrolledCourses?.data?.length || 0}</b></p>
                  <p className="text-center">Courses</p>
                </div>
                <div className=" col">
                  <p className="text-center"><b>0</b></p>
                  <p className="text-center">Following</p>
                </div>
              </div>
            )}
            {user?.role === "instructor" && (
              <div className="flex flex-wrap justify-between py-2">
                <div className="border-end col">
                  <p className="text-center"><b>{myCoursesOnly?.length}</b></p>
                  <p className="text-center">Courses</p>
                </div>
                <div className=" col">
                  <p className="text-center"><b>{getAllInstructorsSchedules.data?.length}</b></p>
                  <p className="text-center">Schedules(s)</p>
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
  )
}

export default SideBar