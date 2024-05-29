import React, { useContext, useEffect } from 'react'
import ReactBigCalendar from '../components/general/ReactBigCalendar'
import { ResourceContext } from '../context/ResourceContext'

const ClassSchedules = () => {


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
            <ReactBigCalendar timeTables={getAllSchedules?.data} />)}
            {errorMesage && (<p className='text-center text-danger mt-5 fs-5'>{errorMesage}</p>)}
        </div>
    )
}

export default ClassSchedules