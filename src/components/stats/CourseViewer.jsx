
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/base';

const CourseViewer = ({ isOpen, setIsOpen, user, data, faculty, userCredentials }) => {
    const [enrolled, setEnrolled]=useState()

    const fetchEnrolledStudents = async (courseId) => {
        try {
          const response = await axios.get(`${BASE_URL}enroll/getEnrollByCourceId/${courseId}`, {
            headers: {
              'Authorization': `Bearer ${userCredentials.token}`,
            },
          });
          setEnrolled(response.data.enrolled_users?.length ||0);
        } catch (error) {
          console.error(error);
          setEnrolled(0); // Return 0 if there's an error
        }
      };

      useEffect(()=>{
        console.log(user)
        fetchEnrolledStudents(user?.id);
    },[user])
    const navigate = useNavigate()
    // close Modal
    const handleIsClose = () => (
        setIsOpen((prev) => {
            return {
                ...prev, display: "none"
            }
        })
    )
    // console.log(user)
    return (
        <div className='p-0'>
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
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">{user?.title}</h1>
                                <button
                                    onClick={() => handleIsClose()}
                                    type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body px-md-5">
                                <div className="mb-3">
                                    <p className="fw-semibold text-center mb-4 fs-5">Description</p>
                                    <p>{user?.description}</p>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        {/* <div className="mb-3">
                                            <p className="fw-semibold">Description</p>
                                            <p>{user?.description}</p>
                                        </div> */}
                                        <div className="mb-3">
                                            <p className="fw-semibold">Course Code</p>
                                            <p>{user?.code}</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="fw-semibold">Duration</p>
                                            <p>{user?.duration} Months</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="fw-semibold">Course Category</p>
                                            <p>{user?.category_label}</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="fw-semibold">Faculty</p>
                                            <p>{faculty?.title}</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <p className="fw-semibold">Price</p>
                                            <p>${user?.price}</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="fw-semibold">Participation</p>
                                            <p>{user?.participate}</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="fw-semibold mb-3">Registered Students</p>
                                            <p>{enrolled &&
                                                <span
                                                    onClick={() => navigate(`/courses_administration/${user?.title}`, { state: { data: data } })}
                                                    className='pointer border px-2 rounded py-1 text-info text-decoration-underline'>{enrolled}</span>}</p>
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

export default CourseViewer