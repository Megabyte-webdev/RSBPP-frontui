import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { ResourceContext } from "../../context/ResourceContext";
import { BASE_URL } from "../utils/base";
import { Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { editorFormats, editorModules } from "../utils/textEditor";

const AddCourseForm = ({ isOpen, setIsOpen, editCourse = null }) => {
    
    const {
        getAllCategory,
        setGetAllCategory,
        setGetAllFaculty,
        getAllFaculty,
        getAllCourses,
        setGetAllCourses,
    } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showMsg, setShowMsg] = useState("");
    const [comments, setComments] = useState("");

    const [details, setDetails] = useState({
        title: "",
        description: "",
        objective: "",
        outlines: "",
        duration: "",
        program: "",
        category_id: "",
        faculty_id: "",
        price: "",
        participate: "",
        curriculum: "",
    });

    useEffect(() => {
        setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
        setGetAllCategory((prev) => ({ ...prev, isDataNeeded: true }));
        if (editCourse) {
            console.log(editCourse)
            setDetails({
                title: editCourse?.title || "",
                description: editCourse?.description || "",
                objective: editCourse?.objective || "",
                outlines: editCourse?.outlines || "",
                duration: editCourse?.duration || "",
                program: editCourse?.program || "",
                category_id: getAllCategory.data?.find(one=>one.label === editCourse?.course_type)?.id || "",
                faculty_id: editCourse?.faculty_id || "",
                price: editCourse?.price || "",
                participate: editCourse?.participate || "",
                curriculum: editCourse?.curriculum || "",
            });
        }else{
            resetStates();
        }
        
    }, [editCourse]);

    const handleIsClose = () =>
        setIsOpen((prev) => ({ ...prev, display: "none" }));

    const resetStates = () => {
        setDetails({
            title: "",
            description: "",
            objective: "",
            outlines: "",
            duration: "",
            program: "",
            category_id: "",
            faculty_id: "",
            price: "",
            participate: "",
            curriculum: "",
        });
        setErrorMsg("");
    };

    const handleOnChange = (e) => {
        const { value, name, type, checked } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
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
        setErrorMsg("");
        setLoading(true);
        console.log(details)
        setGetAllCourses((prev) => ({ ...prev, isDataNeeded: false }));

        const apiEndpoint = editCourse
            ? `${BASE_URL}course/updateCourse/${editCourse.id}`
            : `${BASE_URL}course/addCourse`;

        const apiCall = editCourse
            ? axios.post(apiEndpoint, details, {
                headers: { Authorization: `Bearer ${userCredentials.token}` },
            })
            : axios.post(apiEndpoint, details, {
                headers: { Authorization: `Bearer ${userCredentials.token}` },
            });

            // console.log(apiCall)

        apiCall
            .then(() => {
                setGetAllCourses((prev) => ({ ...prev, isDataNeeded: true }));
                resetStates();
                handleIsClose();
                setLoading(false);
                toast.success(editCourse ? "Course updated successfully" : "Course added successfully");
            })
            .catch((error) => {
                console.log(error)
                const errorMessage = error.response?.data?.message || error.message;
                setErrorMsg(errorMessage);
                setShowMsg(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (isOpen) {
            window.scrollTo(0,0);
        }
    }, []);
    
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
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                    {editCourse ? "Edit Course" : "Create Course"}
                                </h1>
                                <button
                                    onClick={() => handleIsClose()}
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body px-md-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="category" className="form-label">Category</label>
                                            <select
                                                id="category"
                                                value={details.category_id}
                                                name="category_id"
                                                onChange={handleOnChange}
                                                className="form- py-2 w-100 border rounded px-2" aria-label="Default select example">
                                                <option value="">--select --</option>
                                                {
                                                    getAllCategory.data?.map((each) => (
                                                        <option key={each.id} value={each.id}>{each.label}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
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
                                            <label htmlFor="desc" className="form-label">Description</label>
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
                                        {/* <div className="mb-3 col-md-6">
                                            <label htmlFor="type" className="form-label">Course Type</label>
                                            <select
                                                id="type"
                                                value={details.course_type}
                                                name="course_type"
                                                onChange={handleOnChange}
                                                className="form- py-2 w-100 border rounded px-2" aria-label="Default select example">
                                                <option value="">--select --</option>
                                                <option value="online">Online</option>
                                                <option value="digiknowh">Digiknowh</option>
                                            </select>
                                        </div> */}
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
                                            <label htmlFor="outlines" className="form-label">
                                                Create Outlines
                                            </label>
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

                                    {showMsg && (
                                        <p className="text-center mb-3 text-danger">{errorMsg}</p>
                                    )}
                                    <button
                                    disabled={loading}
                                        className="btn btn-lg brown_bg text-white fs_sm w-50"
                                    >
                                        {editCourse ? "Update" : "Submit"}
                                        {loading && (
                                            <span className="ms-2">
                                                <Spinner size="sm" />
                                            </span>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCourseForm;
