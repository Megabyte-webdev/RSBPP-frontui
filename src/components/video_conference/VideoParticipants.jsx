import participant from "../../assets/participant.png"
import { BsMicFill } from "react-icons/bs";
import { LuVideoOff } from "react-icons/lu";


const VideoParticipants = () => {
    return (
        <div className='d-flex justify-content-between rounded-pill my-3' style={{ backgroundColor: "hsla(0, 19%, 95%, 1)" }}>
            <div className="d-flex align-items-center ">
                <div className="me-2">
                    <img src={participant} alt="" className="img-fluid" />
                </div>
                <p>Nsikak Joseph Nelson</p>
            </div>
            <div className="d-flex align-items-center ">
                <span className="me-2 "> <BsMicFill className="prime_blue" /> </span>
                <span className="me-3 red_text"> <LuVideoOff /> </span>
            </div>
        </div>
    )
}

export default VideoParticipants