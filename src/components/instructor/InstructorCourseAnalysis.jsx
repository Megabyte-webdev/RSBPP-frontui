import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../utils/base';
import axios from 'axios';
import { UserContext } from '../../context/AuthContext';
import RoundChart from '../general/RoundChart';

const InstructorCourseAnalysis = ({ course }) => {
    const { userCredentials } = useContext(UserContext);
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState(null);
    const [message, setMessage] = useState(null);

    const strokeProps = {
        strokeCap: "round",
        strokeColor: "#0052B4",
        strokeSize: "50%",
        strokeHeight: "100px",
        strokeLabel: "32%"
    }

    const getEnrolledByCourseId = (id, setState) => {
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

    return (
        <div className="light_sky hover_effect my-2 rounded p-1">
            <div className="d-flex justify-content-between">
                <div className="fs_xsm">
                    <p><b>{course.title}</b></p>
                     { loader && <p>Loading...</p>}
                    {data?.length && (
                        <p className="ash_text">{data?.length ? data.length : "None"} Registered</p>
                    )}
                    {/* {!data?.length && (
                        <p className="ash_text">None Registered</p>
                    )} */}
                </div>
                <div className="">
                    <RoundChart strokeProps={strokeProps} />
                </div>
            </div>
        </div>
    )
}

export default InstructorCourseAnalysis