import { FiLock, FiUnlock, FiUser } from 'react-icons/fi'
import { SiSubtitleedit } from "react-icons/si";
import { GrBusinessService } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { TfiUnlock } from 'react-icons/tfi';
import RegOtpForm from './RegOtpForm';


const RegistrationForm = () => {
    return (
        <div className='col-8 prime_blue'>
            <div className="open_sans reg_form my-4">
                <h3>Create Account</h3>
                <p className='pe-5 fw_sm'>Please complete the fields below.If you already have an existing accounts, please follow Get Access to login</p>
                <form action="">
                    <div className="overflow_y">
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="text" className="btn input_bg px-5 py-2 w-100" id="firstName" placeholder='First Name' />
                                <span className="position-absolute start-0 top-0 p-2"><FiUser /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="text" className="btn input_bg px-5 py-2 w-100" id="email" placeholder='Last Name' />
                                <span className="position-absolute start-0 top-0 p-2"><FiUser /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="text" className="btn input_bg px-5 py-2 w-100" id="email" placeholder='Title' />
                                <span className="position-absolute start-0 top-0 p-2"><SiSubtitleedit /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="text" className="btn input_bg px-5 py-2 w-100" id="email" placeholder='Company' />
                                <span className="position-absolute start-0 top-0 p-2"><GrBusinessService /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="email" className="btn input_bg px-5 py-2 w-100" id="email" placeholder='Email' />
                                <span className="position-absolute start-0 top-0 p-2"><AiOutlineMail /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="password" className="btn input_bg px-5 py-2 w-100" id="email" placeholder='password' />
                                <span className="position-absolute start-0 top-0 p-2"><TfiUnlock /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className='position-relative'>
                                <input type="password" className="btn input_bg px-5 py-2 w-100" id="email" placeholder='confirm password' />
                                <span className="position-absolute start-0 top-0 p-2"><TfiUnlock /> </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Have you been trained by us or Members School before
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button
                            // onClick={handleLogin}
                            className='btn btn-lg brown_bg text-white fs_sm w-100'>Submit</button>
                    </div>
                </form>
            </div>
            {/* <RegOtpForm /> */}
        </div>
    )
}

export default RegistrationForm