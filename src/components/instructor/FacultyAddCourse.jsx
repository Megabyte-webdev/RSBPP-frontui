import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/AuthContext'
import { ResourceContext } from '../../context/ResourceContext'
import { BASE_URL } from '../utils/base'
import { Spinner } from 'react-bootstrap'
import { editorFormats, editorModules } from '../utils/textEditor'
import ReactQuill from 'react-quill'

const FacultyAddCourse = () => {
    const { getAllFaculty,
        setGetAllFaculty,
        getAllCourses,
        setGetAllCourses, } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);

    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [showMsg, setShowMsg] = useState("")
    const [details, setDetails] = useState({
        title: "",
        code: "",
        description: "",
        objective: "",
        outlines: "",
        duration: "",
        course_type: "",
        program: "",
        faculty_id: "",
        price: "",
        participate: "",
        curriculum: "",
    })
    useEffect(() => {
        setGetAllCourses((prev) => {
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
    const resetStates = () => {
        setDetails({
            title: "",
            code: "",
            description: "",
            objective: "",
            outlines: "",
            duration: "",
            course_type: "",
            program: "",
            faculty_id: "",
            price: "",
            participate: "",
            curriculum: "",
        });
    };
    const handleOnChange = (e) => {
        const { value, name, type, checked } = e.target
        setDetails((prev) => {
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value
            };
        });
        setErrorMsg("");
    };

    const handleOutline = (event) => {
        setDetails((prev) => {
            return {
                ...prev, outlines: event
            };
        });
        setErrorMsg("");
    };
    const handleCurricullum = (event) => {
        setDetails((prev) => {
            return {
                ...prev, curriculum: event
            };
        });
        setErrorMsg("");
    };
    const handleObjectives = (event) => {
        setDetails((prev) => {
            return {
                ...prev, objective: event
            };
        });
        setErrorMsg("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("")
        setLoading(true);
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        axios.post(`${BASE_URL}course/addCourse`, details, {
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
                    setErrorMsg(error.response.data.message)
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
    // const allInstructors = getAllUsers.data?.filter((user) => user.role === "instructor")
    console.log(details)

    return (
        <div
            className="p-3 p-md-5"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
        >
            <div className='p-3 bg-white shadow rounded py-5'>
                <form onSubmit={handleSubmit}>
                    <div className="row">

                        <div className="mb-3 col-md-6">
                            <label htmlFor="title" className="form-label">Course title</label>
                            <input
                                required
                                type="text"
                                value={details.title}
                                name="title"
                                onChange={handleOnChange}
                                className="form-control" id="title" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="desc" className="form-label">description</label>
                            <input
                                required
                                type="text"
                                value={details.description}
                                name="description"
                                onChange={handleOnChange}
                                className="form-control" id="desc" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="code" className="form-label">Course Code</label>
                            <input
                                required
                                type="text"
                                value={details.code}
                                name="code"
                                onChange={handleOnChange}
                                className="form-control" id="code" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="duration" className="form-label">Duration (in months)</label>
                            <input
                                required
                                type="text"
                                value={details.duration}
                                name="duration"
                                onChange={handleOnChange}
                                className="form-control" id="duration" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="type" className="form-label">Course Type</label>
                            <select
                                id="type"
                                value={details.course_type}
                                name="course_type"
                                onChange={handleOnChange}
                                className="form- py-2 w-100 border rounded px-5" aria-label="Default select example">
                                <option value="">--select --</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="program" className="form-label">Program</label>
                            <input
                                required
                                type="text"
                                value={details.program.toLocaleLowerCase()}
                                name="program"
                                onChange={handleOnChange}
                                className="form-control" id="program" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="faculty" className="form-label">Faculty</label>
                            <select
                                id="faculty"
                                value={details.faculty_id}
                                name="faculty_id"
                                onChange={handleOnChange}
                                className="form- py-2 w-100 border rounded px-5" aria-label="Default select example">
                                <option value="">--select --</option>
                                {
                                    getAllFaculty.data?.map((each) => (
                                        <option key={each.id} value={each.id}>{each.title}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                required
                                type="number"
                                value={details.price}
                                name="price"
                                onChange={handleOnChange}
                                className="form-control" id="price" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="participant" className="form-label">Number of Participant</label>
                            <input
                                required
                                type="number"
                                value={details.participate}
                                name="participate"
                                onChange={handleOnChange}
                                className="form-control" id="participant" aria-describedby="emailHelp" />
                        </div>
                        <div className="my-4">
                            <label htmlFor="outlines" className="form-label">Create Outlines</label>
                            <ReactQuill
                                id="outlines"
                                onChange={handleOutline}
                                value={details.outlines}
                                modules={editorModules}
                                formats={editorFormats}
                            />
                        </div>
                        <div className="my-4">
                            <label htmlFor="objectives" className="form-label">Create Objectives</label>
                            <ReactQuill
                                id="objectives"
                                onChange={handleObjectives}
                                value={details.objective}
                                modules={editorModules}
                                formats={editorFormats}
                            />
                        </div>
                        <div className="my-4">
                            <label htmlFor="curriculum" className="form-label">Create Curriculum</label>
                            <ReactQuill
                                id="curriculum"
                                onChange={handleCurricullum}
                                value={details.curriculum}
                                modules={editorModules}
                                formats={editorFormats}
                            />
                        </div>
                    </div>
                    {showMsg && (<p className="text-center mb-3 text-danger">{errorMsg}</p>)}
                    <button
                        className='btn btn-lg brown_bg text-white fs_sm w-50'>Submit
                        {loading && (<span className='ms-2'><Spinner size='sm' /></span>)}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FacultyAddCourse