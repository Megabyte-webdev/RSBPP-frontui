import React, { useContext, useEffect } from 'react'
import ReactBigCalendar from '../components/general/ReactBigCalendar'
import { ResourceContext } from '../context/ResourceContext'

const ClassSchedules = () => {


    const { getAllSchedules,
        setGetAllSchedules } = useContext(ResourceContext)

    useEffect(() => {
        setGetAllSchedules((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    // console.log(getAllSchedules?.data)

    return (
        <div>{getAllSchedules.data && (
            <ReactBigCalendar timeTables={getAllSchedules?.data} />)}
        </div>
    )
}

export default ClassSchedules