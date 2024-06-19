import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import THead from '../components/general/THead'
import { Avatar } from '@mui/material'
import img from "../assets/participant.png"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import { UserContext } from "../context/AuthContext"
import { BASE_URL } from '../components/utils/base'


const MeetingView = () => {
    const { userCredentials } = useContext(UserContext)
    const { state } = useLocation()
    const navigate = useNavigate()
    console.log(state)

    const getEnrolledByCourseId = (id, setState) => {
        // setGetAllCarts((prev) => {
        //   return {
        //     ...prev, isDataNeeded: false
        //   }
        // })
        axios.get(`${BASE_URL}enroll/getEnrollByCourceId/${id}`, {
          headers: {
            'Authorization': `Bearer ${userCredentials.token}`,
          },
        })
          .then(response => {
            // console.log(response.data.schedule)
            setState(response.data.schedule)
            // setGetAllCarts((prev) => {
            //   return {
            //     ...prev, isDataNeeded: true
            //   }
            // })
          })
          .catch((error) => {
            console.log(error);
            if (error.response) {
              console.log(error.response.data.message);
            } else {
              console.log(error.message);
            }
          });
      };

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
                                                    <THead name="Type" />
                                                    <THead name="Meeting Code" />
                                                    <THead name="Started at" />
                                                    {/* <THead name="Ended at" />
                                            <THead name="Participants" /> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <Avatar alt="Remy Sharp" src={img} />
                                                            </div>
                                                            <p className="ms-3">Benson Aliman </p>
                                                        </div>
                                                    </td>
                                                    <td>720 KB</td>
                                                    <td>{state.list.meeting_code}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <Avatar alt="Remy Sharp" src={img} />
                                                            </div>
                                                            <p className="ms-3">Benson Aliman </p>
                                                        </div>
                                                    </td>
                                                    <td>720 KB</td>
                                                    <td>{state.list.meeting_code}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <Avatar alt="Remy Sharp" src={img} />
                                                            </div>
                                                            <p className="ms-3">Benson Aliman </p>
                                                        </div>
                                                    </td>
                                                    <td>720 KB</td>
                                                    <td>{state.list.meeting_code}</td>
                                                    <td></td>
                                                </tr>
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