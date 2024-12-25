import React, { useContext, useEffect, useState } from 'react'
import CourseViewer from './CourseViewer'
import { getEnrollById } from '../utils/getApi';
import { UserContext } from '../../context/AuthContext';

const CourseRow = ({ user, getAllFaculty }) => {
const {userCredentials} = useContext(UserContext)
    const [data, setData] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDisplay = () => (
        setIsOpen((prev) => {
            return {
                ...prev,
                 display: "block"
            }
        })
    )

    useEffect(()=>{
        getEnrollById(user.id, setData, userCredentials.token)
    },[])
   const faculty =  getAllFaculty?.find((faculty) => faculty.id === user.faculty_id)

    // console.log(faculty)
    // console.log(user.id)
    return (
        <tr>
            <CourseViewer
            user={user}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                data={data}
                faculty={faculty}
                handleDisplay={handleDisplay}
                userCredentials={userCredentials} />

            <td>{user.category_label}</td>
            <td>{user.title}</td>
            {/* <td>{user.code}</td> */}
            {/* <td>{user.description}</td> */}
            {/* <td>{user.duration} {user.duration && ("")}</td> */}
            
            <td>{user.program}</td>
            <td>{user.price}</td>
            <td>
                <button onClick={handleDisplay} className='btn' style={{ border: "1px solid hsla(166, 79%, 42%, 1)", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>Details</button>
            </td>
        </tr>
    )
}

export default CourseRow