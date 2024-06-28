import React, { useEffect, useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FiSearch } from 'react-icons/fi'
import LearningCourse from '../components/Learning/LearningCourse'
import CourseCarousel from '../components/general/CourseCarousel'
import { ResourceContext } from '../context/ResourceContext'
import { UserContext } from '../context/AuthContext'
import Loading from '../components/loader/Loading'

const MyLearning = () => {
    const { userCredentials, } = useContext(UserContext);
    const [filterCourse, setFilterCourse] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const [filterText, setFilterText] = useState()

    const { getAllFaculty,
        setGetAllFaculty,
        getAllCourses,
        setGetAllInstructors,
        getAllInstructors,
        setGetAllCourses,
        setGetAllUsers,
        getAllCarts, } = useContext(ResourceContext)

    useEffect(() => {
        setGetAllUsers((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

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
    useEffect(() => {
        setGetAllFaculty((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    const setCoursesFunc = (item, obj) => {
        setFilterCourse(item)
        setFilterText(obj)
    }

    // const newCourses = getAllCourses.data?.filter(item => filterCourse?.includes(item.id))
    const newCourses = filterCourse === '' ? getAllCourses?.data : getAllCourses.data?.filter(obj => obj.faculty_id === filterCourse);

    const typeSearch = newCourses?.filter((user) =>
        user.title.toLowerCase().includes(searchInput.toLowerCase())
    )

    const offLineCourse = typeSearch?.filter((course) => course.course_type === "offline")
    const onLineCourse = typeSearch?.filter((course) => course.course_type === "online")

    return (
        <div className='p-3 p-md-5 min-vh-100 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>
            <h3>My Learning Paths</h3>
            <p className="">On this page, you will be able to find all your learning paths along with the other learning paths available on the platform</p>
            <div className="my-3">
                <p className="fw-bold mb-2">Onsite</p>
                <div className="d-md-flex">
                    <div className="row col-md-4">
                        <div className="col">
                            <div className="dropdown">
                                <button className="btn border-black border w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {!filterCourse && ('Faculty')} {filterText?.title}
                                </button>
                                <ul className="dropdown-menu px-2">
                                    <li
                                        onClick={() => setCoursesFunc("")}
                                        className='pointer'>Faculty</li>
                                    {getAllFaculty.data?.map((title) => (
                                        <li key={title.id}
                                            onClick={() => setCoursesFunc(title.id, title)}
                                            className='pointer'>{title.title}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-5 mt-4 mt-md-0 position-relative">
                        <input
                            onChange={(e) => setSearchInput(e.target.value)}
                            type='text' className='py-1 border w-100 h-100 rounded px-4' />
                        <span className='position-absolute ps-1  top-50 start-0 translate-middle-y'>
                            <FiSearch />
                        </span>
                    </div>
                </div>

                {!getAllCourses.data && (
                    <div className="my-5">
                        <Loading />
                    </div>
                )}
                {getAllCourses.data && (
                    <div>
                        <div className="my-5">
                            {getAllCourses.data && (
                                <CourseCarousel>
                                    {onLineCourse?.map((course) => {
                                        return (
                                            <LearningCourse
                                                getAllInstructors={getAllInstructors.data}
                                                key={course.id}
                                                cartList={getAllCarts.data}
                                                userCredentials={userCredentials}
                                                course={course} />
                                        )
                                    })}
                                </CourseCarousel>
                            )}
                        </div>

                        <div className='my-5'>
                            <p className="fw-bold">Offline Course</p>
                            <div className="my-5">
                                {getAllCourses.data && (
                                    <CourseCarousel>
                                        {offLineCourse?.map((course) => {
                                            return (
                                                <LearningCourse
                                                    getAllInstructors={getAllInstructors.data}
                                                    key={course.id}
                                                    cartList={getAllCarts.data}
                                                    userCredentials={userCredentials}
                                                    course={course} />
                                            )
                                        })}
                                    </CourseCarousel>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyLearning