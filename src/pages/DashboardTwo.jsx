import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import dashVideo from "../assets/dashboard-video.png"
import classVideo from "../assets/dash-icons/classes.svg"
import forum from "../assets/dash-icons/forum.svg"
import schedule from "../assets/dash-icons/schedule.svg"
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { UserContext } from '../context/AuthContext'
import DashboardWidget from '../components/dashboard/DashboardWidget'
import { ResourceContext } from '../context/ResourceContext'
import LivesClassList from '../components/student-commponent/LivesClassList'
import Loading from '../components/loader/Loading'

const DashboardTwo = () => {
    const { setSideBg } = useContext(ThemeContext);
    const { userCredentials } = useContext(UserContext);
    const { getEnrolledCourses,
        setGetEnrolledCourses,
        getAllSchedules,
        setGetAllSchedules } = useContext(ResourceContext);

    useEffect(() => {
        setSideBg("brown_sidebar")
    }, [])

    useEffect(() => {
        setGetEnrolledCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetAllSchedules((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    const myClasses = getAllSchedules.data?.filter((schedule) => getEnrolledCourses.data?.some((enrollCourse) => enrollCourse.courseId == schedule.course_id))

    const sortClasses = myClasses?.sort((a, b) => {
        const smaller = new Date(a.day)
        const biggerr = new Date(b.day)
        return smaller - biggerr
    })
    console.log(sortClasses)

    return (
        <div className='p-3 p-md-5' style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}>
            <Row>
                <Col md={8}>
                    <h5 className='my-4'>Wellcome to your Dashboard, {userCredentials.user?.first_name}</h5>
                    <DashboardWidget />
                    <Row>
                        <Col md={6} className=' my-4 dash_grid'>
                            <div className="shadow hover_effect h-100 p-0 rounded">
                                <Link to={"/learning"} className='nav-link h-100'>
                                    <img src={dashVideo} alt="" className="img-fluid h-100 w-100" />
                                </Link>
                            </div>
                        </Col>
                        <Col md={6} className=' my-4 dash_grid'>
                            <Link to={"/courses"} className='nav-link h-100'>
                                <div className="shadow hover_effect p-0 h-100 rounded d-flex justify-content-center align-items-center">
                                    <div>
                                        <div>
                                            <img src={classVideo} alt="" className="img-fluid" />
                                        </div>
                                        <p className='fw-semibold fs_sm'>Enter Class Room</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col md={6} className=' my-4 dash_grid'>
                            <Link to={"/soon"} className='nav-link h-100'>
                                <div className="shadow hover_effect p-0 h-100 rounded d-flex justify-content-center align-items-center">
                                    <div>
                                        <div>
                                            <img src={forum} alt="" className="img-fluid" />
                                        </div>
                                        <p className='fw-semibold fs_sm'>Forum</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col md={6} className=' my-4 dash_grid'>
                            <Link to={"/soon"} className='nav-link h-100'>
                                <div className="shadow hover_effect p-0 h-100 rounded d-flex justify-content-center align-items-center">
                                    <div>
                                        <div>
                                            <img src={schedule} alt="" className="img-fluid" />
                                        </div>
                                        <p className='fw-semibold fs_sm'>Course Schedule / <br /> Time Table</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    <h6 className='my-4'>Your Class Schedules</h6>
                    {getAllSchedules.data && (
                        <div className='py-4 overflow_y'>
                            {sortClasses?.map((course) => {
                                return (
                                    <LivesClassList key={course.id} course={course} />
                                )
                            })}
                        </div>
                    )}
                    {!getAllSchedules.data && <Loading />}

                </Col>
            </Row>
        </div>
    )
}

export default DashboardTwo