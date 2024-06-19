
const LivesClassList = ({ course }) => {
    // console.log(course)

    const start = new Date(`${course.day}T${course.start_time}`);
    const end = new Date(`${course.day}T${course.end_time}`);
    return (
        <div className="ps-2 class_list  mb-2">
            <div className="d-flex ps-2 mb-2" style={{ backgroundColor: "hsla(0, 0%, 85%, 1)" }}>
                <div className="w-100 fs_sm d-flex align-items-center">
                    <p>{course?.title}</p>
                </div>
                <div className='fs_xsm'>
                    <div className="py-1 px-1 mb-1 blue_bg text-light">
                        <p>{start.toLocaleString()}</p>
                    </div>
                    <div className="py-1 px-1 brown_bg text-light">
                        <p>{end.toLocaleTimeString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LivesClassList