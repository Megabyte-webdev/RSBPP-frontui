import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuLayoutGrid } from "react-icons/lu";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import companyLogo from "../../assets/logo.png"
import { BiSolidMessage } from "react-icons/bi";
import { TfiViewGrid } from 'react-icons/tfi';
import { ThemeContext } from '../../context/ThemeContext';


const NavBar = () => {
const navigate = useNavigate()
    const {searchField}= useContext(ThemeContext)
    return (
        <div className='border-bottom shadow-sm p-3 px-md-5'>
            <div className="poppins d-flex justify-content-between align-items-center">
                <div className="col-md-2">
                    <Link to={"/"}>
                        <img src={companyLogo} alt="logo" className="img-fluid" />
                    </Link>
                </div>
                {searchField && (
                <div className="col-md-8">
                    <form className='open_sans' style={{ color: "hsla(242, 97%, 15%, .6)" }}>
                        <div className="d-flex">
                            <div className='position-relative text-black w-100 me-4'>
                                <input style={{ backgroundColor: "hsla(0, 0%, 95%, 1)" }} type="text" className="btn border text-start px-5 py-2 w-100" placeholder='Category' />
                                <span className="position-absolute start-0 top-0 p-2"><TfiViewGrid /> </span>
                                <span className="position-absolute end-0 top-0 p-2"><FiSearch /> </span>
                            </div>
                            <button
                            onClick={()=> navigate("/")}
                            type='button'
                             className='btn text-nowrap brown_bg text-white rounded-0'>Got to Dashboard</button>
                        </div>
                    </form>
                </div>)}
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