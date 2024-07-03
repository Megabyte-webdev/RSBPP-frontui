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
                            <img src={instructorPics} alt="" className="img-fluid" />
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
                    <div>
                        <Avatar alt="Remy Sharp" src={img} />
                    </div>
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