import React from 'react'
import { PiUser, PiUserFocusThin } from "react-icons/pi";
import { MdOutlineMail } from "react-icons/md";
import { BsCameraReels } from "react-icons/bs";
import { GiVideoConference } from "react-icons/gi";


const RegistrationGuide = ({display}) => {
    const reg = display === "registration" ? "guide_active" : "";
    const otp = display === "otp" ? "guide_active" : "";
    const onboard = display === "onboarding" ? "guide_active" : "";
    return (
        <div className='brown_bg d-flex align-items-center justify-content-center poppins vh_md_100'>
            <div className="col-10 d-flex d-md-block">
                <div className="d-flex me-3">
                    <div className='icon_square my-3 mb-md-5 mt-md-0'>
                        <span className={reg}>
                            <PiUser />
                        </span>
                        <div className="position-absolute d-none d-md-block pb-5 start-50 border-end"></div>
                    </div>
                    <div className='ms-3 d-none d-md-block text-white mt-2'>
                        <p className='fw-semibold'>User Registration</p>
                        <p className="fs_sm">Enter your name, email and password</p>
                    </div>
                </div>
                <div className="d-flex me-3">
                    <div className='icon_square my-3 mb-md-5 mt-md-0'>
                        <span className={otp}>
                            <MdOutlineMail />
                        </span>
                        <div className="position-absolute d-none d-md-block pb-5 start-50 border-end"></div>
                    </div>
                    <div className='ms-3 d-none d-md-block text-white mt-2'>
                        <p className='fw-semibold'>Email verification</p>
                        <p className="fs_sm">Verify your email address</p>
                    </div>
                </div>
                <div className="d-flex me-3">
                    <div className='icon_square my-3 mb-md-5 mt-md-0'>
                        <span>
                            <PiUserFocusThin />
                        </span>
                        <div className="position-absolute d-none d-md-block pb-5 start-50 border-end"></div>
                    </div>
                    <div className='ms-3 d-none d-md-block text-white mt-2'>
                        <p className='fw-semibold'>Profile details</p>
                        <p className="fs_sm">Provide profile Pictures and job  title</p>
                    </div>
                </div>
                {/* <div className="d-flex me-3">
                    <div className='icon_square my-3 mb-md-5 mt-md-0'>
                        <span>
                            <PiUser />
                        </span>
                        <div className="position-absolute d-none d-md-block pb-5 start-50 border-end"></div>
                    </div>
                    <div className='ms-3 d-none d-md-block text-white mt-2'>
                        <p className='fw-semibold'>Course details</p>
                        <p className="fs_sm">Choose your course details and other info</p>
                    </div>
                </div> */}
                <div className="d-flex me-3">
                    <div className='icon_square my-3 mb-md-5 mt-md-0'>
                        <span className={onboard}>
                            <GiVideoConference size={25} />
                        </span>
                        <div className="position-absolute d-none d-md-block pb-5 start-50 border-end"></div>
                    </div>
                    <div className='ms-3 d-none d-md-block text-white mt-2'>
                        <p className='fw-semibold'>Welcome video</p>
                        <p className="fs_sm">Start your journey with a Click</p>
                    </div>
                </div>
                <div className="d-flex me-3">
                    <div className='icon_square my-3 mb-md-5 mt-md-0'>
                        <span className={""}>
                            <BsCameraReels />
                        </span>
                        {/* <div className="position-absolute d-none d-md-block pb-5 start-50 border-end"></div> */}
                    </div>
                    <div className='ms-3 d-none d-md-block text-white mt-2'>
                        <p className='fw-semibold'>Welcome video</p>
                        <p className="fs_sm">Start your journey with a Click</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationGuide