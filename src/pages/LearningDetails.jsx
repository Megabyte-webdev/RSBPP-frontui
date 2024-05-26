import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { BiSolidBadgeCheck } from 'react-icons/bi'
import { MdArrowDropDown, MdOutlineVideoChat } from 'react-icons/md'
import { CgTimelapse } from "react-icons/cg";
import Curricullum from '../components/Learning/Curricullum'
import user from "../assets/img-2.png"
import NavBar from '../components/layout/NavBar'
import { useLocation, useNavigate } from 'react-router-dom';
import payPal from "../assets/dash-icons/paypal 1.svg"
import payStack from "../assets/dash-icons/Paystack 1.svg"
import axios from 'axios';
import { ResourceContext } from '../context/ResourceContext';
import { UserContext } from '../context/AuthContext';
import { BASE_URL } from '../components/utils/base';

const LearningDetails = () => {
    const navigate = useNavigate();
    const { getAllCarts, setGetAllCarts } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);
    const [purchase, setPurchase] = useState(true)
    const [errorMessage, setErrorMessage] = useState(true)
    const [view, setView] = useState("about")
    const { state } = useLocation();

    const details = {
        user_id: userCredentials?.user.id,
        course_id: state.course?.id
    }
    const handleView = (viewItem) => (setView(viewItem))

    const hasItem = getAllCarts.data?.some(item => item.courseId === state.course?.id)

    const addToCart = () => {
        if (hasItem) {
            navigate("/carts")
        } else {
            setGetAllCarts((prev) => {
                return {
                    ...prev, isDataNeeded: false
                }
            })
            axios.post(`${BASE_URL}cart/addCart`, details, {
                headers: {
                    'Authorization': `Bearer ${userCredentials.token}`,
                },
            })
                .then(response => {
                    console.log(response)
                    setGetAllCarts((prev) => {
                        return {
                            ...prev, isDataNeeded: true
                        }
                    })
                    navigate("/carts")
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response) {
                        setErrorMessage(error.response.data.message);
                    } else {
                        setErrorMessage(error.message);
                    }
                });
        }
    };

    // console.log(hasItem)
    console.log(view)
    return (
        <div>
            <NavBar />
            <div className="brown_bg p-3 p-md-5 text-white">
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <span> <BiSolidBadgeCheck size={25} /> </span>
                        <span>ONSITE</span>
                    </div>
                </div>
                <div className="text-center ">
                    <h3 className="my-3">
                        {state.course.title}
                    </h3>
                    <p>{state.course.description}</p>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-between col-md-7 my-5 px-md-5">
                        <div className="d-flex align-items-center">
                            <span className="me-2">
                                <MdOutlineVideoChat size={35} />
                            </span>
                            <span>Live Classes</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="me-2">
                                <MdOutlineVideoChat size={35} />
                            </span>
                            <span>Live Classes</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="me-2">
                                <MdOutlineVideoChat size={35} />
                            </span>
                            <span>Live Classes</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button onClick={() => addToCart()} className='btn blue_bg text-white py-2 px-5 rounded-0'>Enroll Now - ${state.course.price}</button>
                </div>
            </div>
            <div className="p-3 border-bottom">
                <div className="container">
                    <div className="d-flex">
                        <button onClick={() => handleView('about')} style={{ color: view === "about" ? "#ab3335" : "" }} className=' fw-semibold bg-white border-0 fs-md-5 me-2 me-md-4'>About</button>
                        <button onClick={() => handleView('curriculum')} style={{ color: view === "curriculum" ? "#ab3335" : "" }} className='fw-semibold bg-white border-0 fs-md-5 me-2 me-md-4'>Curriculum</button>
                        <button onClick={() => handleView('outlines')} style={{ color: view === "outlines" ? "#ab3335" : "" }} className='fw-semibold bg-white border-0 fs-md-5 me-2 me-md-4'>Outline</button>
                        <button onClick={() => handleView('enrollment')} style={{ color: view === "enrollment" ? "#ab3335" : "" }} className='fw-semibold bg-white border-0 fs-md-5 me-2 me-md-4'>Enrollment</button>
                        <button onClick={() => handleView('faqs')} style={{ color: view === "faqs" ? "#ab3335" : "" }} className='fw-semibold bg-white border-0 fs-md-5 me-2 me-md-4'>FAQS</button>
                    </div>
                </div>
            </div>
            <div className="p-3 d-flex justify-content-center" style={{ backgroundColor: "hsla(219, 50%, 95%, .5)" }}>
                <div className="container">
                    <Row>
                        <Col md={7}>
                            {view === 'about' && (
                                <div>
                                    <h6 className='mb-4'>Objectives</h6>
                                    <div className="fs_sm">
                                        <p dangerouslySetInnerHTML={{ __html: state.course.objective }} />
                                    </div>
                                </div>
                            )}
                            {view === 'curriculum' && (
                                <div>
                                    <div>
                                        <h6>Courses Curriculun</h6>
                                        <div className="my-4 col-md-10">
                                            <p dangerouslySetInnerHTML={{ __html: state.course.curriculum }} />
                                            {/* <Curricullum /> */}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {view === 'outlines' && (
                                <div>
                                    <h6 className='mb-4'>Outline</h6>
                                    <div className="fs_sm">
                                        <p dangerouslySetInnerHTML={{ __html: state.course.outlines }} />
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            )}
                        </Col>
                        {purchase ? (
                            <Col md={5}>
                                <div className="rounded my-2 p-3 bg-white">
                                    <p className="fw-semibold mb-2">Target Participants:</p>
                                    <p>Forward thinking entrepreneurs, and professionals in heavily regulated industries</p>
                                    <div className="d-flex fw-semibold mt-3">
                                        <p><span className='prime_bg'><CgTimelapse /> {state.course.participate}</span> <span> Slot available</span></p>
                                    </div>
                                </div>
                                <div className="rounded my-2 p-3 bg-white">
                                    <p className="fw-semibold mb-2">Class Type</p>
                                    <p>{state.course.program}</p>
                                </div>
                                <div className="rounded my-2 p-3 bg-white">
                                    <p className="fw-semibold mb-2">Duration</p>
                                    <p>{state.course.duration}</p>
                                </div>
                                <div className="rounded my-2 p-3 py-4 bg-white">
                                    <div className="d-flex justify-content-center">
                                        <div>
                                            <img src={user} alt="" className="" />
                                        </div>
                                    </div>
                                    <p className='fs_sm my-4'>How do you know your learners are retaining knowledge in appropriate volumes and timeframes? That’s right: You throw in assessments, and see if the students “catch your drift”. Obviously, there is a boring way to assess performance through brick-and-mortar tests, but there’s also an engaging way – through online quizzes. This seems easy as pie to Instructional Designers, yet there are certain techniques that will help you pick the right form and content for quizzing. Some handy tips for effective eLearning quiz questions in this article!</p>
                                </div>
                            </Col>
                        )
                            : (
                                <Col md={5}>
                                    <div className="p-3 bg-white">
                                        <form>
                                            <div>
                                                <h6 className='mb-3'>CONTACT INFORMATION</h6>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">First Name</label>
                                                        <input type="password" className="form-control" id="exampleInputPassword1" />
                                                    </div>
                                                    <div className="col mb-3">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                                                        <input type="password" className="form-control" id="exampleInputPassword1" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Email Address</label>
                                                        <input type="password" className="form-control" id="exampleInputPassword1" />
                                                    </div>
                                                </div>
                                                <h6 className='mb-3'>BILLING INFORMATION</h6>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                                                        <input type="password" className="form-control" id="exampleInputPassword1" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">City</label>
                                                        <input type="password" className="form-control" id="exampleInputPassword1" />
                                                    </div>
                                                    <div className="col mb-3">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Country</label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option selected>select </option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Region </label>
                                                        <input type="password" className="form-control" id="exampleInputPassword1" />
                                                    </div>
                                                    <div className="col mb-3">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Postal Code</label>
                                                        <input type="password" className="form-control" id="exampleInputPassword1" />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-check col d-flex align-items-center">
                                                        <input className="form-check-input" type="radio" name="paymentMethod" value="" id="flexCheckChecked" />
                                                        <label className="form-check-label ms-3" htmlFor="flexCheckChecked">
                                                            <img src={payPal} alt="" className="img-fluid" />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-check col d-flex align-items-center">
                                                        <input className="form-check-input" type="radio" name="paymentMethod" value="" id="paystack" />
                                                        <label className="form-check-label ms-3" htmlFor="paystack">
                                                            <img src={payStack} alt="" className="img-fluid" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </Col>
                            )}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default LearningDetails