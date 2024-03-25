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

  return (
    <div className="sidebar_height">
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
