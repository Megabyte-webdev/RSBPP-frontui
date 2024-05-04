import { useContext, useEffect, useState } from "react"
import Widget from "../auth/Widget"
import { UserContext } from "../../context/AuthContext"
import toast from "react-hot-toast"
import axios from "axios"
import { ResourceContext } from "../../context/ResourceContext"
import { BASE_URL } from "../utils/base"
import { Spinner } from "react-bootstrap"

const AddCourseForm = ({ isOpen, setIsOpen }) => {
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
    })

    useEffect(() => {
        setGetAllFaculty((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    // close Modal
    const handleIsClose = () => (
        setIsOpen((prev) => {
            return {
                ...prev, display: "none"
            }
        })
    )

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        setLoading(true)
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
                handleIsClose()
                setLoading(false)
                toast.success("successful");
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMsg(error.response.data.message)
                    setShowMsg(true)
                    setLoading(false);
                } else {
                    setErrorMsg(error.message)
                    setShowMsg(true)
                    setLoading(false);
                }
            });
    }

    console.log(setGetAllFaculty)
    return (
        <div>
            {isOpen && (
                <div
                    style={isOpen}
                    className="modal fade show"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-scrollable modal-lg">
                        <div className="modal-content h-100">
                            <div className="modal-header bottom_brown">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Create Course</h1>
                                <button
                                    onClick={() => handleIsClose()}
                                    type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body px-md-5">
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
                                    </div>
                                    {showMsg && (<p className="text-center mb-3 text-danger">{errorMsg}</p>)}
                                    <button
                                        className='btn btn-lg brown_bg text-white fs_sm w-50'>Submit
                                        {loading && (<span className='ms-2'><Spinner size='sm' /></span>)}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddCourseForm