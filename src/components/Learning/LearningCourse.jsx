import React from 'react'
import featurePics from "../../assets/feature-courses.png"
import { FaRegClock } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { TbCurrentLocation } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const LearningCourse = ({course}) => {
  const navigate = useNavigate();
  console.log(course)
  const date = new Date(course.updated_at)
  return (
    <div className='rounded bg-white mb-3'>
      <div onClick={()=> navigate(`/learning/${course.title}`, { state: { course: course } })} className='nav-link pointer'>
        <div>
          <img src={featurePics} alt="" className="img-fluid w-100" />
        </div>
        <div className="p-2 fs_xsm">
          <p className="fw-semibold mb-1">{course.title}</p>
          <p className='my-3'>
            {course.description}
          </p>
          <div className="my-2 px-1 fw-semibold d-flex justify-content-between">
            <div className='d-flex'>
              <span> <FaRegClock className='prime_brown' /></span>
              <span className='ms-2'>{date.toLocaleTimeString()}</span>
            </div>
            <div className='d-flex'>
              <span> <TbCurrentLocation className='prime_brown' /></span>
              <span className='ms-2'>{course.course_type}</span>
            </div>
            <div className='d-flex'>
              <span> <MdAssignmentAdd className='prime_brown' /></span>
              <span className='ms-2'> $ {course.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningCourse