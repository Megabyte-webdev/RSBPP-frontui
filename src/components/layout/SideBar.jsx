import { Col } from "react-bootstrap"
import userPics from "../../assets/user-icon.png"
import SideBarOptions from "./sidebarComponents/SideBarOptions"
import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"

const SideBar = () => {
  const { sideBg } = useContext(ThemeContext)
  return (
    <Col style={{ height: "100vh" }} className={'border-end'} md={2}>
      <div className={sideBg}>
        <div className=" py-3">
          <div className="user_details mb-5">
            <div className="d-flex justify-content-center mb-2">
              <img className="img-fluid" src={userPics} alt="" />
            </div>
            <p className="text-center fw-semibold">Cameron Schofield</p>
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