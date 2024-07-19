import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MdOutlineCalendarMonth, MdOutlineCancel } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const FacultyScheduleStats = ({ allSchedules }) => {
    const navigate = useNavigate()

        const currentMonth = moment().month();
        const currentYear = moment().year();

        const filtered = allSchedules?.filter((meeting) => {
            const startDate = moment(meeting.day);
 
            return (
                startDate.month() === currentMonth &&
                startDate.year() === currentYear
            )
        });

    return (
        <Row className="blue_border_color border b-5 p-2 rounded-3">
            <Col md={4} className="my-3 my-md-0">
                <div onClick={() => navigate("/meetings_history")} className="border-end py-3 hover_effect pointer d-md-flex justify-content-center">
                    <div className="d-flex align-items-center" >
                        <div style={{ color: "#D1D0D0", marginRight: "1rem" }}>
                            <span>
                                <FaVideo size={30} />
                            </span>
                        </div>
                        <div>
                            <p>UPCOMING MEETINGS</p>
                            <p><b>{filtered?.length}</b> <span className="fs_xsm">This Month</span></p>
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={4} className="my-3 my-md-0">
                <div className="border-end py-3 hover_effect pointer d-md-flex justify-content-center">
                    <div className="d-flex align-items-center" >
                        <div style={{ color: "#D1D0D0", marginRight: "1rem" }}>
                            <span>
                                <MdOutlineCalendarMonth size={30} />
                            </span>
                        </div>
                        <div>
                            <p>ATTENDED MEETINGS</p>
                            <p><b>0</b> <span className="fs_xsm">This Month</span></p>
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={4} className="my-3 my-md-0">
                <div className="border-end py-3 hover_effect pointer d-md-flex justify-content-center">
                    <div className="d-flex align-items-center" >
                        <div style={{ color: "#D1D0D0", marginRight: "1rem" }}>
                            <span>
                                <MdOutlineCancel size={30} />
                            </span>
                        </div>
                        <div>
                            <p>Cancelled meetings </p>
                            <p><b>0</b> <span className="fs_xsm">This Month</span></p>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default FacultyScheduleStats;