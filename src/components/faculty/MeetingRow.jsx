import React, { useState } from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

import instructorPics from "../../assets/user-icon.png"
import ImageGroup from './ImageGroup';
import { useNavigate } from 'react-router-dom';
import UpdateScheduleForm from '../create_schedule/UpdateScheduleForm';
import { IMAGE_URL } from '../utils/base';

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
                    <div className="flex ms-2 items-center">
                        <div>
                            {userData.image ? 
                            <img src={`${IMAGE_URL}{userData.image}`} alt="" className="w-10 h-10" />
                            :<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32"><path fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5" /><path fill="currentColor" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.9 13.9 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3q.418.457.87.87q.14.124.28.242q.48.415.99.782c.044.03.084.069.128.1v-.012a13.9 13.9 0 0 0 16 0v.012c.044-.031.083-.07.128-.1q.51-.368.99-.782q.14-.119.28-.242q.451-.413.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0" /></svg>
                        }
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
                    onClick={() => navigate("/video_call", { state: { oneCourse: oneCourse, list: list } })}
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