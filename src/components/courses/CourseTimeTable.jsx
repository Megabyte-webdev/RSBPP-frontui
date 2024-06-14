import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseTimeTable = ({ themeProp, course, themeColor, schedule }) => {
    const navigate = useNavigate()
    return (
        <div
            style={themeProp ? themeProp : null}
            className='shadow-sm p-3 mb-3  rounded'>
            <div className="d-flex fs_sm justify-content-between">
                <div className='d-flex'>
                    <div
                        style={themeColor}
                        className="px-1 rounded"></div>
                    <div className="py-2 ms-3">
                        <p className="fw-bold">{course.title}</p>
                        <p className="">{schedule.start_time} -{schedule.end_time}</p>
                    </div>
                </div>
                <div>
                    <button 
                  onClick={()=> navigate("/video_live", {state : {oneCourse : course, list : schedule}} )}
                  className='bg-white btn rounded-pill btn-sm px-4 py-0 prime_brown border_brown'>Join</button>
                </div>
            </div>
        </div>
    )
}

export default CourseTimeTable