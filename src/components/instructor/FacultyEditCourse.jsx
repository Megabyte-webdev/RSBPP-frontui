import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/AuthContext'
import { ResourceContext } from '../../context/ResourceContext'
import { BASE_URL } from '../utils/base'
import { Spinner } from 'react-bootstrap'
import { editorFormats, editorModules } from '../utils/textEditor'
import ReactQuill from 'react-quill'
import { useLocation, useNavigate } from 'react-router-dom'

const FacultyEditCourse = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { getAllFaculty,
        setGetAllFaculty,
        getAllInstructors,
        setGetAllInstructors,
        getAllCourses,
        setGetAllCourses, } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);

    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [showMsg, setShowMsg] = useState("")
    const instructor = userCredentials.user?.role === "instructor"
    console.log(instructor)
    const prev = state.course

    const [details, setDetails] = useState({
        // course_id: prev.id,
        title: prev.title,
        created_by_id: prev.created_by_id,
        // code: prev.code,
        description: prev.description,
        objective: prev.objective,
        outlines: prev.outlines,
        duration: prev.duration,
        course_type: prev.course_type,
        program: prev.program,
        faculty_id: prev.faculty_id,
        price: prev.price,
        participate: prev.participate,
        curriculum: prev.curriculum,
        image: prev.image,
    })
    
    const [courseImageUrl, setCourseImageUrl] = useState(prev.image ? prev.image  : null);

    useEffect(() => {
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetAllInstructors((prev) => {
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
            created_by_id: userCredentials.user?.id,
            // code: "",
            description: "",
            objective: "",
            outlines: "",
            duration: "",
            course_type: "online",
            program: "",
            faculty_id: "",
            price: "",
            participate: "",
            curriculum: "",
            image: "",
        });
    };

    const getImageURL = (e) => {
        const { name } = e.target;
        const file = e.target.files[0]; //filelist is an object carrying all details of file, .files[0] collects the value from key 0 (not array), and stores it in file

        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            // You can also perform additional actions with the valid file
            const generatedUrl = URL.createObjectURL(file);
            setCourseImageUrl(generatedUrl);
            setDetails({ ...details, [name]: file });
        } else {
            // Handle invalid file type
            alert('Please select a valid JPEG or PNG file.');
        } 
    };


    const handleOnChange = (e) => {
        const { value, name, files, type, checked } = e.target
        setDetails((prev) => {
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
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

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        setErrorMsg("")
        setLoading(true);
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        axios.post(`${BASE_URL}course/updateCourse/${prev.id}`, details, {
            headers: {
                Authorization: `Bearer ${userCredentials.token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                setGetAllCourses((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                resetStates()
                setLoading(false)
                toast.success("successful update");
                navigate( instructor ? "/instructor_courses" : "/faculty_courses")
            })
            .catch((error) => {
                console.log(error.response.data.message)
                if (error = error.response?.data) {
                    console.log(error)
                    if (error.errors?.created_by_id) {
                        console.log(error.errors.created_by_id)
                        setErrorMsg(error.errors.created_by_id[0])
                        setShowMsg(true)
                        setLoading(false);
                    } else if (error.errors?.curriculum) {
                        console.log(error.errors.curriculum[0])
                        setErrorMsg(error.errors.curriculum[0])
                        setShowMsg(true)
                        setLoading(false);
                    } else if (error.errors?.objective) {
                        console.log(error.errors.objective[0])
                        setErrorMsg(error.errors.objective[0])
                        setShowMsg(true)
                        setLoading(false);
                    } else if (error.errors?.outlines) {
                        console.log(error.errors.outlines[0])
                        setErrorMsg(error.errors.outlines[0])
                        setShowMsg(true)
                        setLoading(false);
                    } else if (error.errors?.faculty_id) {
                        console.log(error.errors.faculty_id[0])
                        setErrorMsg(error.errors.faculty_id[0])
                        setShowMsg(true)
                        setLoading(false);
                    } else if (error.errors?.program) {
                        console.log(error.errors.program[0])
                        setErrorMsg(error.errors.program[0])
                        setShowMsg(true)
                        setLoading(false);
                    } else {
                        console.log(error?.message)
                        setErrorMsg(error.message)
                        setShowMsg(true)
                        setLoading(false);
                    }
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
                <h4 className='mb-3'>Edit Course</h4>
                <form onSubmit={handleSubmitUpdate}>
                    <div className="row">

                        <div className="mb-3 col-md-6">
                            <label htmlFor="faculty" className="form-label">Faculty</label>
                            <select
                                id="faculty"
                                value={details.faculty_id}
                                name="faculty_id"
                                onChange={handleOnChange}
                                className="form- py-2 w-100 border rounded px-2" aria-label="Default select example">
                                <option value="">--select --</option>
                                {
                                    getAllFaculty.data?.map((each) => (
                                        <option key={each.id} value={each.id}>{each.title}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {!instructor && (
                            <div className="mb-3 col-md-6">
                                <label htmlFor="assignTo" className="form-label">Assign To</label>
                                <select
                                    id="assignTo"
                                    value={details.created_by_id}
                                    name="created_by_id"
                                    onChange={handleOnChange}
                                    className="form- py-2 w-100 border rounded px-2" aria-label="Default select example">
                                    <option value="">--select --</option>
                                    {
                                        getAllInstructors.data?.map((each) => (
                                            <option key={each.user_id} value={each.user_id}>{each.title} {each.first_name} {each.last_name} </option>
                                        ))
                                    }
                                </select>
                            </div>
                        )}
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
                            <label htmlFor="image" className="form-label">Course image</label>
                            <input
                                // required
                                type="file"
                                accept="image/*"
                                // value={details.image}
                                name="image"
                                onChange={getImageURL}
                                className="form-control" id="image" aria-describedby="emailHelp" />
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
                        {/* <div className="mb-3 col-md-6">
                            <label htmlFor="code" className="form-label">Course Code</label>
                            <input
                                required
                                type="text"
                                value={details.code}
                                name="code"
                                onChange={handleOnChange}
                                className="form-control" id="code" aria-describedby="emailHelp" />
                        </div> */}
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
                            <label htmlFor="program" className="form-label">Program</label>
                            <select
                                id="program"
                                value={details.program}
                                name="program"
                                onChange={handleOnChange}
                                className="form- py-2 w-100 border rounded px-2" aria-label="Default select example">
                                <option value="">--select --</option>
                                <option value="certificate">Certificate</option>
                                <option value="executive">Executive</option>
                            </select>
                        </div>
                        {/* <div className="mb-3 col-md-6">
                            <label htmlFor="faculty" className="form-label">Faculty</label>
                            <select
                                id="faculty"
                                value={details.faculty_id}
                                name="faculty_id"
                                onChange={handleOnChange}
                                className="form- py-2 w-100 border rounded px-2" aria-label="Default select example">
                                <option value="">--select --</option>
                                {
                                    getAllFaculty.data?.map((each) => (
                                        <option key={each.id} value={each.id}>{each.title}</option>
                                    ))
                                }
                            </select>
                        </div> */}
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

export default FacultyEditCourse
