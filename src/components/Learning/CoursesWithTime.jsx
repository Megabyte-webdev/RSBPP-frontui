import React from 'react'
import featurePics from "../../assets/feature-courses.png"
import { FaRegClock } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { TbCurrentLocation } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const CoursesWithTime = () => {
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
          <div className="d-flex my-3">
            <div className="col-6 -1">
                <div className="d-flex justify-content-between">
                    <span>
                        <MdAssignmentAdd size={20} className='prime_brown'/>
                    </span>
                    <div>
                        <span className="fs_xsm">Total Enrolled</span>
                        <p className="fs-3">30</p>
                    </div>
                </div>
            </div>
            <div className="col-6 ps-1">
                <button className='w-100 mb-2 brown_bg border-0 text-white fs-5'>Join</button>
                <button className='w-100 mb-2 fs_xsm blue_bg border-0 text-white fs-5 d-flex'>
                    <span>1 Hrs</span>
                    <span>59 Min</span>
                    <span>59 Sec</span>
                </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CoursesWithTime