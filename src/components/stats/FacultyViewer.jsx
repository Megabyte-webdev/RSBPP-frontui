
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import THead from '../general/THead';

const FacultyViewer = ({ isOpen, setIsOpen, faculty }) => {

    const navigate = useNavigate()
    // close Modal
    const handleIsClose = () => (
        setIsOpen((prev) => {
            return {
                ...prev, display: "none"
            }
        })
    )
    // console.log(faculty)
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
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">{faculty?.title}</h1>
                                <button
                                    onClick={() => handleIsClose()}
                                    type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body px-md-5">
                                <div className="mb-3">
                                    <p className="fw-semibold text-center mb-4 fs-5">Description</p>
                                    <p>{faculty.description}</p>
                                </div>
                                <div>
                                    <div className="overflow_y_md_50 overflow_y_80">
                                        <div className="mt-4 table-responsive-md">
                                            <table className="table  table-hover">
                                                <thead>
                                                    <tr>
                                                        <THead name="No:" />
                                                        <THead name="Category" />
                                                        <THead name="Course" />
                                                        <THead name="Program" />
                                                        <THead name="Price ($)" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {faculty.courses?.map((list, index) => {
                                                        return (
                                                            <tr className='shadow mb-1 pointer'
                                                            onClick={()=> navigate('/courses_administration')} 
                                                            key={list.id}>
                                                                <th scope="row">{index + 1} </th>
                                                                <td>{list.category_label}</td>
                                                                <td>{list?.title}</td>
                                                                <td>{list?.program}</td>
                                                                <td>{list?.price}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                    {/* <tr>
                                    <th scope="row">1</th>
                                    <td>Jane Cooper</td>
                                    <td>Microsoft</td>
                                    <td>Microsoft</td>
                                    <td>(225) 555-0118</td>
                                    <td>jane@microsoft.com</td>
                                    <td>United States</td>
                                    <td>
                                        <button className='btn' style={{ border: "1px solid hsla(0, 97%, 44%, 1))", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>Active</button>
                                    </td>
                                </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleIsClose()}
                                    className='btn btn-lg brown_bg text-white my-3 fs_sm w-50'>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FacultyViewer