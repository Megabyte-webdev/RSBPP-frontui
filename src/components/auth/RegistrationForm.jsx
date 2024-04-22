import { FiLock, FiUnlock, FiUser } from 'react-icons/fi'
import { SiSubtitleedit } from "react-icons/si";
import { GrBusinessService } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { TfiUnlock } from 'react-icons/tfi';
// import RegOtpForm from './RegOtpForm';
import { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spinner } from 'react-bootstrap';
import { BASE_URL } from '../utils/base';
import { UserContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const RegistrationForm = ({ setDisplay }) => {
    const { userCredentials } = useContext(UserContext)
    const [inputType, setInputType] = useState("password")
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [showMsg, setShowMsg] = useState(false)
    const navigate = useNavigate()

    const [regDetails, setRegDetails] = useState({
        first_name: "",
        last_name: "",
        organization: "",
        position: "",
        email: "",
        role: "",
        password: "",
        previousl_trained: true
    })

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
        setRegDetails((prev) => {
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value
            };
        });
        setErrorMsg("");
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        setLoading(true)
        setShowMsg(false)
        axios.post(`${BASE_URL}NewUser`, regDetails, {
            // headers: {
            //     Authorization: `Bearer ${userCredentials.token}`,
            // },
        },)
            .then((response) => {
                console.log(response.data)
                // navigate("/")
                localStorage.setItem("regEmail", regDetails.email)
                setDisplay("otp")
                setLoading(false)
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.log(error);
                setErrorMsg(error.response.data.message)
                setShowMsg(true)
                setLoading(false);
            });
    }

    console.log(regDetails)
    const handleRegistrations = () => {
        setDisplay("otp")
    }
    return (
        <div className='col-8 prime_blue'>
            <div className="open_sans reg_form my-4">
                <h3>Create Account</h3>
                <p className='pe-5 fw_sm mb-4'>Please complete the fields below.If you already have an existing accounts, please follow Get Access to login</p>
                <form
                    onSubmit={handleRegistration}
                >
                    <div className="overflow_y">
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={regDetails.first_name}
                                    onChange={handleOnChange}
                                    className="btn input_bg px-5 py-2 w-100" id="firstName" placeholder='First Name' />
                                <span className="position-absolute start-0 top-0 p-2"><FiUser /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="text"
                                    name="last_name"
                                    value={regDetails.last_name}
                                    onChange={handleOnChange}
                                    className="btn input_bg px-5 py-2 w-100" placeholder='Last Name' />
                                <span className="position-absolute start-0 top-0 p-2"><FiUser /> </span>
                            </div>
                        </div>
                        {/* <div className="mb-4">
                            <div className='position-relative'>
                                <input type="text"
                                 className="btn input_bg px-5 py-2 w-100" placeholder='Title' />
                                <span className="position-absolute start-0 top-0 p-2"><SiSubtitleedit /> </span>
                            </div>
                        </div> */}
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="text"
                                    name="organization"
                                    value={regDetails.organization}
                                    onChange={handleOnChange}
                                    className="btn input_bg px-5 py-2 w-100" placeholder='organization' />
                                <span className="position-absolute start-0 top-0 p-2"><GrBusinessService /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="text"
                                    name="position"
                                    value={regDetails.position}
                                    onChange={handleOnChange}
                                    className="btn input_bg px-5 py-2 w-100" placeholder='position' />
                                <span className="position-absolute start-0 top-0 p-2"><GrBusinessService /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="text"
                                    name="role"
                                    value={regDetails.role}
                                    onChange={handleOnChange}
                                    className="btn input_bg px-5 py-2 w-100" placeholder='Role' />
                                <span className="position-absolute start-0 top-0 p-2"><SiSubtitleedit /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="email"
                                    name="email"
                                    value={regDetails.email}
                                    onChange={handleOnChange}
                                    className="btn input_bg px-5 py-2 w-100" placeholder='Email' />
                                <span className="position-absolute start-0 top-0 p-2"><AiOutlineMail /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type={inputType}
                                    name="password"
                                    value={regDetails.password}
                                    onChange={handleOnChange}
                                    className="btn input_bg px-5 py-2 w-100" placeholder='password' />
                                <span onClick={handleToggle} className="position-absolute start-0 top-0 p-2">{inputType === "password" ? <FaEye /> : <FaEyeSlash />} </span>
                            </div>
                        </div>
                        {/* <div className="mb-4"
                            <div className='position-relative'>
                                <input type="password" className="btn input_bg px-5 py-2 w-100" placeholder='confirm password' />
                                <span className="position-absolute start-0 top-0 p-2"><TfiUnlock /> </span>
                            </div>
                        </div> */}
                        <div className="mb-4">
                            <div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        name='previousl_trained'
                                        checked={regDetails.previousl_trained}
                                        onChange={handleOnChange}
                                        value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Have you been trained by us or Members School before
                                    </label>
                                </div>
                            </div>
                        </div>
                        {showMsg && (<p className="text-center mb-3 text-danger">{errorMsg}</p>)}
                        <button
                            className='btn btn-lg brown_bg text-white fs_sm w-100'>Submit
                            {loading && (<span className='ms-2'><Spinner size='sm' /></span>)}
                        </button>
                    </div>
                </form>
            </div>
            {/* <RegOtpForm /> */}
        </div>
    )
}

export default RegistrationForm