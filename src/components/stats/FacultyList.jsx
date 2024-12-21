import React, { useState } from 'react'

const FacultyList = ({ faculty, deleteFunc,handleEdit }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <tr>
            <td>{faculty?.title}</td>
            <td>{faculty?.description}</td>
            <td className="">
                <button
                    disabled={isSubmitting}
                    onClick={() => deleteFunc(faculty.id, setIsSubmitting)}
                    className='btn' style={{ border: "1px solid hsla(166, 79%, 42%, 1)", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>{isSubmitting ? "Deleting.." : "Delete"}</button>
                <button
                    className="btn mt-1"
                    style={{
                        border: "1px solid hsla(166, 79%, 42%, 1)",
                        backgroundColor: "hsla(166, 79%, 42%, 0.38)",
                        color: "hsla(166, 79%, 42%, 1)",
                    }}
                    onClick={() => handleEdit(faculty)}
                >
                    Edit
                </button>
            </td>
        </tr>
    )
}

export default FacultyList