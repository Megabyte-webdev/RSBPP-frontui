import React from 'react'
import { CiVideoOff, CiVideoOn } from 'react-icons/ci'
import { IoMic, IoMicOff } from 'react-icons/io5'
import { MdCallEnd } from 'react-icons/md'

const Indicators = ({ webcamOn, micOn, displayName }) => {
    const camOn = webcamOn ? <CiVideoOn color="#fff" size={20} /> : <CiVideoOff color="#fff" size={20} />
    const speakerOn = micOn ? <IoMic color="#fff" size={20} /> : <IoMicOff color="#fff" size={20} />

    return (
        <div className='d-flex align-items-center fs_sm'>
            <p className='fw-semibold'>{displayName}</p>
            {/* <p className='mx-3'>{camOn}</p>
            <p>{speakerOn}</p> */}
            {/* <button className="video_btns blue_bg me-2 border-0 mx-3">{speakerOn}</button>
            <button className="video_btns blue_bg me-2 border-0">{camOn}</button> */}
        </div>
    )
}

export default Indicators