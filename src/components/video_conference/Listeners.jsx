import listener from "../../assets/listerner-img.png"
import { IoMic } from "react-icons/io5";

const Listeners = () => {
    return (
        <div className="position-relative">
            <div className="">
                <img src={listener} alt="" className="img-fluid" />
            </div>
            <div className="position-absolute icon_mic">
                <IoMic size={15} color="#fff" />
            </div>
        </div>
    )
}

export default Listeners