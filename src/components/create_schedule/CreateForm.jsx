import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/AuthContext'
import { ResourceContext } from '../../context/ResourceContext'
import { BASE_URL } from '../utils/base'
import { Spinner } from 'react-bootstrap'

const CreateForm = () => {
    const { userCredentials } = useContext(UserContext)
    const {
        getAllCourses,
        setGetAllCourses,
        getAllUsers,
        setGetAllUsers } = useContext(ResourceContext)

    const [errorMsg, setErrorMsg] = useState(null)
    const [showMsg, setShowMsg] = useState(false)
    const [loading, setLoading] = useState(false)

    const [details, setDetails] = useState({
        day: "",
        start_time: "",
        end_time: "",
        instructor_id: "",
        course_id: "",
    })

    useEffect(() => {
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetAllUsers((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    const handleOnChange = (e) => {
        const { value, name, type, checked } = e.target
        setDetails((prev) => {
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value
            };
        });
        setErrorMsg(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(null)
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        setLoading(true)
        axios.post(`${BASE_URL}schedule/addSchedule`, details, {
            headers: {
                Authorization: `Bearer ${userCredentials.token}`,
            },
        })
            .then((response) => {
                // console.log(response)
                setGetAllCourses((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                resetStates()
                setLoading(false)
                toast.success("successful");
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    if (error.response.data.message.course_id) {
                        setErrorMsg(error.response.data.message.course_id)
                    } else if (error.response.data.message.instructor_id) {
                        setErrorMsg(error.response.data.message.instructor_id)
                    } else if (error.response.data.message.start_time) {
                        setErrorMsg(error.response.data.message.start_time)
                    } else {
                        setErrorMsg(error.response.data.message.end_time_time)
                    }
                    setShowMsg(true)
                    setLoading(false);
                } else {
                    console.log(error)
                    setErrorMsg(error.message)
                    setShowMsg(true)
                    setLoading(false);
                }
            });
    }


    const resetStates = () => {
        setDetails({
            day: "",
            start_time: "",
            end_time: "",
            instructor_id: "",
            course_id: "",
        })
    }
    const allInstructors = getAllUsers.data?.filter((user) => user.role === "instructor")
    // console.log(details)

    return (
        <div className='p-3 py-5'>
            <form onSubmit={handleSubmit} >
                <div className='bg-white rounded-3 shadow p-3 py-5'>
                    <div>
                        <h4>Choose RSBPP Faculty</h4>
                    </div>
                    <div className="form-floating mb-3">
                        <select
                            value={details.course_id}
                            name="course_id"
                            onChange={handleOnChange}
                            className="form-select" id="course_id" aria-label="Floating label select example">
                            <option value="">...</option>
                            {getAllCourses.data?.map((user) => (
                                <option key={user.id} value={user.id}>{user.title}</option>
                            ))}
                        </select>
                        <label htmlFor="course_id"> select Course</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select
                            value={details.instructor_id}
                            name="instructor_id"
                            onChange={handleOnChange}
                            className="form-select" id="instructor" aria-label="Floating label select example">
                            <option value="">...</option>
                            {allInstructors?.map((user) => (
                                <option key={user.id} value={user.id}>{user.first_name} ({user.email})</option>
                            ))}
                        </select>
                        <label htmlFor="instructor"> select Instructor</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="date"
                            value={details.day}
                            name="day"
                            onChange={handleOnChange}
                            className="form-control" id="day" placeholder="name@example.com" />
                        <label htmlFor="day">Day</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="time"
                            value={details.start_time}
                            name="start_time"
                            onChange={handleOnChange}
                            className="form-control" id="start_time" placeholder="name@example.com" />
                        <label htmlFor="start_time">Start Time</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="time"
                            value={details.end_time}
                            name="end_time"
                            onChange={handleOnChange}
                            className="form-control" id="end_time" placeholder="name@example.com" />
                        <label htmlFor="end_time">End Time</label>
                    </div>
                    {/* <div className="form-floating mb-3">
                        <select className="form-select" id="program" aria-label="Floating label select example">
                            <option selected>...</option>
                            <option value="1">MANAGEMENT PROGRAMMES</option>
                            <option value="2">Business class</option>
                            <option value="3">Economic class</option>
                        </select>
                        <label htmlFor="program">Select a programme from faculty</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="program" aria-label="Floating label select example">
                            <option selected>...</option>
                            <option value="1">Design Thinking & Innovation</option>
                            <option value="2">Strategy Execution</option>
                            <option value="3">Women in Leadership</option>
                            <option value="3">Negotiation Dynamics</option>
                        </select>
                        <label htmlFor="program">Select Chapters</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="subTitles" aria-label="Floating label select example">
                            <option selected>...</option>
                            <option value="1">Read & Write</option>
                            <option value="2">Display birthdays</option>
                            <option value="3">anniversaries</option>
                            <option value="3">Others</option>
                        </select>
                        <label htmlFor="subTitles">Select Sub Titles</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="subTitles" aria-label="Floating label select example">
                            <option selected>...</option>
                            <option value="1">Read only - To track team availability</option>
                        </select>
                        <label htmlFor="subTitles">Select Class Type</label>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="description" style={{ height: "150px" }}></textarea>
                        <label htmlFor="description">Description</label>
                    </div> */}
                </div>
                {/* <div className="my-4">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <label htmlFor="dateAndTime" className="col-5 col-form-label">Date and time *</label>
                                <div className="col-7">
                                    <input type="datetime-local" className="form-control" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <label htmlFor="endTime" className="col-5 col-form-label">To</label>
                                <div className="col-7">
                                    <input type="datetime-local" className="form-control" id="endTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <label htmlFor="setDuration" className="col-5 col-form-label">Set Duration</label>
                                <div className="col-7">
                                    <select id="setDuration" className="form-select">
                                        <option selected>Choose...</option>
                                        <option>1 Hour</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {errorMsg && (<p className="text-danger text-center my-3">{errorMsg}</p>)}
                <div className="my-3 d-flex justify-content-center">
                    <div className="fw-semibold col-6">
                        {/* <button className='btn fw-semibold normal_btn Fborder-primary outline-primary me-3 text-primary'>Cancel</button> */}
                        <button className='btn w-100 fw-semibold normal_btn btn-primary text-white'>Save {loading && (<Spinner size='sm' />)} </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateForm