import { useState } from "react";
import { Button } from "react-bootstrap";
import OtpInput from "react-otp-input";

const RegOtpForm = () => {

  const [otp, setOtp] = useState('');

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    alert(otp)
  }
  return (
    <div className="poppins">
      <div>
        <h3 className="text-">Verify Email</h3>
        <p className="fs_sm text-">We sent a code to jamesjohn@gmail.com</p>
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
          <Button type="submit" className="brown_bg rounded-3 border-0 w-100">
            {/* {isLoading && (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )} */}
            {/* {!isLoading &&  */}
            Create Account
            {/* } */}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegOtpForm;
