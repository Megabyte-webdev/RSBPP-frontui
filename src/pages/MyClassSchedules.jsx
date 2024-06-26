import React, { useContext, useEffect } from 'react'
import ReactBigCalendar from '../components/general/ReactBigCalendar'
import { ResourceContext } from '../context/ResourceContext'

const MyClassSchedules = () => {


    const {
        getEnrolledCourses,
        setGetEnrolledCourses,
        getAllSchedules,
        setGetAllSchedules, errorMesage } = useContext(ResourceContext)

    useEffect(() => {
        setGetAllSchedules((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetEnrolledCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    // console.log(getEnrolledCourses.data)
    // console.log(getAllSchedules.data)
    const myClasses = getAllSchedules.data?.filter(
        (schedule) => getEnrolledCourses.data?.some((enroll) => enroll.courseId === schedule.course_id)
    );
    console.log(myClasses)

    return (
        <div>{myClasses && (
            <ReactBigCalendar timeTables={myClasses} />)}
            {errorMesage && (<p className='text-center text-danger mt-5 fs-5'>{errorMesage}</p>)}
        </div>
    )
}

export default MyClassSchedules