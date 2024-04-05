import React from 'react'
import featurePics from "../../assets/feature-courses.png"
import { FaRegClock } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { TbCurrentLocation } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const LearningCourse = () => {
  return (
    <div className='rounded bg-white mb-3'>
      <Link to={"/learning/details"} className='nav-link'>
        <div>
          <img src={featurePics} alt="" className="img-fluid w-100" />
        </div>
        <div className="p-2 fs_xsm">
          <p className="fw-semibold mb-1">BSc (Hons) Business Psychology</p>
          <p className='my-3'>Learn everything you need to become a secure cyber professional
          </p>
          <div className="my-2 px-1 fw-semibold d-flex justify-content-between">
            <div className='d-flex'>
              <span> <FaRegClock className='prime_brown' /></span>
              <span className='ms-2'>8h 20m</span>
            </div>
            <div className='d-flex'>
              <span> <TbCurrentLocation className='prime_brown' /></span>
              <span className='ms-2'>Online</span>
            </div>
            <div className='d-flex'>
              <span> <MdAssignmentAdd className='prime_brown' /></span>
              <span className='ms-2'> $ 300</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default LearningCourse