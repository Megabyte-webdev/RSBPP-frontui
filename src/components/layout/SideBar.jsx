import { Col } from "react-bootstrap"
import userPics from "../../assets/user-icon.png"
import SideBarOptions from "./sidebarComponents/SideBarOptions"
import { useContext, useEffect } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { ResourceContext } from "../../context/ResourceContext"

const SideBar = ({ userCredentials }) => {
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

  // console.log(role === "instructor" ? "white_sidebar" : "brown_sidebar")
  return (
    <Col style={{ minHeight: "100vh" }}
      className={user?.role === "instructor" ? "white_sidebar prime_blue border-end d-none d-md-block" : "brown_sidebar border-end d-none d-md-block"}
      md={2}>
      <div
      // className={role === "instructor" ? "white_sidebar border-end d-none d-md-block" : "brown_sidebar border-end d-none d-md-block"}
      >
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
    </Col>
  )
}

export default SideBar