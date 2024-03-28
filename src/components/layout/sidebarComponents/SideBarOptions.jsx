import { sidebarConstants } from "../../utils/sidebarConstants"
import icon from "../../../assets/side-icons/activity (1) 1.png"
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
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
      <div className={makeActive}>
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
            <Link to={"/dashboard"} className="nav-link">
              <span>Dashboard Two </span>
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
    </div>
  );
};

export default SideBarOptions;
