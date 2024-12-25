import React, { useContext, useEffect } from 'react'
import ReactBigCalendar from '../components/general/ReactBigCalendar'
import { ResourceContext } from '../context/ResourceContext'
import { useLocation } from 'react-router-dom'
const ClassSchedules = () => {
    const location =useLocation();
    const {startDate}=location?.state || {};

    const { getAllSchedules,
        setGetAllSchedules, errorMesage } = useContext(ResourceContext)

    useEffect(() => {
        setGetAllSchedules((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    console.log(errorMesage)

    return (
        <div>{getAllSchedules.data && (
            <ReactBigCalendar timeTables={getAllSchedules?.data} startDate={startDate} />)}
            {errorMesage && (<p className='text-center text-danger mt-5 fs-5'>{errorMesage}</p>)}
        </div>
    )
}

export default ClassSchedules