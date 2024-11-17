import React, { useContext, useEffect, useState } from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

import instructorPics from "../../assets/participant.png"
import img from "../../assets/user-icon.png"
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { UserContext } from '../../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../utils/base';


const ParticipantRow = ({ course, count, setCount }) => {
    const { userCredentials } = useContext(UserContext);
    const [check, setcheck] = useState(false)

    const [data, setData] = useState(null)

    const [message, setMessage] = useState()
    const [loader, setLoader] = useState(false)

    const getEnrolledByCourseId = (id, setState) => {
        // setGetAllCarts((prev) => {
        //   return {
        //     ...prev, isDataNeeded: false
        //   }
        // })
        setLoader(true)
        axios.get(`${BASE_URL}enroll/getEnrollByCourceId/${id}`, {
            headers: {
                'Authorization': `Bearer ${userCredentials.token}`,
            },
        })
            .then(response => {
                // console.log(response.data)
                if (response.data.message) {
                    setMessage(response.data.message)
                } else {
                    setState(response.data.enrolled_users)
                    // setGetAllCarts((prev) => {
                    //   return {
                    //     ...prev, isDataNeeded: true
                    //   }
                    // })
                }
                setLoader(false)
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage(error.message);
                }
                setLoader(false)
            });
    };

    useEffect(() => {
        getEnrolledByCourseId(course.id, setData)
    }, [])

    // console.log(count)
    console.log(data)
    const list = data?.map((student) => (
        <tr key={student.enrollId}
            // onClick={() => navigate("/meetings_history/details")}
            className='fs_sm'>
            {/* <CourseViewer
user={user}
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    data={data}
    faculty={faculty}
    handleDisplay={handleDisplay} /> */}
            <td>
                <div className="d-flex align-items-center">
                    <div className='text-secondary'>
                        {check ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                    </div>
                    <div className="d-flex ms-2">
                        <div>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32"><path fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5" /><path fill="currentColor" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.9 13.9 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3q.418.457.87.87q.14.124.28.242q.48.415.99.782c.044.03.084.069.128.1v-.012a13.9 13.9 0 0 0 16 0v.012c.044-.031.083-.07.128-.1q.51-.368.99-.782q.14-.119.28-.242q.451-.413.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0" /></svg>
                            </span>
                        </div>
                        <div className='ms-2'>
                            <p className="fs_sm fw-semibold">{student.first_name} {student.last_name} </p>
                            <p className="fs_sm ">{course.title} (Faculty ofBusiness )</p>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                {course.title}
            </td>
            <td><span>{student.email}</span></td>
            {/* <td><span>Jun 1, 2024 4:52 PM</span></td> */}
            <td><span>-</span></td>
            <td>
                <div className='d-flex align-items-center'>
                    {/* <div>
                        <Avatar alt="Remy Sharp" src={img} />
                    </div> */}
                    <span className='ms-1'> <MdOutlineRadioButtonUnchecked />
                    </span>
                </div>
            </td>
        </tr >
    ))

    const handleCheck = () => (setcheck(value => !value))
    return (
        <>
            {list}
        </>
    )
}

export default ParticipantRow