import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/AuthContext'
import { ResourceContext } from '../../context/ResourceContext'
import { BASE_URL, IMAGE_URL } from '../utils/base'
import { Spinner } from 'react-bootstrap'
import { CiCircleCheck } from 'react-icons/ci'
import userPics from "../../assets/user-icon.png"


const ProfileUpdateForm = ({ setProfileCV, profileCV }) => {
    const { userCredentials } = useContext(UserContext)
    const user = userCredentials?.user

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
    const [profileImageUrl, setProfileImageUrl] = useState(user.image ? `${IMAGE_URL}profile/${user.image}` : null);


    const [details, setDetails] = useState({
        // user_id: user?.id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        organization: user?.organization,
        position: user?.position,
        role: user?.role,
        faculty_id: user?.faculty_id,
        registration_type: "",
        dob: user?.dob ? user.dob : "",
        country: user?.country ? user.country : "",
        state: user?.state ? user.state : "",
        gender: user?.gender ? user.gender : "",
        address: user?.address ? user.address : "",
        industry: user?.industry ? user.industry : "",
        profession: user?.profession ? user.profession : "",
        image: user?.image,
        contact_number: user?.contact_number ? user.contact_number : "",
        experience: user?.experience ? user.experience : "",
        specialization: user?.specialization ? user.specialization : "",
    })
    console.log(details)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(null)
        console.log(details)
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        setLoading(true)
        axios.post(`${BASE_URL}user/updateProfile/${user.id}`, details, {
            headers: {
                Authorization: `Bearer ${userCredentials.token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response)
                // setGetAllCourses((prev) => {
                //     return {
                //         ...prev, isDataNeeded: true
                //     }
                // })
                // resetStates()
                setLoading(false)
                toast.success("Profile updated successfully");
            })
            .catch((error) => {
                console.log(error)
                if (error.response) {
                    // console.log(error.response)
                    // setErrorMsg(error.response.data.message)
                    if (error.response.data.errors.user_id) {
                        setErrorMsg(error.response.data.errors.user_id)
                        // } else if (error.response.data.message.instructor_id) {
                        //     setErrorMsg(error.response.data.message.instructor_id)
                        // } else if (error.response.data.message.start_time) {
                        //     setErrorMsg(error.response.data.message.start_time)
                    } else {
                        setErrorMsg(error.response.data.message)
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
    console.log(errorMsg)
    const getImageURL = (e) => {
        const { name } = e.target;
        const file = e.target.files[0]; //filelist is an object carrying all details of file, .files[0] collects the value from key 0 (not array), and stores it in file

        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            // You can also perform additional actions with the valid file
            const generatedUrl = URL.createObjectURL(file);
            setProfileImageUrl(generatedUrl);
            setDetails({ ...details, [name]: file });
        } else {
            // Handle invalid file type
            alert('Please select a valid JPEG or PNG file.');
        }
    };
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
                        <div className="d-flex justify-content-end mb-2 pe-3">
                            {profileImageUrl ? (
                                <div style={{ width: "70px", height: "70px" }} className="rounded-circle bg-secondary">
                                    <img className="w-100 rounded-circle h-100" src={profileImageUrl} alt="" />
                                </div>
                            ) : (
                                <div style={{ width: "70px", height: "70px" }} className=" rounded">
                                    <img className="w-100 h-100" src={userPics} alt="" />
                                </div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text" value={details.first_name} name='first_name' placeholder='First Name *' required className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " value={details.last_name} name='last_name' placeholder='Last Name *' required className="form-control border-0 input_bg" id="dateAndTime" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " value={details.email} name='email' placeholder='Email *' required className="form-control border-0 input_bg" id="dateAndTime" />
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
                        {/* <div className="col-md-6">
                            <div className="mb-3">
                                <select id="setDuration" onChange={handleOnChange} value={details.faculty_id} name='faculty_id' className="form-select input_bg border-0">
                                    <option defaultValue={userFaculty?.id}>{userFaculty?.title}</option>
                                    {
                                        getAllFaculty.data?.map((faculty) => (
                                            <option key={faculty.id} value={faculty.id}>{faculty.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div> */}
                        <div className="col-md-6">
                            <div className="mb-3">
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
                                    <label className='mb-2' htmlFor="dob">Date of Birth </label>
                                    <input id="dob" type="date" onChange={handleOnChange} value={details.dob} name='dob' placeholder='Date of Birth *' className="form-control border-0 input_bg" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                <label className='mb-2' htmlFor="contact_number">Contact Number </label>
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
                                    <input type="text " onChange={handleOnChange} value={details.address} name='address' placeholder='Address' className="form-control border-0 input_bg" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.industry} name='industry' placeholder='Industry' className="form-control border-0 input_bg" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 row">
                                <div className="">
                                    <input type="text " onChange={handleOnChange} value={details.profession} name='profession' placeholder='Profession' className="form-control border-0 input_bg" required />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="cv" className='border rounded-3 w-100 bg-white btn text-secondary'>
                                    {details.image ? "Change profile image" : "Profile Image"}  <span className='text-success'>
                                        {profileCV && <CiCircleCheck size={25} />}
                                    </span>
                                </label>
                                <div className=" d-none">
                                    <input
                                        // required
                                        type="file"
                                        onChange={getImageURL}
                                        accept=".jpg, .jpeg, .png"
                                        name='image'
                                        placeholder='Profile Image'
                                        className="form-control border-0 input_bg" id="cv" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='mt-5'>
                    {errorMsg && (<p className="text-danger text-center my-3">{errorMsg}</p>)}
                    <div className="my-3 d-flex justify-content-center">
                        <div className="fw-semibold col-6">
                            {/* <button className='btn fw-semibold normal_btn Fborder-primary outline-primary me-3 text-primary'>Cancel</button> */}
                            <button type="submit" className='btn w-100 hover_effect fw-semibold normal_btn brown_bg btn-lg text-white'>Submit {loading && (<Spinner size='sm' />)} </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfileUpdateForm