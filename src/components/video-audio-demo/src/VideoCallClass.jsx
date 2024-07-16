import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CallApp from "./CallApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const VideoCallClass = () => {
  const { state } = useLocation();
  // console.log(state.oneCourse?.list)
  return (
    <>
      <ToastContainer
        toastClassName={() =>
          "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
        }
        bodyClassName={() => "text-black text-base font-normal"}
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CallApp meetingInfo={state?.list} />
    </>
  );
}

export default VideoCallClass;