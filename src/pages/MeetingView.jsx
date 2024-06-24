import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import THead from '../components/general/THead'
import { Avatar } from '@mui/material'
import img from "../assets/participant.png"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import { UserContext } from "../context/AuthContext"
import { BASE_URL } from '../components/utils/base'
import Loading from '../components/loader/Loading'


const MeetingView = () => {
    const { userCredentials } = useContext(UserContext);
    const [data, setData] = useState(null)
    const [message, setMessage] = useState()
    const [loader, setLoader] = useState(false)
    const { state } = useLocation()
    const navigate = useNavigate()
    console.log(state)

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
                console.log(response.data)
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
        getEnrolledByCourseId(state.list.course_id, setData)
    }, [])
    return (
        <div>
            <div
                className="p-3 p-md-5 min-vh-100"
                style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
            >
                {state.oneCourse ? (
                    <div>
                        <p>View Meetings</p>
                        <Row>
                            <Col md={4}>
                                <div className="p-3 h-100 bg-white">
                                    <small>Title</small>
                                    <p className='fw-semibold'>{state.oneCourse?.title}</p>
                                </div>
                            </Col>
                            <Col md={8}>
                                <div className="rounded h-100 pt-3 bg-white shadow-sm">
                                    <div className="mt-4 table-responsive-md">
                                        <table className="table roboto table-hover">
                                            <thead>
                                                <tr>
                                                    <THead name="Participants" />
                                                    <THead name="Mail" />
                                                    <THead name="Meeting Code" />
                                                    <THead name="Started at" />
                                                    {/* <THead name="Ended at" />
                                            <THead name="Participants" /> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.map((enroll) => (
                                                    <tr key={enroll.enrollId}>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div>
                                                                    <Avatar alt="Remy Sharp" src={img} />
                                                                </div>
                                                                <p className="ms-3">{enroll?.first_name} {enroll?.last_name} </p>
                                                            </div>
                                                        </td>
                                                        <td>{enroll?.email}</td>
                                                        <td>{state.list.meeting_code}</td>
                                                        <td></td>
                                                    </tr>
                                                ))}
                                                {message && <p className='text-center fs-4'>{message}</p>}
                                                {loader && (<Loading />)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ) :
                    <p className='fs-4 fw-semibold'>No data <Link to={"/meetings_history"}>Back</Link> </p>
                }
            </div>
        </div>
    )
}

export default MeetingView