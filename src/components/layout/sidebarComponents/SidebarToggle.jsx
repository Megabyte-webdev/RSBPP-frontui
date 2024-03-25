import React from 'react'
import icon from "../../../assets/side-icons/activity (1) 1.png"
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
const SidebarToggle = ({ handleSubOptionClick, isOpenOption, constant }) => {

const subOption = constant.subOptions
console.log(constant.subOption)
    return (
        <div>
            <div
                onClick={() => handleSubOptionClick(constant.title)}
                className="d-flex align-items-center mb-2 fs_sm justify-content-between pointer"
            >
                <div className="ps-2 d-flex align-items-center">
                    <span className="me-2">
                        <img width={20} height={20} src={constant.logo} alt="" />
                    </span>
                    <span className='text-nowrap fw-semibold'>{constant.title}</span>
                </div>
                <span>
                    {isOpenOption === constant.title ? (
                        <IoChevronUpSharp />
                    ) : (
                        <IoChevronDownSharp />
                    )}
                </span>
            </div>
            {isOpenOption === constant.title && (
                <ul style={{ listStyle: "none"}} className="border-start border_brown ms-4">
                    {
                        subOption?.map((sub, index) => (
                            <li key={index}><Link to={sub.link ? sub.link : ""} className="nav-link">{sub.title}</Link></li>
                        ))
                    }
                </ul>
            )}
        </div>
    )
}

export default SidebarToggle