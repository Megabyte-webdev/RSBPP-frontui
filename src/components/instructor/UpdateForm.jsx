import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/AuthContext'
import { ResourceContext } from '../../context/ResourceContext'
import { BASE_URL } from '../utils/base'
import { Spinner } from 'react-bootstrap'
import { CiCircleCheck } from 'react-icons/ci'

const UpdateForm = ({ setProfileCV, profileCV }) => {
    const { userCredentials } = useContext(UserContext)
    const {
        getAllCourses,
        getAllInstructors,
        setGetAllInstructors,
        getAllFaculty,
        setGetAllFaculty,
        setGetAllCourses,
        getAllUsers,
        setGetAllUsers } = useContext(ResourceContext)

    const [errorMsg, setErrorMsg] = useState(null)
    const [showMsg, setShowMsg] = useState(false)
    const [loading, setLoading] = useState(false)
    const user = userCredentials?.user

    
    useEffect(() => {
        setGetAllInstructors((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])


    const instructor  = getAllInstructors?.data?.find(one => one.user_id === user.id)

    const [details, setDetails] = useState({
        // user_id: user?.id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        faculty_id: user?.faculty_id,
        role: "instructor",
        gender: instructor?.gender ? instructor?.gender : "",
        contact_address: instructor?.contact_address ? instructor?.contact_address : "",
        contact_number: instructor?.contact_number ? instructor?.contact_number : "",
        date_of_birth: instructor?.date_of_birth ? instructor?.date_of_birth : "",
        country: instructor?.country ? instructor?.country : "",
        state: instructor?.state ? instructor?.state : "",
        experience: instructor?.experience ? instructor?.experience : "",
        specialization: instructor?.specialization ? instructor?.specialization : "",
        highest_degree: instructor?.highest_degree ? instructor?.highest_degree : "",
        year_of_graduation: instructor?.year_of_graduation ? instructor?.year_of_graduation : "",
        course_taught: instructor?.course_taught ? instructor?.course_taught : "",
        research_interest: instructor?.research_interest ? instructor?.research_interest : "",
        publication: instructor?.publication ? instructor?.publication : "",
        position: user?.position,
        cv: null,
        bio: instructor?.bio ? instructor?.bio : "",
        institution: instructor?.institution ? instructor?.institution : "",
        password: instructor?.password ? instructor?.password : "",
        organization: user?.organization
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
    // console.log(getAllFaculty.data)
    const handleOnChange = (e) => {
        const { value, name, files, type, checked } = e.target
        setDetails((prev) => {
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
                // [name]: name === 'cv' ? files[0] : value,
            };
        });
        if (name === "cv") {
            setProfileCV(files[0])
        }
        setErrorMsg(null);
    };

    const getImageURL = (e) => {
        const { name } = e.target;
        const file = e.target.files[0]; //filelist is an object carrying all details of file, .files[0] collects the value from key 0 (not array), and stores it in file

        // if (file && (file.type === 'docx' || file.type === 'pdf')) {
        setDetails({ ...details, [name]: file });
        // } else {
        //   // Handle invalid file type
        //   alert('Please select a valid Doc or Pdf file.');
        // }
    };
    console.log(instructor.publication);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(null)
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        setLoading(true)
        axios.post(`${BASE_URL}instructor/add`, details, {
            headers: {
                Authorization: `Bearer ${userCredentials.token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                // console.log(response)
                setGetAllCourses((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                // resetStates()
                setLoading(false)
                toast.success("successful");
            })
            .catch((error) => {
                console.log(error)
                // console.log(error.response.data.message)
                // setErrorMsg(error.response.data.message)
                if (error.response) {
                    // console.log(error.response)
                    // setErrorMsg(error.response.data.message)
                    if (error.response.data.message.email) {
                        setErrorMsg(error.response.data.message.email)
                        // } else if (error.response.data.message.instructor_id) {
                        //     setErrorMsg(error.response.data.message.instructor_id)
                        // } else if (error.response.data.message.start_time) {
                        //     setErrorMsg(error.response.data.message.start_time)
                    } else {
                        setErrorMsg(error.response.data.message.data.error)
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

    // console.log(errorMsg)
    // const resetStates = () => {
    //     setDetails({
    //         first_name: "",
    //         last_name: "",
    //         gender: "",
    //         email: "",
    //         faculty_id: "",
    //         role: "instructor",
    //         contact_address: "",
    //         contact_number: "",
    //         date_of_birth: "",
    //         country: "",
    //         state: "",
    //         experience: "",
    //         specialization: "",
    //         highest_degree: "",
    //         year_of_graduation: "",
    //         course_taught: "",
    //         research_interest: "",
    //         publication: "",
    //         position: "",
    //         bio: "",
    //         institution: "",
    //         password: "",
    //         organization: "",
    //     })
    // }
    const userFaculty = getAllFaculty.data?.find((faculty) => faculty.id == user?.faculty_id)
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
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.email} name='email' placeholder='Email *' required className="form-control border-0 input_bg" id="dateAndTime" />
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
                        <div className="col-md-6">
                            <div className="mb-3">
                                <select id="setDuration" onChange={handleOnChange} value={details.faculty_id} name='faculty_id' className="form-select input_bg border-0">
                                    <option defaultValue={userFaculty?.id}>{userFaculty?.title}</option>
                                    {/* {
                                        getAllFaculty.data?.map((faculty) => (
                                            <option key={faculty.id} value={faculty.id}>{faculty.title}</option>
                                        ))
                                    } */}
                                </select>
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
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="date" onChange={handleOnChange} value={details.date_of_birth} name='date_of_birth' placeholder='Date of Birth *' className="form-control border-0 input_bg" id="dateAndTime" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.contact_number} name='contact_number' placeholder='Contact Number' className="form-control border-0 input_bg" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.country} name='country' placeholder='Country' className="form-control border-0 input_bg" id="dateAndTime" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.state} name='state' placeholder='State' className="form-control border-0 input_bg" id="dateAndTime" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.contact_address} name='contact_address' placeholder='Address' className="form-control border-0 input_bg" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.password} name='password' placeholder='Password *' required className="form-control border-0 input_bg" />
                                </div>
                            </div>
                        </div>
                        <p className="fw-bold my-4">Professional Details</p>
                        <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" onChange={handleOnChange} value={details.experience} name='experience' className="form-select input_bg border-0">
                                    <option defaultValue={""}>--Years of Experience--</option>
                                    <option value={'one_year'}>1 year</option>
                                    <option value={'below_5years'}>Below 5 years</option>
                                    <option value={'above_5years'}>Above 5 years</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" onChange={handleOnChange} value={details.specialization} name='specialization' className="form-select input_bg border-0">
                                    <option defaultValue={""}>--Specialization--</option>
                                    <option value={"Accountant"}>Accountant</option>
                                    <option value={"Banking"}>Banking</option>
                                    <option value={"Entrepreneurship"}>Entrepreneurship</option>
                                </select>
                            </div>
                        </div>
                        <p className="fw-bold my-4">Academic Qualifications</p>
                        <div className="col-md-6">
                            <div className="">
                                <select id="setDuration" onChange={handleOnChange} value={details.highest_degree} name='highest_degree' className="form-select input_bg border-0">
                                    <option defaultValue={""}>Highest Degree Obtainned</option>
                                    <option value={"Doctorate"} >Doctorate (PhD)</option>
                                    <option value={"Masters"} >Masters (MSc)</option>
                                    <option value={"Degree"} >Degree (BSc)</option>
                                    <option value={"Higher"} >Higher Diploma (HND)</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.institution} name='institution' placeholder='University/Institution' className="form-control border-0 input_bg" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.year_of_graduation} name='year_of_graduation' placeholder='Year of Graduation' className="form-control border-0 input_bg" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.course_taught} name='course_taught' placeholder='Courses Taught' className="form-control border-0 input_bg" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.research_interest} name='research_interest' placeholder='Research Interest' className="form-control border-0 input_bg" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" onChange={handleOnChange} value={details.publication} name='publication' placeholder='Publications' className="form-control border-0 input_bg" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="cv" className='border rounded-3 w-100 bg-white btn text-secondary'>
                                    {profileCV ? profileCV.name : "C.V"}  <span className='text-success'>
                                        {profileCV && <CiCircleCheck size={25} />}
                                    </span>
                                </label>
                                <div className=" d-none">
                                    <input
                                        required type="file"
                                        onChange={handleOnChange}
                                        name='cv'
                                        accept='.pdf, .doc, .docx'
                                        placeholder='cv'
                                        className="form-control border-0 input_bg" id="cv" />
                                </div>
                            </div>
                        </div>
                        <label htmlFor="description">About you...</label>
                        <div className="form-floating mt-3">
                            <textarea className="form-control  border-0 input_bg" onChange={handleOnChange} value={details.bio} name='bio' placeholder="About you here" id="description" style={{ height: "150px" }}></textarea>
                        </div>
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

export default UpdateForm