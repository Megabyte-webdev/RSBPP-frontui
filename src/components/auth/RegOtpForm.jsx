import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { BASE_URL } from "../utils/base";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const RegOtpForm = ({ setDisplay }) => {

  const currentEmail = localStorage.getItem("regEmail");
  // console.log(currentEmail)
  const navigate = useNavigate();

  const handleOtp = () => {
    setDisplay("onboarding")
  }
  const [otp, setOtp] = useState('');
  const [showMsg, setShowMsg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    const otpDetails = {
      otp: otp,
      email: currentEmail
    }
    setErrorMsg("")
    setLoading(true)
    axios.post(`${BASE_URL}verifyOtp`, otpDetails,)
      .then((response) => {
        navigate("/login")
        localStorage.removeItem("regEmail")
        toast.success("Registration successfull");
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.response.data.response)
        setShowMsg(true)
        setLoading(false);
      });
  }

  return (
    <div className="poppins">
      <div>
        <h3 className="text-">Verify Email</h3>
        <p className="fs_sm text-">We sent a code to {currentEmail}</p>
      </div>
      <form onSubmit={handleOtpSubmit}>
        <div className="otp d-flex my-5">
          <OtpInput
            inputStyle="otp_style"
            containerStyle={"otp_container col-10"}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            // renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <p className="my-3" style={{ color: "hsla(270, 1%, 27%, 1)" }}>Didn’t get a code ? Resend</p>
        <div className="mt-5 col">
          {showMsg && (<p className="text-center mb-3 text-danger">{errorMsg}</p>)}
          <Button
            // onClick={handleOtp}
            type="submit" className="brown_bg rounded-3 border-0 w-100">
            Create Account
            {loading && (<span className='ms-2'><Spinner size='sm' /></span>)}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegOtpForm;
