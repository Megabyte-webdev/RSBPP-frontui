import { useContext, useState } from "react"
// import Widget from "../auth/Widget"
import { UserContext } from "../../context/AuthContext"
import toast from "react-hot-toast"
import axios from "axios"
import { ResourceContext } from "../../context/ResourceContext"
import { BASE_URL } from "../utils/base"
import { Spinner } from "react-bootstrap"

const AddCategoryForm = ({ isOpen, setIsOpen }) => {
    const { getAllCategory, setGetAllCategory } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);

    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [showMsg, setShowMsg] = useState("")

    const [details, setDetails] = useState({
        label: "",
        description: ""
    })

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
            label: "",
            description: ""

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
        setGetAllCategory((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        setLoading(true)
        axios.post(`${BASE_URL}faculty/addCategory`, details, {
            headers: {
                Authorization: `Bearer ${userCredentials.token}`,
            },
        })
            .then((response) => {
                console.log(response)
                setGetAllCategory((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                resetStates()
                handleIsClose()
                setLoading(false)
                toast.success("Category successfully created");
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

    // console.log(details)
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
                    <div className="modal-dialog modal-dialog-scrollable modal-md">
                        <div className="modal-content h-100">
                            <div className="modal-header bottom_brown">
                                <h1 className="modal-label fs-5" id="staticBackdropLabel">Add Category</h1>
                                <button
                                    onClick={() => handleIsClose()}
                                    type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body px-md-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="label" className="form-label">Category</label>
                                        <input
                                            required
                                            type="text"
                                            name="label"
                                            onChange={handleOnChange}
                                            value={details.label}
                                            className="form-control" id="label" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="desc" className="form-label">description</label>
                                        <input
                                            required
                                            type="text"
                                            name="description"
                                            onChange={handleOnChange}
                                            value={details.description}
                                            className="form-control" id="desc" aria-describedby="emailHelp" />
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

export default AddCategoryForm