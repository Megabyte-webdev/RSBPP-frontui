import { Col } from "react-bootstrap"
import userPics from "../../assets/user-icon.png"
import SideBarOptions from "./sidebarComponents/SideBarOptions"
import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"

const SideBar = ({userCredentials}) => {
  const { sideBg } = useContext(ThemeContext)
  const user = userCredentials?.user;
  const role = userCredentials.user?.role;
  console.log(role === "instructor"? "white_sidebar" : "brown_sidebar")
  return (
    <Col style={{ minHeight: "100vh" }} className={'border-end d-none d-md-block'} md={2}>
      <div className={role === "instructor"? "white_sidebar" : "brown_sidebar"}>
        <div className=" py-4">
          <div className="user_details mb-5">
            <div className="d-flex justify-content-center mb-2">
              <img className="img-fluid" src={userPics} alt="" />
            </div>
            <p className="text-center fw-semibold">{user?.first_name} {user?.last_name}</p>
            <p className="text-center fw-light">{user?.role}</p>
            <div className="d-flex justify-content-between py-2">
              <div className="border-end col">
                <p className="text-center"><b>0</b></p>
                <p className="text-center">Courses</p>
              </div>
              <div className=" col">
                <p className="text-center"><b>0</b></p>
                <p className="text-center">Following</p>
              </div>
            </div>
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