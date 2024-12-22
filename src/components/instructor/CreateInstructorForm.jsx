import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/AuthContext'
import { ResourceContext } from '../../context/ResourceContext'
import { BASE_URL } from '../utils/base'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CreateInstructorForm = () => {
    const navigate =useNavigate();
    const { userCredentials } = useContext(UserContext)
    const {
        getAllCourses,
        getAllFaculty,
        setGetAllFaculty,
        setGetAllCourses,
        getAllUsers,
        setGetAllUsers } = useContext(ResourceContext)

    const [errorMsg, setErrorMsg] = useState(null)
    const [showMsg, setShowMsg] = useState(false)
    const [loading, setLoading] = useState(false)

    const [details, setDetails] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        email: "",
        faculty_id: "",
        role: "instructor",
        contact_address: "",
        contact_number: "",
        date_of_birth: "",
        country: "",
        state: "",
        experience: "",
        specialization: "",
        highest_degree: "",
        year_of_graduation: "",
        course_taught: "",
        research_interest: "",
        publication: "",
        position: "",
        bio: "",
        institution: "",
        password: "",
        organization: "",
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

    useEffect(() => {
        setGetAllFaculty((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])
    console.log(getAllFaculty.data)
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
        axios.post(`${BASE_URL}NewUser`, details, {
            headers: {
                Authorization: `Bearer ${userCredentials.token}`,
            },
        })
            .then((response) => {
                // console.log(response)
                localStorage.setItem("instructorEmail", details.email);
                setGetAllCourses((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                resetStates()
                setLoading(false)
                navigate("verify_email")
                toast.success("successful");
            })
            .catch((error) => {
                // console.log(error.response.data.message)
                // setErrorMsg(error.response.data.message)
                if (error.response) {
                    console.log(error.response.data.message)
                    setErrorMsg(error.response.data.message)
                    // if (error.response.data.message.course_id) {
                    //     setErrorMsg(error.response.data.message.course_id)
                    // } else if (error.response.data.message.instructor_id) {
                    //     setErrorMsg(error.response.data.message.instructor_id)
                    // } else if (error.response.data.message.start_time) {
                    //     setErrorMsg(error.response.data.message.start_time)
                    // } else {
                    //     setErrorMsg(error.response.data.message.end_time_time)
                    // }
                    setShowMsg(true)
                    setLoading(false);
                } else {
                    console.log(error.message)
                    setErrorMsg(error.message)
                    setShowMsg(true)
                    setLoading(false);
                }
            });
    }

    // console.log(errorMsg)
    const resetStates = () => {
        setDetails({
            first_name: "",
            last_name: "",
            gender: "",
            email: "",
            faculty_id: "",
            role: "instructor",
            contact_address: "",
            contact_number: "",
            date_of_birth: "",
            country: "",
            state: "",
            experience: "",
            specialization: "",
            highest_degree: "",
            year_of_graduation: "",
            course_taught: "",
            research_interest: "",
            publication: "",
            position: "",
            bio: "",
            institution: "",
            password: "",
            organization: "",
        })
    }
    const allInstructors = getAllUsers.data?.filter((user) => user.role === "instructor")
    console.log(details)

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
                                    <input type="text" onChange={handleOnChange} value={details.first_name} name='first_name' placeholder='First Name *' required className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.last_name} name='last_name' placeholder='Last Name *' required className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" onChange={handleOnChange} value={details.gender} name='gender' className="form-select input_bg border-0">
                                    <option defaultValue={""} value={""}>Gender *</option>
                                    <option value={"male"}>Male</option>
                                    <option value={"female"}>Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="my-3 row">
                                <div className="">
                                    <input type="date" onChange={handleOnChange} value={details?.date_of_birth} name='date_of_birth' placeholder="Date of Birth *" className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.contact_number} name='contact_number' placeholder='Contact Number' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.email} name='email' placeholder='Email *' required className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.country} name='country' placeholder='Country' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.state} name='state' placeholder='State' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.contact_address} name='contact_address' placeholder='Address' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.password} name='password' placeholder='Password *' required className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.position} name='position' placeholder='Position *' required className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.organization} name='organization' placeholder='Organization *' required className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <p className="fw-bold my-4">Professional Details</p>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <select id="setDuration" onChange={handleOnChange} value={details.faculty_id} name='faculty_id' className="form-select input_bg border-0">
                                    <option defaultValue={""}>-- Faculty -- *</option>
                                    {
                                        getAllFaculty.data?.map((faculty) => (
                                            <option key={faculty.id} value={faculty.id}>{faculty.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        {/* <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" onChange={handleOnChange} value={details.experience} name='experience' className="form-select input_bg border-0">
                                    <option defaultValue={""}>--Years of Experience--</option>
                                    <option value={'one_year'}>1 year</option>
                                    <option value={'below_5years'}>Beloww 5 years</option>
                                    <option value={'above_5years'}>Above 5 years</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" onChange={handleOnChange} value={details.specialization} name='specialization' className="form-select input_bg border-0">
                                    <option defaultValue={""}>Specialization</option>
                                    <option value={"1"}>1 Hour</option>
                                    <option value={"1"}>1 Hour</option>
                                    <option value={"1"}>1 Hour</option>
                                </select>
                            </div>
                        </div>
                        <p className="fw-bold my-4">Academic Qualifications</p>
                        <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" onChange={handleOnChange} value={details.highest_degree} name='highest_degree' className="form-select input_bg border-0">
                                    <option defaultValue={""}>Highest Degree Obtainned</option>
                                    <option>1 Hour</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.institution} name='institution' placeholder='University/Institution' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.year_of_graduation} name='year_of_graduation' placeholder='Year of Graduation' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.course_taught} name='course_taught' placeholder='Courses Taught' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.research_interest} name='research_interest' placeholder='Research Interest' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.publication} name='publication' placeholder='Publications' className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <label htmlFor="description">About you...</label>
                        <div className="form-floating mt-3">
                            <textarea className="form-control  border-0 input_bg" onChange={handleOnChange} value={details.bio} name='bio' placeholder="About you here" id="description" style={{ height: "150px" }}></textarea>
                        </div> */}
                    </div>

                </div>
                <div className='mt-5'>
                    {errorMsg && (<p className="text-danger text-center my-3">{errorMsg} </p>)}
                    <div className="my-3 d-flex justify-content-center">
                        <div className="fw-semibold col-6">
                            {/* <button className='btn fw-semibold normal_btn Fborder-primary outline-primary me-3 text-primary'>Cancel</button> */}
                            <button className='btn w-100 hover_effect fw-semibold normal_btn brown_bg btn-lg text-white'>Submit {loading && (<Spinner size='sm' />)} </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateInstructorForm
