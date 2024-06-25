import React, { useContext, useEffect } from 'react'
import THead from '../components/general/THead'
import FacultyRow from '../components/faculty/FacultyRow'
import { UserContext } from '../context/AuthContext'
import { ResourceContext } from '../context/ResourceContext'

const FacultyList = () => {


    const { userCredentials } = useContext(UserContext)
    const { getAllCourses, setGetAllCourses, getAllInstructors, setGetAllInstructors, getAllFaculty, setGetAllFaculty } = useContext(ResourceContext)

    const user = userCredentials?.user

    useEffect(() => {
        setGetAllCourses((prev) => {
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
        setGetAllInstructors((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    const myCoursesOnly = getAllCourses.data?.filter((course) => course.created_by_id == user.id)
    const instructor = getAllInstructors.data?.find((one) => one.user_id == userCredentials.user.id)
    // console.log(instructor)
    return (
        <div>
            <div
                className="p-3 p-md-5 min-vh-100"
                style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
            >
                <p>Faculties List</p>
                <div className="p-2 bg-white shadow-sm rounded my-3">
                    {/* <div className="overflow_y_md_50 overflow_y_80"> */}
                    <div className="mt-4 table-responsive-md">
                        <table className="table roboto table-hover">
                            <thead>
                                <tr>
                                    <THead name="Faculty Name" />
                                    <THead name="Type" />
                                    <THead name="Course" />
                                    <THead name="NO. of Enrolled Student" />
                                    <THead name="Create at " />
                                    {/* <THead name="Actions" /> */}
                                </tr>
                            </thead>
                            <tbody>
                                {myCoursesOnly?.map((course) => (
                                    <FacultyRow key={course.id}
                                        token={userCredentials.token}
                                        course={course}
                                        instructor={instructor}
                                        faculty={getAllFaculty.data} />
                                ))}
                                {/* <FacultyRow /> */}
                                {/* <FacultyRow />
                                <FacultyRow />
                                <FacultyRow />
                                <FacultyRow />
                                <FacultyRow />
                                <FacultyRow /> */}
                            </tbody>
                        </table>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default FacultyList