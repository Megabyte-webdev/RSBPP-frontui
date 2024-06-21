import React from 'react'
import { HiRocketLaunch } from "react-icons/hi2";

const ComingSoon = () => {
  return (
    <div className='min-vh-100 d-flex justify-content-center align-items-center'>
      <div className="text-center container prime_brown">
        <span> <HiRocketLaunch size={30} /> </span>
        <h1>We are coming soon !!!</h1>
        <p> We &apos; re working on our new website </p>
        <p> Join our news letter and get notified</p>
        <button className='btn hover_effect mt-4 inherit_bg outline_brown '>Notify Me</button>
      </div>

    </div>
  )
}

export default ComingSoon