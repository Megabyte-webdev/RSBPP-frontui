import React from 'react'
import { PiUser, PiUserFocusThin } from "react-icons/pi";
import { MdOutlineMail } from "react-icons/md";
import { BsCameraReels } from "react-icons/bs";


const RegistrationGuide = () => {
    return (
        <div className='brown_bg d-flex align-items-center justify-content-center poppins' style={{ minHeight: "100vh" }}>
            <div className="col-10">
                <div className="d-flex">
                    <div className='icon_square mb-5'>
                        <span>
                            <PiUser />
                        </span>
                        <div className="position-absolute pb-5 start-50 border-end"></div>
                    </div>
                    <div className='ms-3 text-white mt-2'>
                        <p className='fw-semibold'>User Registration</p>
                        <p className="fs_sm">Enter your name, email and password</p>
                    </div>
                </div>
                <div className="d-flex">
                    <div className='icon_square mb-5'>
                        <span>
                            <MdOutlineMail />
                        </span>
                        <div className="position-absolute pb-5 start-50 border-end"></div>
                    </div>
                    <div className='ms-3 text-white mt-2'>
                        <p className='fw-semibold'>Email verification</p>
                        <p className="fs_sm">Verify your email address</p>
                    </div>
                </div>
                <div className="d-flex">
                    <div className='icon_square mb-5'>
                        <span>
                            <PiUserFocusThin />
                        </span>
                        <div className="position-absolute pb-5 start-50 border-end"></div>
                    </div>
                    <div className='ms-3 text-white mt-2'>
                        <p className='fw-semibold'>Profile details</p>
                        <p className="fs_sm">Provide profile Pictures and job  title</p>
                    </div>
                </div>
                {/* <div className="d-flex">
                    <div className='icon_square mb-5'>
                        <span>
                            <PiUser />
                        </span>
                        <div className="position-absolute pb-5 start-50 border-end"></div>
                    </div>
                    <div className='ms-3 text-white mt-2'>
                        <p className='fw-semibold'>Course details</p>
                        <p className="fs_sm">Choose your course details and other info</p>
                    </div>
                </div> */}
                <div className="d-flex">
                    <div className='icon_square mb-5'>
                        <span>
                            <BsCameraReels />
                        </span>
                        {/* <div className="position-absolute pb-5 start-50 border-end"></div> */}
                    </div>
                    <div className='ms-3 text-white mt-2'>
                        <p className='fw-semibold'>Welcome video</p>
                        <p className="fs_sm">Start your journey with a Click</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationGuide