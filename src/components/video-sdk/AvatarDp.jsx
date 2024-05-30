import React from 'react'
import avatarPics from "../../assets/user-icon.png"
import { CiVideoOff, CiVideoOn } from 'react-icons/ci'
import { IoMic, IoMicOff } from 'react-icons/io5'
const AvatarDp = ({ webcamOn, micOn }) => {

    const camOn = webcamOn ? <CiVideoOn color="#fff" size={20} /> : <CiVideoOff color="#fff" size={20} />
    const speakerOn = micOn ? <IoMic color="#fff" size={20} /> : <IoMicOff color="#fff" size={20} />

    return (
        <div className=" my-5">
            <div className="d-flex justif-content-center">
                <div className="rounded position-relative bg-dark">
                    <div className='p-2'>
                        <img src={avatarPics} alt="" className="img-fluid" />
                    </div>
                    <div style={{ bottom: ".3rem" }} className="d-flex position-absolute px-1 w-100 justify-content-between">
                    <p>{speakerOn}</p>
                        <p className=''>{camOn}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvatarDp