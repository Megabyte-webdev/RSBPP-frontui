import React, { useContext, useEffect } from 'react'
import THead from '../components/general/THead'
import MeetingRow from '../components/faculty/MeetingRow'
import ParticipantRow from '../components/faculty/ParticipantRow'
import { ResourceContext } from '../context/ResourceContext'
import { UserContext } from '../context/AuthContext'
import Loading from '../components/loader/Loading'

const MeetingParticipant = () => {

    const { userCredentials } = useContext(UserContext)
    const { getAllCourses, setGetAllCourses } = useContext(ResourceContext)

    const user = userCredentials?.user

    useEffect(() => {
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    const myCoursesOnly = getAllCourses.data?.filter((course) => course.created_by_id == user.id)

    return (
        <div>
            <div
                className="p-3 p-md-5 min-vh-100"
                style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
            >
                <p>Perticipant List</p>
                <div className="p-2 bg-white shadow-sm rounded my-3">
                    {/* <div className="overflow_y_md_50 overflow_y_80"> */}
                    {myCoursesOnly && (
                        <div className="mt-4 table-responsive-md">
                            <table className="table roboto table-hover">
                                <thead>
                                    <tr>
                                        <THead name="Student Name" />
                                        <THead name="Course Subscribe" />
                                        <THead name="Email" />
                                        {/* <THead name="Phone" /> */}
                                        <THead name="Action" />
                                        <THead name="Participants" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {myCoursesOnly?.map((course) => (
                                        <ParticipantRow key={course.id} course={course} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {!myCoursesOnly && <Loading />}
                </div>
            </div>
        </div>
    )
}

export default MeetingParticipant