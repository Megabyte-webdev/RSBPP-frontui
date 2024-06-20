import React from 'react'
import { CiVideoOff, CiVideoOn } from 'react-icons/ci'
import { IoMic, IoMicOff } from 'react-icons/io5'
import { MdCallEnd } from 'react-icons/md'

const Indicators = ({ webcamOn, micOn, displayName }) => {
    const camOn = webcamOn ? <CiVideoOn color="#fff" size={20} /> : <CiVideoOff color="#fff" size={20} />
    const speakerOn = micOn ? <IoMic color="#fff" size={20} /> : <IoMicOff color="#fff" size={20} />

    return (
        <div style={{ bottom: "1.5rem" }} className='ps-2 d-flex align-items-center position-absolute start-50 translate-middle-x fs_sm'>
            <p
                style={{ backgroundColor: "hsla(0, 0%, 0%, 0.2)" }}
                className='fw-semibold px-3 fs_sm text-light fw-lighter rounded-pill'
            >{displayName}</p>
            {/* <p className='mx-3'>{camOn}</p>
            <p>{speakerOn}</p> */}
            {/* <button className="video_btns blue_bg me-2 border-0 mx-3">{speakerOn}</button>
            <button className="video_btns blue_bg me-2 border-0">{camOn}</button> */}
        </div>
    )
}

export default Indicators