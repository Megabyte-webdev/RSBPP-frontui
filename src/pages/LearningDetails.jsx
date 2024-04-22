import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { BiSolidBadgeCheck } from 'react-icons/bi'
import { MdArrowDropDown, MdOutlineVideoChat } from 'react-icons/md'
import { CgTimelapse } from "react-icons/cg";
import Curricullum from '../components/Learning/Curricullum'
import user from "../assets/img-2.png"
import NavBar from '../components/layout/NavBar'
import { ThemeContext } from '../context/ThemeContext'
import { useLocation } from 'react-router-dom';

const LearningDetails = () => {
    const { searchField, setSearchField } = useContext(ThemeContext);
    const [purchase, setPurchase] = useState(false)
    const { state } = useLocation()

    useEffect(() => {
        setSearchField(true)
    }, [])

    console.log(state)
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
                    <button className='btn blue_bg text-white py-2 px-5 rounded-0'>Enroll Now - ${state.course.price}</button>
                </div>
            </div>
            <div className="p-3 px-md-5 border-bottom">
                <div className="d-flex">
                    <button className='prime_brown fw-semibold bg-white border-0 fs-5 me-3'>About</button>
                    <button className='fw-semibold bg-white border-0 fs-5 me-3'>Curriculum</button>
                    <button className='fw-semibold bg-white border-0 fs-5 me-3'>Instructor</button>
                    <button className='fw-semibold bg-white border-0 fs-5 me-3'>Enrollment</button>
                    <button className='fw-semibold bg-white border-0 fs-5 me-3'>FAQS</button>
                </div>
            </div>
            <div className="p-3 p-md-5 d-flex justify-content-center" style={{ backgroundColor: "hsla(219, 50%, 95%, .5)" }}>
                <div className="col-md-10">
                    <Row>
                        <Col md={7}>
                            <h6>Overview</h6>
                            <div className="fs_sm">
                                <p>
                                    The course aims to equip participants with a broad understanding of the breadth and scope of international business and a solid foundation upon which to advance their careers and interests. <br />
                                    This knowledge can be employed to advance in your current work, to prepare for international jobs and careers, and to generally understand the importance and role of international business practice on globalization and geopolitics
                                </p>
                                <div className="my-4">
                                    <p className='fw-semibold'>Objectives:</p>
                                    <p>
                                        At the end of the course, participants should be able to:
                                        Make macro economic and potential analysis of global business environment
                                        Identify economic conditions and your business</p>
                                </div>
                            </div>
                            <h6>Outline</h6>
                            <div className="fs_sm">
                                <ul>
                                    <li>International Business Context</li>
                                    <li>International Business & Culture</li>
                                    <li>Global Business Research and Analysis</li>
                                    <li>International Sales, Marketing and Negotiation</li>
                                    <li>International Finance and Banking</li>
                                    <li>Business Networking</li>
                                    <li>Corporate Social Responsibility and International Development</li>
                                </ul>
                            </div>
                            <h6>Courses Curriculun</h6>
                            <div className="my-4 col-md-10">
                                <Curricullum />
                            </div>
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
                                                    <div className="form-check col">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                                            Checked checkbox
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-check col">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                                            Checked checkbox
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-check col">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                                            Checked checkbox
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