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
import { IoCheckboxSharp } from 'react-icons/io5';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';


const RegistrationForm = ({ setDisplay }) => {
    const fromLocal = (localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts"))[0] : null);
    fromLocal && localStorage.setItem("comingFrom", "guest");
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
        role: "student",
        password: "",
        previousl_trained: false
    })

    const toggleAccept = () => {
        setRegDetails((prev) => {
            return {
                ...prev, previousl_trained: !regDetails.previousl_trained
            };
        });
    }

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
    }

    return (
        <div className='col-8 prime_blue'>
            <div className="open_sans reg_form my-4">
                <h3>Create Account</h3>
                <p className='pe-md-5 fw-light fs_sm mb-4'>Please complete the fields below.If you already have an existing accounts, please follow Get Access to <span onClick={()=>navigate('/login')} className='cursor-pointer font-bold text-blue-600'>{fromLocal ? 'Login To Check Out' :'Login'}</span></p>
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
                        {/* <div className="mb-4">
                            <div className='position-relative'>
                                <input type="text"
                                    name="role"
                                    value={regDetails.role}
                                    onChange={handleOnChange}
                                    className="btn input_bg px-5 py-2 w-100" placeholder='Role' />
                                <span className="position-absolute start-0 top-0 p-2"><SiSubtitleedit /> </span>
                            </div>
                        </div> */}
                        {/* <div className="mb-4">
                            <div className='position-relative'>
                                <select
                                    name="role"
                                    value={regDetails.role}
                                    onChange={handleOnChange}
                                    className="form- py-2 w-100 border-0 rounded px-5 input_bg" aria-label="Default select example">
                                    <option value="admin">admin</option>
                                    <option value="instructor">instructor</option>
                                    <option value="student">student</option>
                                </select>
                                <span className="position-absolute start-0 top-0 p-2"><SiSubtitleedit /> </span>
                            </div>
                        </div> */}
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
                        <div className="mb-4 d-flex">
                            <button
                                onClick={() => toggleAccept()}
                                type='button'
                                className='border-0 prime_brown inherit_bg'>
                                {regDetails.previousl_trained ? (
                                    <IoCheckboxSharp size={25} />
                                ) : (
                                    <MdOutlineCheckBoxOutlineBlank size={25} />
                                )}
                            </button>
                            <div className="">
                                Have you been trained by us or Members School before
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