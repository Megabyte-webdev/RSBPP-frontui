import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import logo from "../../assets/logo.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

    const handleLogin = ()=>{
        setOtpPage(true)
    }
    return (
        <Row className='d-flex justify-content-center pt-5'>
            <Col md={8}>
                <div className="mb-5">
                    <img src={logo} alt="logo" className="img-fluid" />
                </div>
                {!otpPage ? (
                    <div className=' h-100 d-flex align-items-center'>
                        <div className='px-3 w-100'>
                            <h3 className="prime_blue mb-4">Login to your account!</h3>
                            <div>
                                <form className='open_sans mb-3'>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label login_label" >Email address</label>
                                        <div>
                                            <input type="email" className="border-0 border-bottom ps-2 py-2 w-100" id="email" placeholder='Youraddres@email.com' />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label login_label">Password</label>
                                        <div className='position-relative'>
                                            <input type={inputType} className="border-0 border-bottom w-100 ps-2 pe-4 py-2" id="password" placeholder='Youraddres@email.com' />
                                            <span onClick={handleToggle} className='position-absolute end-0 top-0 px-2 py-2'>{inputType === "password" ? <FaEye /> : <FaEyeSlash />} </span>
                                        </div>
                                    </div>
                                    <button 
                                    onClick={handleLogin}
                                    className='btn btn-lg brown_bg text-white w-100'>Login to continue</button>
                                </form>
                                <small className='text-nowrap'>Don’t have an account ? <Link className='text-decoration-none fw-semibold prime_brown'>Sign up</Link> </small>
                            </div>
                        </div>
                    </div>
                )
                    :
                    <OtpForm />
                }
            </Col>
        </Row>
    )
}

export default LoginComponent