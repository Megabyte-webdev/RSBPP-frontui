import React from 'react'
import icon from "../../../assets/side-icons/activity (1) 1.png"
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import { Link, } from "react-router-dom";
import { useState } from "react";
import HoverList from '../../general/HoverList';

const SidebarToggle = ({ handleSubOptionClick, isOpenOption, handleClose, constant, instructor }) => {

    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
        if (handleClose){
            handleClose();
        }
    };


    const subOption = constant.subOptions;
    const makeActive = isOpenOption === constant.title ? "sidebar_active" : "";

    return (
        <div>
            <div className={makeActive}>
                <div
                    onClick={() => handleSubOptionClick(constant.title)}
                    className="d-flex align-items-center hover_effect mb-2 sm:px-[4px] px-3 sm:py-[5px] py-2 fs_sm justify-content-between pointer"
                >
                    <div className="ps-2 d-flex align-items-center text-nowrap fw-semibold">
                        <span className={`me-2  rounded ${instructor ? "blue_bg" : "sidebar_icon"}`}>
                            <img width={20} height={20} src={constant.logo} alt="" />
                        </span>
                        <Link to={constant.link} className='nav-link'>
                            <span>{constant.title} </span>
                        </Link>
                    </div>
                    {subOption === null ? null : (
                        <span>
                            {isOpenOption === constant.title ? (
                                <IoChevronUpSharp />
                            ) : (
                                <IoChevronDownSharp />
                            )}
                        </span>
                    )}
                </div>
            </div>
            {subOption === null ? null : (
                <div>
                    {isOpenOption === constant.title && (
                        <ul style={{ listStyle: "none" }} className={`border-start ps-0 ms-4 ${instructor ? "border_blue" : "border-white"} `}>
                    {
                        subOption?.map((sub, index) => (
                            <HoverList
                                handleClose={handleClose}
                                clickedIndex={clickedIndex}
                                handleClick={handleClick}
                                key={index}
                                sub={sub} />
                        ))
                    }
                </ul>
            )}
        </div>
    )
}
        </div >
    )
}

export default SidebarToggle