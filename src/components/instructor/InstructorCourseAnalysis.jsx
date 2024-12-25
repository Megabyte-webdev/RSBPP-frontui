import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../utils/base';
import axios from 'axios';
import { UserContext } from '../../context/AuthContext';
import RoundChart from '../general/RoundChart';

const InstructorCourseAnalysis = ({ course }) => {
    const { userCredentials } = useContext(UserContext);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);

    const strokeProps = {
        strokeCap: "round",
        strokeColor: "#0052B4",
        strokeSize: "50%",
        strokeHeight: "100px",
        strokeLabel: `${data?.length}%`
    };

    const getEnrolledByCourseId = (id, setState) => {
        setLoader(true);
        axios.get(`${BASE_URL}enroll/getEnrollByCourceId/${id}`, {
            headers: {
                'Authorization': `Bearer ${userCredentials.token}`,
            },
        })
            .then(response => {
                if (response.data.message) {
                    setMessage(response.data.message);
                } else {
                    setState(response.data.enrolled_users);
                }
                setLoader(false);
            })
            .catch((error) => {
                if (error.response) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage(error.message);
                }
                setLoader(false);
            });
    };

    useEffect(() => {
        getEnrolledByCourseId(course.id, setData);
    }, []);

    return (
        <div className="course-overview-card light_sky hover_effect my-2 rounded p-3">
            <div className="course-overview-header d-flex flex-col justify-content-between align-items-center">
                <div className="course-details">
                    <h6 className="course-title mb-1"><b>{course.title}</b></h6>
                    {loader && <p className="loading-text mb-0">Loading...</p>}
                    {data?.length ? (
                        <p className="registrants ash_text mb-0">{data.length} Registered</p>
                    ) : (
                        <p className="registrants ash_text mb-0">None Registered</p>
                    )}
                </div>
                <div className="chart-container">
                    <RoundChart strokeProps={strokeProps} />
                </div>
            </div>
        </div>
    );
};

export default InstructorCourseAnalysis;
