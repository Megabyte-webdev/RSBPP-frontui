import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FiSearch } from 'react-icons/fi'
import LearningCourse from '../components/Learning/LearningCourse'
import CourseCarousel from '../components/general/CourseCarousel'

const MyLearning = () => {
    return (
        <div className='p-3 p-md-5 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>
            <h3>My Learning Paths</h3>
            <p className="">On this page, you will be able to find all your learning paths along with the other learning paths available on the platform</p>
            <div className="my-3">
                <p className="fw-bold mb-2">Onsite</p>
                <div className="d-md-flex">
                    <div className="row col-md-7">
                        <div className="col">
                            <div className="dropdown">
                                <button className="btn border-black border w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Faculty
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="dropdown">
                                <button className="btn border-black border w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Duration
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="dropdown">
                                <button className="btn border-black border w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Get Brochure
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-4 mt-4 mt-md-0 position-relative">
                        <input type='text' className='py-1 border h-100 rounded px-4' />
                        <span className='position-absolute ps-1  top-50 start-0 translate-middle-y'>
                            <FiSearch />
                        </span>
                    </div>
                </div>
                <div>
                    <div className="my-5">
                        <CourseCarousel>
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                        </CourseCarousel>
                    </div>
                </div>
                <div className='my-5'>
                    <p className="fw-bold">Offline Course</p>
                    <div className="my-5">
                        <CourseCarousel>
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                            <LearningCourse />
                        </CourseCarousel>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyLearning