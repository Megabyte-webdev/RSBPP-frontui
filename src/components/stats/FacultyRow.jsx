import React, { useContext, useEffect, useState } from 'react'
import CourseViewer from './CourseViewer'
import { getEnrollById } from '../utils/getApi';
import { UserContext } from '../../context/AuthContext';
import FacultyViewer from './FacultyViewer';

const CourseRow = ({ faculty }) => {
const {userCredentials} = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);

    const handleDisplay = () => (
        setIsOpen((prev) => {
            return {
                ...prev, display: "block"
            }
        })
    )

    // console.log(faculty)
    return (
        <tr>
            <FacultyViewer
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                faculty={faculty} />

            <td>{faculty.title}</td>
            <td>{faculty.description}</td>
            <td>
                <button onClick={handleDisplay} className='btn' style={{ border: "1px solid hsla(166, 79%, 42%, 1)", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>Details</button>
            </td>
        </tr>
    )
}

export default CourseRow