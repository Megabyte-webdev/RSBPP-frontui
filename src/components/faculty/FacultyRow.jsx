import React, { useEffect, useState } from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

import instructorPics from "../../assets/participant.png"
import img from "../../assets/user-icon.png"
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { BASE_URL } from '../utils/base';
import axios from 'axios';

const FacultyRow = ({ course, faculty, instructor, token }) => {
    const navigate = useNavigate()
    const [check, setcheck] = useState(false)
    const [data, setData] = useState(null)

    const [message, setMessage] = useState()
    const [loader, setLoader] = useState(false)

    const handleCheck = () => (setcheck(value => !value))
    const oneFaculty = faculty?.find((one) => one.id === course.faculty_id)
const date = new Date(course?.created_at).toDateString()

    const getEnrolledByCourseId = (id, setState) => {
        // setGetAllCarts((prev) => {
        //   return {
        //     ...prev, isDataNeeded: false
        //   }
        // })
        setLoader(true)
        axios.get(`${BASE_URL}enroll/getEnrollByCourceId/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
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
    // console.log(instructor)
    return (
        <tr
            className='fs_sm'>
            <td>
                <div className="d-flex align-items-center">
                    <div className='text-secondary'>
                        {check ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                    </div>
                    <div className="d-flex ms-2">
                        {/* <div>
                            <img src={instructorPics} alt="" className="img-fluid" />
                        </div> */}
                        <div className='ms-2'>
                            <p className="fs_sm fw-semibold">{instructor?.title} {instructor?.first_name} {instructor?.last_name} </p>
                            <p className="fs_sm ">{oneFaculty?.title}</p>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                {course.course_type}
            </td>
            <td><span>{course.title}</span></td>
            <td><span>{data?.length ? data.length : "0"} Participants</span></td>
            <td><span>{date}</span></td>
            {/* <td>
                <div className='d-flex align-items-center'>
                    <span className='ms-1'> <MdOutlineRadioButtonUnchecked />
                    </span>
                </div>
            </td> */}
        </tr >
    )
}

export default FacultyRow