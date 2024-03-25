import React from 'react'
import { Link } from 'react-router-dom'
import { LuLayoutGrid } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import companyLogo from "../../assets/logo.png"


const NavBar = () => {
    return (
        <div className='border-bottom shadow-sm px-3 pt-3 pb-3'>
            <div className="row poppins">
                <div className="col-md-2">
<img src={companyLogo} alt="logo" className="img-fluid" />
                </div>
                <div className="col-md-10">
                    <div className="d-flex align-items-center">
                        <button className='btn rounded-4 d-flex ash_btn me-3'><span className='me-2'><LuLayoutGrid /></span> <span>Categories</span></button>
                        <div className="w-100 d-flex justify-content-between">
                            <div className="d-flex">
                                <Link to={""} className='nav-link me-3'>Home</Link>
                                <Link to={""} className='nav-link me-3'>Course</Link>
                                <Link to={""} className='nav-link me-3'>Instructors</Link>
                                <Link to={""} className='nav-link me-3'>Store</Link>
                                <Link to={""} className='nav-link me-3'>Forums</Link>
                            </div>
                            <div className="d-flex">
                                <Link to={""} className='nav-link me-3'><FiShoppingCart size={20} /></Link>
                                <Link to={""} className='nav-link me-3'><IoIosNotificationsOutline size={20} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar