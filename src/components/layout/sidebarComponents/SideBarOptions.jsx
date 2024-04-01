import { sidebarConstants } from "../../utils/sidebarConstants"
import icon from "../../../assets/side-icons/new1.png"
import iconEight from "../../../assets/side-icons/new8.png"
import iconNine from "../../../assets/side-icons/new9.png"
import iconTen from "../../../assets/side-icons/new10.png"
import iconEleven from "../../../assets/side-icons/new11.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import SidebarToggle from "./SidebarToggle";

const SideBarOptions = () => {
  const [isOpenOption, setIsOpenOption] = useState(null); // Track which subOption is open

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
      <div className={""}>
        <div
          onClick={() => handleSubOptionClick(constant.title)}
          className="d-flex align-items-center px-3 py-2 mb-2 fs_sm justify-content-between pointer"
        >
          <div
            onClick={() => setIsOpenOption("Dashboard")}
            className="ps-2 d-flex align-items-center text-nowrap fw-semibold">
            <span className="me-2">
              <img width={20} height={20} src={icon} alt="" />
            </span>
            <Link to={"/"} className="nav-link">
              <span>Home </span>
            </Link>
          </div>
        </div>
      </div>
      {sidebarConstants.map((constant) => (
        <SidebarToggle
          key={constant.title}
          isOpenOption={isOpenOption}
          constant={constant}
          handleSubOptionClick={handleSubOptionClick} />
      ))}
      <div className="border-top my-3 py-3 border-white">
        <div className={""}>
          <div
            onClick={() => handleSubOptionClick(constant.title)}
            className="d-flex align-items-center px-3 py-2 mb-2 fs_sm justify-content-between pointer"
          >
            <div
              onClick={() => setIsOpenOption("class")}
              className="ps-2 d-flex align-items-center text-nowrap fw-semibold">
              <span className="me-2">
                <img width={20} height={20} src={iconEight} alt="" />
              </span>
              <Link to={"/dashboard"} className="nav-link">
                <span>Enter Class Room </span>
              </Link>
            </div>
          </div>
        </div>
        <div className={""}>
          <div
            onClick={() => handleSubOptionClick(constant.title)}
            className="d-flex align-items-center px-3 py-2 mb-2 fs_sm justify-content-between pointer"
          >
            <div
              onClick={() => setIsOpenOption("recommendation")}
              className="ps-2 d-flex align-items-center text-nowrap fw-semibold">
              <span className="me-2">
                <img width={20} height={20} src={iconNine} alt="" />
              </span>
              <Link to={"/dashboard"} className="nav-link">
                <span>Recommendations </span>
              </Link>
            </div>
          </div>
        </div>
        <div className={""}>
          <div
            onClick={() => handleSubOptionClick(constant.title)}
            className="d-flex align-items-center px-3 py-2 mb-2 fs_sm justify-content-between pointer"
          >
            <div
              onClick={() => setIsOpenOption("test")}
              className="ps-2 d-flex align-items-center text-nowrap fw-semibold">
              <span className="me-2">
                <img width={20} height={20} src={iconTen} alt="" />
              </span>
              <Link to={"/dashboard"} className="nav-link">
                <span>Test Management </span>
              </Link>
            </div>
          </div>
        </div>
        <div className={makeActive}>
          <div
            onClick={() => handleSubOptionClick(constant.title)}
            className="d-flex align-items-center px-3 py-2 mb-2 fs_sm justify-content-between pointer"
          >
            <div
              onClick={() => setIsOpenOption("register")}
              className="ps-2 d-flex align-items-center text-nowrap fw-semibold">
              <span className="me-2">
                <img width={20} height={20} src={iconEleven} alt="" />
              </span>
              <Link to={"/dashboard"} className="nav-link">
                <span>Register New Course</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarOptions;
