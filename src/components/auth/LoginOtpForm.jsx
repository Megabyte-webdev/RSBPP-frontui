import { useState } from "react";
import { Button } from "react-bootstrap";
import OtpInput from "react-otp-input";

const LoginOtpForm = () => {

  const [otp, setOtp] = useState('');

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    alert(otp)
  }
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
          <Button type="submit" className="brown_bg rounded-3 border-0 w-100">
            {/* {isLoading && (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )} */}
            {/* {!isLoading &&  */}
            Verify
            {/* } */}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginOtpForm;
