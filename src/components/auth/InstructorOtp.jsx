import axios from "axios";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/base";
import toast from "react-hot-toast";

const InstructorOtp = () => {
  const userData = localStorage.getItem("instructorEmail")

  const [otp, setOtp] = useState(userData.otp);
  const [showMsg, setShowMsg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  const handleOtpSubmit = (e) => {
    const otpDetails = {
      otp: otp,
      email: userData
    }
    e.preventDefault();
    setErrorMsg("")
    setLoading(true)
    axios.post(`${BASE_URL}verifyOtp`, otpDetails,)
      .then((response) => {
        navigate("/registra")
        console.log(response)
        toast.success("registration successful");
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.response.data.response)
        setShowMsg(true)
        setLoading(false);
      });
  }


  // console.log(userData)
  return (
    <div>
      <div className="poppins" style={{ color: "hsla(270, 1%, 27%, 1)" }}>
        <h4 className="text-center">Verify Email</h4>
        <p className="fs_sm text-center">Code Send To Your Email</p>
      </div>
      <form onSubmit={handleOtpSubmit}>
        <div className="otp d-flex justify-content-center my-5">
          <OtpInput
            inputStyle="otp_style"
            containerStyle={"otp_container col-6"}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            // renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <div className="mt-5 col-6 mx-auto">
          {showMsg && (<p className="text-center mb-3 text-danger">{errorMsg}</p>)}
          <Button
            type="submit" className="brown_bg rounded-3 border-0 w-100">

            Verify
            {loading && (<span className='ms-2'><Spinner size='sm' /></span>)}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InstructorOtp;
