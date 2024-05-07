import React from 'react'

const CourseTimeTable = ({ themeProp, themeColor }) => {
    return (
        <div
            style={themeProp ? themeProp : null}
            className='shadow-sm p-3 rounded'>
            <div className="d-flex fs_sm justify-content-between">
                <div className='d-flex'>
                    <div
                    style={themeColor}
                        className="px-1 rounded"></div>
                    <div className="py-2 ms-3">
                        <p className="fw-bold">Design Thinking & Innovation</p>
                        <p className="">8:00 Am - 9:00 PM</p>
                    </div>
                </div>
                <div>
                    <button className='bg-white btn rounded-pill btn-sm px-4 py-0 prime_brown border_brown'>Join</button>
                </div>
            </div>
        </div>
    )
}

export default CourseTimeTable