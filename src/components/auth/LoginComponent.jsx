import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import logo from "../../assets/logo.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLock, FiUser } from "react-icons/fi";
import { TfiLock } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import OtpForm from './OtpForm';

const LoginComponent = () => {
    const [inputType, setInputType] = useState("password")
    const [otpPage, setOtpPage] = useState(false)

    const handleToggle = () => {
        if (inputType === 'password') {
            setInputType('text');
            //   setIcon(faEye);
        } else {
            setInputType('password');
            //   setIcon(faEyeSlash);
        }
    };

    const handleLogin = () => {
        setOtpPage(true)
    }
    return (
        <Row className='d-flex justify-content-center pt-5'>
            <Col md={7}>
                <div className="shadow-sm bg-white rounded-3 px-3 py-4">
                    <div className="mb-3 d-flex justify-content-center">
                        <div>
                            <img src={logo} alt="logo" className="img-fluid" />
                        </div>
                    </div>
                    {!otpPage ? (
                        <div className=' h-100 d-flex align-items-center'>
                            <div className='px-3 w-100'>
                                <h3 className="prime_blue mb-4">Login to your account!</h3>
                                <div>
                                    <form className='open_sans mb-3 ' style={{ color: "hsla(242, 97%, 15%, .6)" }}>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="form-label login_label" >Email address</label>
                                            <div className='position-relative'>
                                                <input type="email" className="btn border px-4 py-2 w-100" id="email" placeholder='Youraddres@email.com' />
                                                <span className="position-absolute start-0 top-0 p-2"><FiUser /> </span>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label login_label">Password</label>
                                            <div className='position-relative'>
                                                <input type={inputType} className="btn border w-100 px-4 pe-5 py-2" id="password" placeholder='Youraddres@email.com' />
                                                <span onClick={handleToggle} className='position-absolute end-0 top-0 px-2 py-2'>{inputType === "password" ? <FaEye /> : <FaEyeSlash />} </span>
                                                <span className="position-absolute start-0 top-0 p-2"><TfiLock /> </span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3 fs_sm">
                                            <div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Remember me
                                                        </label>
                                                </div>
                                            </div>
                                            <p> <Link to={"/reset-password"} className='nav-link'>Forgot password?</Link> </p>
                                        </div>
                                        <button
                                            onClick={handleLogin}
                                            className='btn btn-lg blue_bg text-white fs_sm w-100'>Login to continue</button>
                                    </form>
                                    <p className='text-nowrap text-center fs_sm'>Don’t have an account ? <Link className='text-decoration-none fw-semibold prime_brown'>Sign up</Link> </p>
                                </div>
                            </div>
                        </div>
                    )
                        :
                        <OtpForm />
                    }
                </div>
            </Col>
        </Row>
    )
}

export default LoginComponent