import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import companyLogo from "../../assets/new-logo.png";
import { BiSolidCart, BiSolidMessage } from "react-icons/bi";
import { TfiViewGrid } from 'react-icons/tfi';
import { ResourceContext } from '../../context/ResourceContext';
import { UserContext } from '../../context/AuthContext';
import { cartsTotalFunction } from '../utils/getApi';
import { Col } from 'react-bootstrap';

const NavBar = () => {
    const navigate = useNavigate();
    const {getAllCarts, cartStore, setCartStore } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);
    const [error, setError] = useState('');
    const [currentTotal, setCurrentTotal] = useState('');
    const token = userCredentials?.token;
    const role = userCredentials?.user?.role;

        // Refetch cart data on location change
        useEffect(() => {
            if (userCredentials) {
                cartsTotalFunction(token, userCredentials.user.id, setError, setCurrentTotal, (newCart) => {
                    setCartStore(newCart);
                });
            }
        }, [getAllCarts]);

    console.count("render");

    return (
        <Col className='border-bottom shadow-sm p-3 px-md-5'>
            <div className="poppins d-flex justify-content-between align-items-center">
                <div className="col-md-2 ms-4 ms-md-0 col-6">
                    <Link to={"/"}>
                        <img src={companyLogo} alt="logo" className="img-fluid" />
                    </Link>
                </div>
                <div className="d-none d-md-block col-md-8">
                    <form className='open_sans' style={{ color: "hsla(242, 97%, 15%, .6)" }}>
                        <div className="d-flex">
                            <div className='position-relative text-black w-100 me-4'>
                                <input style={{ backgroundColor: "hsla(0, 0%, 95%, 1)" }} type="text" className="btn border text-start px-5 py-2 w-100" placeholder='Category' />
                                <span className="position-absolute start-0 top-0 p-2"><TfiViewGrid /></span>
                                <span className="position-absolute end-0 top-0 p-2"><FiSearch /></span>
                            </div>
                            <button
                                onClick={() => navigate("/")}
                                type='button'
                                className='btn text-nowrap brown_bg text-white rounded-0'>Go to Dashboard</button>
                        </div>
                    </form>
                </div>
                <div className="d-flex align-items-center">
                    <Link to={""} className='nav-link me-3'><BiSolidMessage className='yellow_text' size={20} /></Link>
                    <Link to={""} className='nav-link me-3'><IoIosNotificationsOutline size={20} /></Link>
                    {role === "student" && (
                        <div>
                            <Link to={"/carts"} className='nav-link'>
                                <div className='d-flex justify-content-center align-items-center me-3 text-white rounded-circle brown_bg fs_xsm'
                                    style={{ width: "20px", height: "20px" }}>
                                    <span>{cartStore?.data?.length || 0}</span>
                                </div>
                                <span><BiSolidCart size={25} /></span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Col>
    );
};

export default NavBar;