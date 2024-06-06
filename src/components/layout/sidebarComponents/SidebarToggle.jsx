import React from 'react'
import icon from "../../../assets/side-icons/activity (1) 1.png"
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const SidebarToggle = ({ handleSubOptionClick, isOpenOption, constant }) => {

    const subOption = constant.subOptions;
    const makeActive = isOpenOption === constant.title ? "sidebar_active" : "";

    const navigate = useNavigate();
    return (
        <div>
            <div className={makeActive}>
                <div
                    onClick={() => handleSubOptionClick(constant.title)}
                    className="d-flex align-items-center mb-2 px-3 py-2 fs_sm justify-content-between pointer"
                >
                    <div className="ps-2 d-flex align-items-center text-nowrap fw-semibold">
                        <span className="me-2 brown_bg rounded sidebar_icon">
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
                        <ul style={{ listStyle: "none" }} className="border-start border-white ms-4">
                            {
                                subOption?.map((sub, index) => (
                                    <li className='pointer'
                                    data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
                                     key={index}><p onClick={()=> navigate(sub.link)} className="nav-link">{sub.title}</p></li>
                                ))
                            }
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}

export default SidebarToggle