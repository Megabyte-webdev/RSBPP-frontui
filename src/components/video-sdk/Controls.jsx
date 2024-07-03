import { useMeeting } from "@videosdk.live/react-sdk";
import { useState } from "react";
import { CiVideoOff, CiVideoOn } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";
import { IoMic, IoMicOff } from "react-icons/io5";
import { MdCallEnd, MdOutlineCancelPresentation } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Controls() {
    const navigate = useNavigate()
    const [isMicOn, setIsMicOn] = useState(true)
    const [isWebcamOn, setIsWebcamOn] = useState(true)
    const {
        enableScreenShare,
        disableScreenShare,
        toggleScreenShare,
        leave, toggleMic, toggleWebcam, webcamOn, micOn, } = useMeeting();

    const handleEnableScreenShare = () => {
        // Enabling screen share
        enableScreenShare();
    };

    const handleDisableScreenShare = () => {
        // Disabling screen share
        disableScreenShare();
    };
    const handleToggleMic = () => {
        // Toggling Mic
        toggleMic();
        setIsMicOn(prev => !prev)
    };

    const handleToggleWebcam = () => {
        // Toggling webcam
        toggleWebcam();
        setIsWebcamOn(prev => !prev)
      };

    const leaveMeetingToHome = () => {
        // Toggling screen share
        leave();
        navigate("/")
    };
    console.log(isMicOn)
    // const camOn = webcamOn ? <CiVideoOn color="#fff" size={20} /> : <CiVideoOff color="#fff" size={20} />
    // const speakerOn = micOn ? <IoMic color="#fff" size={20} /> : <IoMicOff color="#fff" size={20} />
    return (
        <div className="d-flex my-3">
            <button className="video_btns brown_bg me-2 border-0" style={{ backgroundColor: "hsla(359, 54%, 44%, 0.2)" }} onClick={() => leaveMeetingToHome()}><MdCallEnd color="#fff" size={20} /></button>
            <button className="video_btns blue_bg me-2 border-0" onClick={handleToggleMic}>{isMicOn ? <IoMic color="#fff" size={20} /> : <IoMicOff color="#fff" size={20} />}</button>
            <button className="video_btns blue_bg me-2 border-0" onClick={handleToggleWebcam}>{ isWebcamOn ? <CiVideoOn color="#fff" size={20} /> : <CiVideoOff color="#fff" size={20} />}</button>
            <button className="video_btns blue_bg me-2 border-0" onClick={handleEnableScreenShare}><FiUpload color="#fff" size={20} /></button>
            <button
                style={{ backgroundColor: "hsla(0, 79%, 63%, 0.4)" }}
                className="video_btns me-2 border-0 prime_brown" onClick={handleDisableScreenShare}><MdOutlineCancelPresentation size={20} /></button>
            {/* <button className="video_btns blue_bg me-2 border-0" onClick={handleToggleScreenShare}>Toggle Screen Share</button> */}

        </div>
    );
}
export default Controls