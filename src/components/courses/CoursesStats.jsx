import chatsImg from '../../assets/chats-img.png'
import stats from '../../assets/course-stat.png'

const CoursesStats = () => {
    return (
        <div className='rounded py-3 my-2 px-2 bg-white fs_xsm'>
            <div className="d-flex">
                <div className='col-4 pe-2'>
                    <div>
                        <img src={stats} alt="" className="img-fluid" />
                    </div>
                </div>
                <div>
                    <p className="fw-semibold mb-1">BSc (Hons) Business Psychology</p>
                    <p>Create an Excel spreadsheet and learn how to maneuver around the</p>
                    <div className="d-flex  my-1">
                        <div className='col-2'>
                            <img src={chatsImg} alt="" className="img-fluid" />
                        </div>
                        <span className='ms-2 mt-1'>Albert Flores</span>
                    </div>
                    <p className="text-end fw-semibold me-2">50%</p>
                    <div className="progress" style={{ height: ".4rem" }} role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar blue_bg" style={{ width: "50%" }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoursesStats