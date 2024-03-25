import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import logo from "../assets/logo.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import loginImg from "../assets/login-img1.png"
import { FiUser } from 'react-icons/fi';

const ResetPassword = () => {
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
        <Row className='g-0'>
            <Col md={7}>
                <Row className='d-flex justify-content-center pt-5'>
                    <Col md={6}>
                        <div className="mb-5">
                            <img src={logo} alt="logo" className="img-fluid" />
                        </div>
                        <div className=' h-100 d-flex align-items-center'>
                            <div className='px-3 w-100'>
                                <div className="poppins" style={{ color: "hsla(270, 1%, 27%, 1)" }}>
                                    <h4 className="">Verify Email</h4>
                                    <p className="fs_sm ">Enter Your Mail To Reset</p>
                                </div>
                                <div>
                                    <form className='open_sans mb-3'>
                                    <div className="my-5">
                                            <div className='position-relative'>
                                                <input type="email" className="btn border px-4 py-2 w-100" id="email" placeholder='Enter email or phone' />
                                                <span className="position-absolute start-0 top-0 p-2"><FiUser /> </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogin}
                                            className='btn btn-lg brown_bg text-white w-100'>VERIFY</button>
                                    </form>
                                    {/* <small className='text-nowrap'>Don’t have an account ? <Link className='text-decoration-none fw-semibold prime_brown'>Sign up</Link> </small> */}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col md={5}>
                <div>
                    <img src={loginImg} alt="" style={{ height: "100vh" }} className='img-fluid w-100' />
                </div>
            </Col>
        </Row>
    )
}

export default ResetPassword