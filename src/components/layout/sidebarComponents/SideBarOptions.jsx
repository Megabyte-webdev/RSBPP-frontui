import { adminConstants, facultyConstants, sidebarConstants } from "../../utils/sidebarConstants"
import icon from "../../../assets/side-icons/new1.png"
import iconEight from "../../../assets/side-icons/new8.png"
import iconNine from "../../../assets/side-icons/icon9.png"
import iconTen from "../../../assets/side-icons/new10.png"
import iconEleven from "../../../assets/side-icons/new11.png"
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import SidebarToggle from "./SidebarToggle";
import { UserContext } from "../../../context/AuthContext"
import toast from "react-hot-toast"
import { FaLongArrowAltRight } from "react-icons/fa";

const SideBarOptions = ({ handleClose }) => {
  const [isOpenOption, setIsOpenOption] = useState(null); // Track which subOption is open
  const { userCredentials, setUserCredentials } = useContext(UserContext);
  const role = userCredentials.user.role.toLowerCase()
  // console.log(role)
  const admin = role === "admin"
  const student = role === "student"
  const instructor = role === "instructor"
  const studentOrInstructor = role === "student" || role === "instructor"
  // console.log(adminOrInstructor)

  function Logout() {
    localStorage.removeItem("userDetails")
    setUserCredentials(null)
    toast.success("logout successful");

  }
  const handleSubOptionClick = (clickedOptionTitle) => {
    setIsOpenOption((prevIsOpenOption) => {
      if (prevIsOpenOption === clickedOptionTitle) {
        return null; // Close the currently open subOption
      } else {
        return clickedOptionTitle; // Open the clicked subOption
      }
    });
  };
  const makeActive = isOpenOption === "Dashboard" ? "sidebar_active" : "";

  return (
    <div className="sidebar_height">
      <div className={makeActive}>
        <div
          className="d-flex align-items-center px-3 py-2 mb-2 fs_sm justify-content-between pointer"
        >
          <div
            onClick={() => {
              setIsOpenOption("Dashboard")
              if (handleClose){
                handleClose();
              }
            }}
            className="ps-2 d-flex align-items-center hover_effect text-nowrap fw-semibold">
            <span className={instructor ? "me-2 blue_bg rounded" : "me-2 sidebar_icon rounded"}>
              <img width={20} height={20} src={icon} alt="" />
            </span>
            <Link to={"/"} className="nav-link">
              <span>Home </span>
            </Link>
          </div>
        </div>
      </div>

      <div className={makeActive}>
        <div
          className="d-flex align-items-center px-3 py-2 mb-2 fs_sm justify-content-between pointer"
        >
          <div
            onClick={() => {
              setIsOpenOption("Dashboard")
              if (handleClose){
                handleClose();
              }
            }}
            className="ps-2 d-flex align-items-center hover_effect text-nowrap fw-semibold">
            <span className={instructor ? "me-2 blue_bg rounded" : "me-2 sidebar_icon rounded"}>
              <img width={20} height={20} src={icon} alt="" />
            </span>
            <Link to={"/"} className="nav-link">
              <span>Journals </span>
            </Link>
          </div>
        </div>
      </div>
      {student && sidebarConstants.map((constant) => (
        <SidebarToggle
          handleClose={handleClose}
          key={constant.title}
          instructor={instructor}
          isOpenOption={isOpenOption}
          constant={constant}
          handleSubOptionClick={handleSubOptionClick} />
      ))}
      {instructor && facultyConstants.map((constant) => (
        <SidebarToggle
          handleClose={handleClose}
          key={constant.title}
          instructor={instructor}
          isOpenOption={isOpenOption}
          constant={constant}
          handleSubOptionClick={handleSubOptionClick} />
      ))}
      {role === "admin" && adminConstants.map((constant) => (
        <SidebarToggle
          handleClose={handleClose}
          key={constant.title}
          instructor={instructor}
          isOpenOption={isOpenOption}
          constant={constant}
          handleSubOptionClick={handleSubOptionClick} />
      ))}
      <div className="border-top my-3 py-3 border-white">
      
         <div className={""}>
          <div
            onClick={() => {
              if (handleClose) {
                handleClose();
              }
              Logout()
            }}
            className="d-flex align-items-center hover_effect px-3 py-2 mb-2 fs_sm justify-content-between pointer"
          >
            <div
              className="ps-2 d-flex align-items-center text-nowrap fw-semibold">
              <span className="me-2">
                <img width={20} height={20} src={iconNine} alt="" />
              </span>
              {/* <Link to={"/dashboard"} className="nav-link"> */}
              <span>Log Out</span>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarOptions;
