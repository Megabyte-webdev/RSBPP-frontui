import React from 'react'
import { Link } from 'react-router-dom'
import { LuLayoutGrid } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import companyLogo from "../../assets/logo.png"
import { BiSolidMessage } from "react-icons/bi";


const NavBar = () => {
    return (
        <div className='border-bottom shadow-sm p-3 px-md-5'>
            <div className="poppins d-flex justify-content-between">
                <div className="col-md-2">
                    <Link to={"/"}>
                        <img src={companyLogo} alt="logo" className="img-fluid" />
                    </Link>
                </div>
                <div className="d-flex align-items-center">
                    <Link to={""} className='nav-link me-3'><BiSolidMessage className='yellow_text' size={20} /></Link>
                    <Link to={""} className='nav-link me-3'><IoIosNotificationsOutline size={20} /></Link>
                    <Link to={""} className='nav-link d-flex justify-content-center align-items-center me-3 yellow_bg fs_xsm' style={{ width: "20px", height: "20px" }}><span>57</span> </Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar