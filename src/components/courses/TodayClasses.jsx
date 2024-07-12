import { Avatar, AvatarGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import prof from "../../assets/prof-img.png"
import student1 from "../../assets/chats-img.png"
import student22 from "../../assets/chats-sidebar.png"
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const TodayClasses = ({ schedule, instructorDetails }) => {
    const { title, first_name, degree } = instructorDetails ? instructorDetails : {};
    const targetDate = new Date(`${schedule.day}T${schedule.start_time}`); // Adjust target date/time
    const navigate = useNavigate()
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(targetDate));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(calculateRemainingTime(targetDate));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [targetDate]);

    function calculateRemainingTime(target) {
        const now = new Date();
        const difference = target - now;
        if (difference <= 0) {

            // Handle case where live class has already started (optional)
            return { hours: 0, minutes: 0, seconds: 0 };
        }
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)));
        return { hours, minutes, seconds };
    }
    const { hours, minutes, seconds } = remainingTime;

    return (
        <Col md={4} className="my-3 my-md-0 fs_sm">
            <div className="h-100 p-2 py-4 rounded border  border_brown">
                <div className="d-flex justify-conten-between">

                    <div style={{ maxWidth: "20%" }}>
                        <img src={student22} alt="" className="img-fluid" />
                    </div>
                    <div className="ps-3 roboto-regular">
                        <p className="fw-semibold">{title} {first_name} ({degree}) </p>
                        <p className="ash_text">Countdown</p>
                        <p className="ash_text">{hours} : {minutes} :  {seconds} </p>
                    </div>
                </div>
                <div className="fs_xsm mt-4 px-1">
                    <p><b>{schedule.title}</b></p>
                    {/* <p>This course will equip participants with the process of crafting solutions, using creative</p> */}
                    {/* <div className="d-flex my-2 justify-content-between">
                        <p className="prime_brown fw-semibold">40 members going</p>
                        <p className="prime_brown">2 pending</p>
                    </div> */}
                    {/* <div>
                        <AvatarGroup max={4}>
                            <Avatar alt="Remy Sharp" src={prof} />
                            <Avatar alt="Remy Sharp" src={prof} />
                            <Avatar alt="Remy Sharp" src={student1} />
                            <Avatar alt="Remy Sharp" src={student1} />
                            <Avatar alt="Remy Sharp" src={student22} />
                            <Avatar alt="Remy Sharp" src={student22} />
                        </AvatarGroup>
                    </div> */}
                    <div>
                        <button
                            onClick={() => navigate("/video_live", { state: { list: schedule } })}
                            className="btn brown_bg hover_effect text-light w-100 rounded-3 mt-3 btn-sm">View details</button>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default TodayClasses