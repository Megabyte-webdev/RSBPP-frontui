import React from 'react'
import featurePics from "../../assets/feature-courses.png"
import { FaRegClock } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";


const FeatureCourses = () => {
    return (
        <div className='rounded bg-white'>
            <div>
                <img src={featurePics} alt="" className="img-fluid w-100" />
            </div>
            <div className="p-2 fs_xsm">
                <p className="fw-semibold mb-1">BSc (Hons) Business Psychology</p>
                <p>Kickstart your learning of Python with this beginner-
                    friendly self-paced course taught by an expert.
                    Python is one of the most popular languages in the
                    programming and data science world and demand
                    for individuals who have the ability to apply Python
                    has never been higher
                </p>
                <div className="my-2 px-1 fw-semibold d-flex justify-content-between">
                    <div className='d-flex'>
                        <span> <FaRegClock /></span>
                        <span className='ms-2'>8h 20m</span>
                    </div>
                    <div className='d-flex'>
                        <span> <MdAssignmentAdd /></span>
                        <span className='ms-2'>300</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureCourses