import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/AuthContext'
import { ResourceContext } from '../../context/ResourceContext'
import { BASE_URL } from '../utils/base'
import { Spinner } from 'react-bootstrap'

const UpdateForm = () => {
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
                    <div className='mb-4'>
                        {/* <h4>Update Form</h4> */}
                    </div>

                    <div className="row">
                        <p className="fw-bold mb-4">Personal Information</p>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Name *' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Last Name *' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" className="form-select input_bg border-0">
                                    <option selected>Gender *</option>
                                    <option>1 Hour</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Date of Birth *' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Contact Number' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Email *' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Country' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='State' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Address' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <p className="fw-bold my-4">Professional Details</p>
                        <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" className="form-select input_bg border-0">
                                    <option selected>Faculty *</option>
                                    <option>1 Hour</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Position/Title' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" className="form-select input_bg border-0">
                                    <option selected>Years of Experience</option>
                                    <option>1 Hour</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" className="form-select input_bg border-0">
                                    <option selected>Specialization</option>
                                    <option>1 Hour</option>
                                </select>
                            </div>
                        </div>
                        <p className="fw-bold my-4">Academic Qualifications</p>
                        <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" className="form-select input_bg border-0">
                                    <option selected>Highest Degree Obtainned</option>
                                    <option>1 Hour</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='University/Institution' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Year of Graduation' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Courses Taught' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Research Interest' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " placeholder='Publications' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="form-floating mt-3">
                            <textarea className="form-control border-0 input_bg" placeholder="Leave a comment here" id="description" style={{ height: "150px" }}></textarea>
                            {/* <label htmlFor="description">Description</label> */}
                        </div>
                    </div>

                </div>
                <div className='mt-5'>
                    {errorMsg && (<p className="text-danger text-center my-3">{errorMsg} erro</p>)}
                    <div className="my-3 d-flex justify-content-center">
                        <div className="fw-semibold col-6">
                            {/* <button className='btn fw-semibold normal_btn Fborder-primary outline-primary me-3 text-primary'>Cancel</button> */}
                            <button className='btn w-100 fw-semibold normal_btn brown_bg btn-lg text-white'>Save {loading && (<Spinner size='sm' />)} </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateForm