import { useContext, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import logo from "../../assets/new-logo.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLock, FiUser } from "react-icons/fi";
import { TfiLock } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import LoginOtpForm from './LoginOtpForm';
import axios from 'axios';
import { BASE_URL } from '../utils/base';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { ResourceContext } from '../../context/ResourceContext';
import InstructorOtp from './InstructorOtp';

const LoginComponent = () => {

    const navigate = useNavigate();
    const { setUserCredentials, setWidgetOpen } = useContext(UserContext)
    const { setGetAllCarts, getEnrolledCourses, setGetEnrolledCourses } = useContext(ResourceContext)
    const [inputType, setInputType] = useState("password")
    const [otpPage, setOtpPage] = useState(true)
    const [showMsg, setShowMsg] = useState(false)
    const [loading, setLoading] = useState(false)
    const [logDetails, setLogDetails] = useState({
        email: "",
        password: "",
        isRemember: false
    })

    const [errorMsg, setErrorMsg] = useState("")

    const handleToggle = () => {
        if (inputType === 'password') {
            setInputType('text');
            //   setIcon(faEye);
        } else {
            setInputType('password');
            //   setIcon(faEyeSlash);
        }
    };

    const handleOnChange = (e) => {
        const { value, name, type, checked } = e.target
        setLogDetails((prev) => {
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value
            };
        });
        setErrorMsg("");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setGetEnrolledCourses((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        setGetAllCarts((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        setLoading(true)
        axios.post(`${BASE_URL}login`, logDetails,)
            .then((response) => {
                const userData = response.data
                console.log(response.data)
                setUserCredentials(userData)
                localStorage.setItem("userDetails", JSON.stringify(userData));
                // setOtpPage(true)
                setGetEnrolledCourses((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                setGetAllCarts((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                navigate('/')
                setWidgetOpen((prev) => {
                    return {
                        ...prev, display: "none"
                    }
                })
                setLoading(false)
                toast.success("Login successful");
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMsg(error.response.data.message)
                    setShowMsg(true)
                    setLoading(false);
                } else {
                    setErrorMsg(error.message)
                    setShowMsg(true)
                    setLoading(false);
                }
            });
        // setOtpPage(true)
    }

    console.log(getEnrolledCourses)
    return (
        <Row className='d-flex justify-content-center pt-5'>
            <Col md={6}>
                <div className="shadow-sm bg-white rounded-3 px-3 py-4">
                    <div className="mb-3 d-flex justify-content-center">
                        <div className='col-6'>
                            <img src={logo} alt="logo" className="img-fluid" />
                        </div>
                    </div>
                    {!otpPage ? (
                        <div className=' h-100 d-flex align-items-center'>
                            <div className='px-3 px-md-4 w-100'>
                                <h3 className="prime_blue mb-4">Login to your account!</h3>
                                <div>
                                    <form
                                        onSubmit={handleLogin}
                                        className='open_sans mb-3 ' style={{ color: "hsla(242, 97%, 15%, .6)" }}>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="form-label login_label" >Email address</label>
                                            <div className='position-relative'>
                                                <input
                                                    type="email"
                                                    name='email'
                                                    value={logDetails.email}
                                                    onChange={handleOnChange}
                                                    className="btn border px-4 py-2 w-100" id="email" placeholder='Youraddres@email.com' />
                                                <span className="position-absolute start-0 top-0 p-2"><FiUser /> </span>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label login_label">Password</label>
                                            <div className='position-relative'>
                                                <input
                                                    type={inputType}
                                                    name='password'
                                                    value={logDetails.password}
                                                    onChange={handleOnChange}
                                                    className="btn border w-100 px-4 pe-5 py-2" id="password" placeholder='***********' />
                                                <span onClick={handleToggle} className='position-absolute end-0 top-0 px-2 py-2'>{inputType === "password" ? <FaEye /> : <FaEyeSlash />} </span>
                                                <span className="position-absolute start-0 top-0 p-2"><TfiLock /> </span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3 fs_sm">
                                            <div>
                                                <div className="form-check">
                                                    <input className="form-check-input"
                                                        type="checkbox"
                                                        name={"isRemember"}
                                                        checked={logDetails.isRemember}
                                                        onChange={handleOnChange}
                                                        id="remember" />
                                                    <label className="form-check-label" htmlFor="remember">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <p> <Link to={"/reset-password"} className='nav-link'>Forgot password?</Link> </p>
                                        </div>
                                        {showMsg && (<p className="text-center mb-3 text-danger">{errorMsg}</p>)}
                                        <button
                                            // onClick={handleLogin}
                                            className='btn btn-lg blue_bg d-flex align-items-center justify-content-center text-white fs_sm w-100'><span>Login to continue</span>
                                            {loading && (<span className='ms-2'><Spinner size='sm' /></span>)}</button>
                                    </form>
                                    <p className='text-nowrap text-center fs_sm'>Don’t have an account ? <Link to={"/registration"} className='text-decoration-none fw-semibold prime_brown'>Sign up</Link> </p>
                                </div>
                            </div>
                        </div>
                    )
                        :
                        <InstructorOtp />
                    }
                </div>
            </Col>
        </Row>
    )
}

export default LoginComponent