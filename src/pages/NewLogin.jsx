import { useContext, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import logo from "../assets/new-logo.png"
import { FaEye, FaEyeSlash, FaYoutube, FaArrowUp } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TfiLock } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { ResourceContext } from '../context/ResourceContext';
import { BASE_URL } from '../components/utils/base';
import { CiFacebook, CiInstagram } from "react-icons/ci";
import { RiTwitterXLine } from 'react-icons/ri';
import { TiSocialLinkedinCircular } from 'react-icons/ti';


const NewLogin = () => {

    const navigate = useNavigate()
    const { setUserCredentials, setWidgetOpen } = useContext(UserContext)
    const { setGetAllCarts } = useContext(ResourceContext)
    const [inputType, setInputType] = useState("password")
    const [otpPage, setOtpPage] = useState(false)
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
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                setGetAllCarts((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                navigate("/")
                setWidgetOpen((prev) => {
                    return {
                        ...prev, display: "block"
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
    return (
        <div>
            <div className="container mt-5 pt-5">
                <div className="row g-0 justify-content-center">
                    <div className="col-md-6">
                        <div className="border border-black p-3 rounded-2 position-relative">
                            <p>Please enter your email and password to resume this form </p>
                            <div className="my-3">
                                <div>
                                    <form
                                        onSubmit={handleLogin}
                                        className='open_sans mb-3'>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="form-label fw-semibold login_label" >Email address</label>
                                            <div className='position-relative'>
                                                <input
                                                    type="email"
                                                    name='email'
                                                    value={logDetails.email}
                                                    onChange={handleOnChange}
                                                    className="btn border px-5 py-2 text-start w-100" id="email" placeholder='youraddres@email.com' />
                                                <span className="position-absolute start-0 top-0 p-2"><FiUser /> </span>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label fw-semibold login_label">Password</label>
                                            <div className='position-relative'>
                                                <input
                                                    type={inputType}
                                                    name='password'
                                                    value={logDetails.password}
                                                    onChange={handleOnChange}
                                                    className="btn border w-100 px-5 text-start pe-5 py-2" id="password" placeholder='***********' />
                                                <span onClick={handleToggle} className='position-absolute end-0 top-0 px-2 py-2'>{inputType === "password" ? <FaEye /> : <FaEyeSlash />} </span>
                                                <span className="position-absolute start-0 top-0 p-2"><TfiLock /> </span>
                                            </div>
                                        </div>
                                        {/* <div className="d-flex justify-content-between mb-3 fs_sm">
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
                                        </div> */}
                                        {showMsg && (<p className="text-center mb-3 text-danger">{errorMsg}</p>)}
                                        <div className=" d-flex align-items-center">
                                            <button
                                                // onClick={handleLogin}
                                                className='btn btn-lg me-2 brown_bg d-flex align-items-center justify-content-center text-white fs_sm fw-semibold'><span>Login to continue</span>
                                                {loading && (<span className='ms-2'><Spinner size='sm' /></span>)}
                                            </button>
                                            <div className="me-1">
                                                <p className='text-nowrap text-center fs_sm'>| <Link to={"/registration"} className='text-decoration-none fw-semibold prime_brown'>Sign up</Link> </p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <p className="position-absolute top-0 start-50 translate-middle bg-white fw-semibold px-2">Identity Check</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center pt-5">
                    <div className="col-md-10">
                        <div className="border-top border-black px-2 border-2 pt-5">
                            <div className='col-4 col-md-3 mb-3'>
                                <img src={logo} alt="" className="img-fluid" />
                            </div>
                            <div className='d-md-flex justify-content-between mb-5'>
                                <div className="fw-semibold ">
                                    <div className="fw-semibold d-flex mb-2">
                                        <Link to={""} className="nav-link prime_brown mx-1"> Contact us </Link> |
                                        <Link to={""} className="nav-link prime_brown mx-1"> Location </Link> |
                                        <Link to={""} className="nav-link ms-2"> 655 Knight way Rotterdam Netherland </Link>
                                    </div>
                                    <div className="fw-semibold d-flex mb-2">
                                        <Link to={""} className="nav-link me-2"> Rotterdam School of Business and Public Policy </Link>
                                        <Link to={""} className="nav-link prime_brown mx-1"> Accessibility </Link> |
                                        <Link to={""} className="nav-link prime_brown mx-1"> Privacy Policy </Link> |
                                        <Link to={""} className="nav-link prime_brown mx-1"> Terms of use </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex mt-4 mt-md-0 mb-3 align-items-end prime_brown fw-bold">
                                        <span>Return to Top</span>
                                        <button className='ms-2 border-0 inherit_bg inherit_text' onClick={handleScrollToTop}>
                                            <FaArrowUp size={30} />
                                        </button>
                                    </div>
                                    <div className="d-flex">
                                        <span className="me-1">
                                            <CiFacebook />
                                        </span>
                                        <span className="me-1">
                                            <CiInstagram />
                                        </span>
                                        <span className="me-1">
                                            <TiSocialLinkedinCircular />
                                        </span>
                                        <span className="me-1">
                                            <RiTwitterXLine />
                                        </span>
                                        <span className="me-1">
                                            <FaYoutube />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewLogin