import { IoMic } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { RiMessage2Line, RiMoreFill } from "react-icons/ri";
import { FaRecordVinyl } from "react-icons/fa6";
import { PiUploadSimpleBold } from "react-icons/pi";

const VideoButtons = () => {
    return (
        <div className="p-3 bg-white my-3 rounded">
            <div className="d-flex">
                <div className="video_btns blue_bg me-2">
                    <IoMic color="#fff" size={20} />
                </div>
                <div className="video_btns blue_bg me-2">
                    <CiVideoOn color="#fff" size={20} />
                </div>
                <div className="video_btns light_sky me-2">
                    <RiMessage2Line className="prime_blue" size={20} />
                </div>
                <div className="video_btns me-2" style={{ backgroundColor: "hsla(359, 54%, 44%, 0.2)" }}>
                    <FaRecordVinyl color="#f00" size={20} />
                </div>
                <div className="video_btns light_sky me-2">
                    <PiUploadSimpleBold color="#000" size={20} />
                </div>
                <div className="btn-group dropup me-4">
                    <button type="button" className="video_btns no_arrow border-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <RiMoreFill color="#000" size={20} />
                    </button>
                    <ul className="dropdown-menu">
                       <li>session</li>
                    </ul>
                </div>
                <button className="btn text-white red rounded-pill">Courses</button>
            </div>
        </div>
    )
}

export default VideoButtons