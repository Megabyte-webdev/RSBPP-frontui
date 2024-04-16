import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/AuthContext";
import { MdAddBox, MdOutlineCalendarMonth, MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaVideo } from "react-icons/fa6";
import prof from "../assets/prof-img.png"
import student1 from "../assets/chats-img.png"
import student22 from "../assets/chats-sidebar.png"
import { Avatar, AvatarGroup } from "@mui/material";
import ReactCalendar from "../components/general/ReactCalendar";
import { FaBars } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

const TodayMeetings = () => {
    const { setSideBg } = useContext(ThemeContext);
    const { userCredentials } = useContext(UserContext);
    //   console.log(userCredentials);

    useEffect(() => {
        setSideBg("brown_sidebar");
    }, []);

    return (
        <div
            className="p-3 p-md-5"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
        >
            <Col md={10} className="d-flex mb-4 justify-content-between">
                <h6 className="my-4">Upcoming Courses  Meeting</h6>
                {/* <DashboardWidget /> */}
                <Link className="d-flex nav-link text-primary align-items-center">
                    <span>
                        <MdAddBox size={25} className="me-2" />
                    </span>
                    <p className="fs_sm">Invite Participant</p>
                </Link>
            </Col>
            <Row className="border border-primary p-2 rounded-3">
                <Col md={4} className="my-3 my-md-0">
                    <div className="border-end py-3 d-md-flex justify-content-center">
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
                    <div className="border-end py-3 d-md-flex justify-content-center">
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
                    <div className="border-end py-3 d-md-flex justify-content-center">
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
                            <Col md={4} className="my-3 my-md-0 fs_sm">
                                <div className="h-100 p-2 py-4 rounded border  border-primary">
                                    <div className="d-flex justify-conten-between">
                                        <div style={{ maxWidth: "20%" }}>
                                            <img src={student22} alt="" className="img-fluid" />
                                        </div>
                                        <div className="ps-3 roboto-regular">
                                            <p className="fw-semibold">Prof jame oli</p>
                                            <p className="ash_text">10 : 30 AM</p>
                                        </div>
                                    </div>
                                    <div className="fs_xsm mt-4 px-1">
                                        <p><b>Faculty of Business, Communication and Finance</b></p>
                                        <p>This course will equip participants with the process of crafting solutions, using creative</p>
                                        <div className="d-flex my-2 justify-content-between">
                                            <p className="text-primary">40 members going</p>
                                            <p className="prime_brown">2 pending</p>
                                        </div>
                                        <div>
                                            <AvatarGroup max={4}>
                                                <Avatar alt="Remy Sharp" src={prof} />
                                                <Avatar alt="Remy Sharp" src={prof} />
                                                <Avatar alt="Remy Sharp" src={student1} />
                                                <Avatar alt="Remy Sharp" src={student1} />
                                                <Avatar alt="Remy Sharp" src={student22} />
                                                <Avatar alt="Remy Sharp" src={student22} />
                                            </AvatarGroup>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary text-light w-100 rounded-3 mt-3 btn-sm">View details</button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} className="my-3 my-md-0 fs_sm">
                                <div className="h-100 p-2 py-4 rounded border  border-primary">
                                    <div className="d-flex justify-conten-between">
                                        <div style={{ maxWidth: "20%" }}>
                                            <img src={student1} alt="" className="img-fluid" />
                                        </div>
                                        <div className="ps-3 roboto-regular">
                                            <p className="fw-semibold">Prof jame oli</p>
                                            <p className="ash_text">10 : 30 AM</p>
                                        </div>
                                    </div>
                                    <div className="fs_xsm mt-4 px-1">
                                        <p><b>Faculty of Business, Communication and Finance</b></p>
                                        <p>This course will equip participants with the process of crafting solutions, using creative</p>
                                        <div className="d-flex my-2 justify-content-between">
                                            <p className="text-primary">40 members going</p>
                                            <p className="prime_brown">2 pending</p>
                                        </div>
                                        <div>
                                            <AvatarGroup max={4}>
                                                <Avatar alt="Remy Sharp" src={prof} />
                                                <Avatar alt="Remy Sharp" src={prof} />
                                                <Avatar alt="Remy Sharp" src={student1} />
                                                <Avatar alt="Remy Sharp" src={student1} />
                                                <Avatar alt="Remy Sharp" src={student22} />
                                                <Avatar alt="Remy Sharp" src={student22} />
                                            </AvatarGroup>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary text-light w-100 rounded-3 mt-3 btn-sm">View details</button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} className="my-3 my-md-0 fs_sm">
                                <div className="h-100 p-2 py-4 rounded border  border-primary">
                                    <div className="d-flex justify-conten-between">
                                        <div style={{ maxWidth: "20%" }}>
                                            <img src={prof} alt="" className="img-fluid" />
                                        </div>
                                        <div className="ps-3 roboto-regular">
                                            <p className="fw-semibold">Prof jame oli</p>
                                            <p className="ash_text">10 : 30 AM</p>
                                        </div>
                                    </div>
                                    <div className="fs_xsm mt-4 px-1">
                                        <p><b>Faculty of Business, Communication and Finance</b></p>
                                        <p>This course will equip participants with the process of crafting solutions, using creative</p>
                                        <div className="d-flex my-2 justify-content-between">
                                            <p className="text-primary">40 members going</p>
                                            <p className="prime_brown">2 pending</p>
                                        </div>
                                        <div>
                                            <AvatarGroup max={4}>
                                                <Avatar alt="Remy Sharp" src={prof} />
                                                <Avatar alt="Remy Sharp" src={prof} />
                                                <Avatar alt="Remy Sharp" src={student1} />
                                                <Avatar alt="Remy Sharp" src={student1} />
                                                <Avatar alt="Remy Sharp" src={student22} />
                                                <Avatar alt="Remy Sharp" src={student22} />
                                            </AvatarGroup>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary text-light w-100 rounded-3 mt-3 btn-sm">View details</button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
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
