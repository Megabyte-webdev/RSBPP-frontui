// import React, { useEffect, useContext, useState } from 'react'
// import { Col, Row } from 'react-bootstrap'
// import { FiSearch } from 'react-icons/fi'
// import LearningCourse from '../components/Learning/LearningCourse'
// import CourseCarousel from '../components/general/CourseCarousel'
// import { ResourceContext } from '../context/ResourceContext'
// import { UserContext } from '../context/AuthContext'
// import Loading from '../components/loader/Loading'
import { useNavigate } from 'react-router-dom'

const MyLearning = () => {
    const navigate=useNavigate();
    //const { userCredentials, } = useContext(UserContext);
    // const [filterCourse, setFilterCourse] = useState("")
    // const [searchInput, setSearchInput] = useState("")
    // const [filterText, setFilterText] = useState()

    // const { getAllFaculty,
    //     setGetAllFaculty,
    //     getAllCourses,
    //     setGetAllInstructors,
    //     getAllInstructors,
    //     setGetAllCourses,
    //     setGetAllUsers,
    //     getAllCarts, } = useContext(ResourceContext)

    // useEffect(() => {
    //     setGetAllUsers((prev) => {
    //         return {
    //             ...prev, isDataNeeded: true
    //         }
    //     })
    // }, [])

    // useEffect(() => {
    //     setGetAllCourses((prev) => {
    //         return {
    //             ...prev, isDataNeeded: true
    //         }
    //     })
    // }, [])
    // useEffect(() => {
    //     setGetAllInstructors((prev) => {
    //         return {
    //             ...prev, isDataNeeded: true
    //         }
    //     })
    // }, [])

    // useEffect(() => {
    //     setGetAllFaculty((prev) => {
    //         return {
    //             ...prev, isDataNeeded: true
    //         }
    //     })
    // }, [])
    // useEffect(() => {
    //     setGetAllFaculty((prev) => {
    //         return {
    //             ...prev, isDataNeeded: true
    //         }
    //     })
    // }, [])

    // const setCoursesFunc = (item, obj) => {
    //     setFilterCourse(item)
    //     setFilterText(obj)
    // }

    // // const newCourses = getAllCourses.data?.filter(item => filterCourse?.includes(item.id))
    // const newCourses = filterCourse === '' ? getAllCourses?.data : getAllCourses.data?.filter(obj => obj.faculty_id === filterCourse);

    // const typeSearch = newCourses?.filter((user) =>
    //     user.title.toLowerCase().includes(searchInput.toLowerCase())
    // )

    // // const offLineCourse = typeSearch?.filter((course) => course.course_type === "offline")
    // // const onLineCourse = typeSearch?.filter((course) => course.course_type === "online")

    return (
        <div className='p-3 p-md-5 min-vh-100 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>
            <h3>Learning Paths</h3>
            <p className="">On this page, you will be able to find all your learning paths along with the other learning paths available on the platform</p>
            <div className="my-5">
            <div className='flex flex-wrap gap-5 m-2'>
                            {/* Online programmes */}
                            <div className='bg-gray-100 flex flex-col gap-y-2 w-[300px] min-h-[250px] border border-gray-600 pb-2'>
                                <p className='bg-red-900 text-white text-xl flex items-center justify-center p-4'>Online programmes</p>
                                <p className='p-2 text-sm'>Engage with forward-thinking community and access our flexible online education from anywhere in the world.</p>
                                <button onClick={() => { navigate('/online-programmes'); scrollTo(0, 0) }} className='w-max mx-2 mb-2 mt-auto py-2 px-3 bg-gray-800 rounded-md font-semibold text-white text-sm'>View Courses</button>
                            </div>
                            {/* DigiKnowH */}
                            <div className='bg-gray-100 flex flex-col gap-y-2 w-[300px] min-h-[250px] border border-gray-600 pb-2'>
                                <p className='bg-red-900 text-white text-xl flex items-center justify-center p-4'>DigiKnowH</p>
                                <p className='p-2 text-sm'>The Digital Skills Learning programme is tailored for people who are curious and open to learning about digital technologies, tools, and practices.</p>
                                <button onClick={() => { navigate('/digiknowh'); scrollTo(0, 0) }} className='w-max mx-2 mb-2 mt-auto py-2 px-3 bg-gray-800 rounded-md font-semibold text-white text-sm'>View Courses</button>
                            </div>
                        </div>
            </div>
            </div>
    )
}

export default MyLearning