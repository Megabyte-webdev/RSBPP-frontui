import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/AuthContext";
import { MdAddBox, MdOutlineCalendarMonth, MdOutlineCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaVideo } from "react-icons/fa6";
import prof from "../assets/prof-img.png"
import student1 from "../assets/chats-img.png"
import student22 from "../assets/chats-sidebar.png"
import { Avatar, AvatarGroup } from "@mui/material";
import ReactCalendar from "../components/general/ReactCalendar";
import { FaBars } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { ResourceContext } from "../context/ResourceContext";
import TodayClasses from "../components/courses/TodayClasses";

const today = new Date();

const TodayMeetings = () => {
    const navigate = useNavigate()
    const { setSideBg } = useContext(ThemeContext);
    const { userCredentials } = useContext(UserContext);
    const { getEnrolledCourses,
        setGetEnrolledCourses,
        getAllInstructors,
        setGetAllInstructors,
        getAllSchedules,
        setGetAllSchedules, } = useContext(ResourceContext);

    useEffect(() => {
        setSideBg("brown_sidebar");
    }, []);

    useEffect(() => {
        setGetEnrolledCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetAllInstructors((prev) => {
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

    const todaySchedules = getAllSchedules.data?.filter(classItem => {
        // Assuming 'classItem' has a 'date' property for the class
        const classDate = new Date(classItem.day);
        // Compare year, month, and day to check if dates are the same
        return (classDate.getFullYear() == today.getFullYear() &&
            classDate.getMonth() == today.getMonth() &&
            classDate.getDate() == today.getDate());
    });

    const myClasses = todaySchedules?.filter((schedule) => getEnrolledCourses.data?.some((enrollCourse) => enrollCourse.courseId == schedule.course_id))

    console.log(myClasses);

    return (
        <div
            className="p-3 p-md-5"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
        >
            <Col md={10} className="d-flex mb-4 justify-content-between">
                <h6 className="my-4">Upcoming Courses  Meeting</h6>

            </Col>
            <Row className=" outline_brown p-2 rounded-3">
                <Col md={4} className="my-3 my-md-0">
                    <div className="border-end border_color_brown py-3 d-md-flex justify-content-center">
                        <div className="d-flex align-items-center" >
                            <div style={{ color: "#D1D0D0", marginRight: "1rem" }}>
                                <span>
                                    <FaVideo size={30} />
                                </span>
                            </div>
                            <div>
                                <p>No. of meetings</p>
                                <p><b>336</b> <span className="fs_xsm">This Month</span></p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4} className="my-3 my-md-0">
                    <div className="border-end border_color_brown py-3 d-md-flex justify-content-center">
                        <div className="d-flex align-items-center" >
                            <div style={{ color: "#D1D0D0", marginRight: "1rem" }}>
                                <span>
                                    <MdOutlineCalendarMonth size={30} />
                                </span>
                            </div>
                            <div>
                                <p>Rescheduled meetings</p>
                                <p><b>15</b> <span className="fs_xsm">This Month</span></p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4} className="my-3 my-md-0">
                    <div className="border-end border_color_brown py-3 d-md-flex justify-content-center">
                        <div className="d-flex align-items-center" >
                            <div style={{ color: "#D1D0D0", marginRight: "1rem" }}>
                                <span>
                                    <MdOutlineCancel size={30} />
                                </span>
                            </div>
                            <div>
                                <p>Cancelled meetings </p>
                                <p><b>21</b> <span className="fs_xsm">This Month</span></p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={9}>
                    <div className="my-5">
                        <h5>Today - Classes meetings</h5>
                        <Row>
                            {myClasses?.map((schedule) => {
                                const instructorDetails = getAllInstructors.data?.find(one => one.user_id === schedule.instructor_id)
                                //   console.log(instructorDetails ?. || {})
                                const { title, first_name, degree } = instructorDetails ? instructorDetails : {};
                                return (
                                    <TodayClasses key={schedule.id} schedule={schedule} instructorDetails={instructorDetails} />
                                )
                            })}
                            {myClasses?.length < 1 && <p className="text-center">No Class schedule for today!!!</p>}
                        </Row>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="d-flex align-items-center text-dark my-3 justify-content-between">
                        <span className="bg-white p-2 px-3 rounded-pill">
                            <FaBars color="#C3CAD9" />
                        </span>
                        <span className="fw-bold">Calender</span>
                        <span className="bg-white p-2 px-3 rounded-pill">
                            <FaUserCircle color="#C3CAD9" />
                        </span>
                    </div>
                    <ReactCalendar />
                </Col>
            </Row>
        </div>
    );
};

export default TodayMeetings;
