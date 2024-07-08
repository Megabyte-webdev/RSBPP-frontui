import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../utils/base';
import axios from 'axios';
import { UserContext } from '../../context/AuthContext';

const MarkAttendance = ({ state }) => {
    const { userCredentials } = useContext(UserContext)
    const [message, setMessage] = useState("")
    const [isSendAttendance, setIsSendAttendance] = useState("")
    const [details, setDetails] = useState({
        user_id: userCredentials.user.id,
        course_id: state.course_id,
        meeting_code: state.meeting_code
    })
    

    // console.log(details)

    const handleMarkAttendance = (setState) => {
        axios.post(`${BASE_URL}attendance/addAttendance`, details, {
            headers: {
                'Authorization': `Bearer ${userCredentials.token}`,
            },
        })
            .then(response => {
                console.log(response.data)
                if (response.data.message) {
                    setMessage(response.data.message)
                } else {
                    setState(response.data.enrolled_users)
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage(error.message);
                }
            });
    };

    useEffect(() => {
        handleMarkAttendance(setIsSendAttendance)
    }, [])
    return (
        <div>MarkAttendance</div>
    )
}

export default MarkAttendance