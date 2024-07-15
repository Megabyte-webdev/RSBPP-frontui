import React, { useState } from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

import instructorPics from "../../assets/participant.png"
import ImageGroup from './ImageGroup';
import { useNavigate } from 'react-router-dom';
import UpdateScheduleForm from '../create_schedule/UpdateScheduleForm';

const MeetingRow = ({ list, userData, oneCourse }) => {
    const navigate = useNavigate()
    const [check, setcheck] = useState(false)
    const start = new Date(`${list.day}T${list.start_time}`);
    const end = new Date(`${list.day}T${list.end_time}`);
    // console.log(start.getTime())
    // const startDate = 
    const handleCheck = () => (setcheck(value => !value))
    // console.log(oneCourse)

    return (
        <tr
            className='fs_sm'>
            <td>
                <div className="d-flex align-items-center">
                    <div className='text-secondary'>
                        {check ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                    </div>
                    <div className="d-flex ms-2">
                        <div>
                            <img src={instructorPics} alt="" className="img-fluid" />
                        </div>
                        <div className='ms-2'>
                            <p className="fs_sm fw-semibold">{userData?.title} {userData?.first_name} {userData?.last_name}</p>
                            <p className="fs_sm ">{oneCourse?.title}</p>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <button
                    onClick={() => navigate("/video_live", { state: { oneCourse: oneCourse, list: list } })}
                    className="btn btn-danger text-nowrap rounded-pill fs_xsm"> Live class</button>
            </td>
            <td><span>{list.meeting_code}</span></td>
            <td><span>{start.toLocaleTimeString()} <br /> {start.toDateString()}</span></td>
            <td><span>{end.toLocaleTimeString()}</span></td>
            <td>
                <button
                    onClick={() => navigate(`/meetings_history/${oneCourse ? oneCourse.title : "no_data"}`, { state: { oneCourse: oneCourse, list: list } })}
                    className='btn btn-success'>View</button>
            </td>
            <td>
                <UpdateScheduleForm list={list} />
            </td>
        </tr >
    )
}

export default MeetingRow