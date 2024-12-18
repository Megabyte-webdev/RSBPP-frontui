import React, { useState } from 'react'

const CategoryList = ({ category, deleteFunc,handleEdit }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <tr>
            <td>{category?.label}</td>
            <td>{category?.description}</td>
            <td className="">
                <button
                    disabled={isSubmitting}
                    onClick={() => deleteFunc(category.id, setIsSubmitting)}
                    className='btn' style={{ border: "1px solid hsla(166, 79%, 42%, 1)", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>{isSubmitting ? "Deleting.." : "Delete"}</button>
                <button
                    className="btn mt-1"
                    style={{
                        border: "1px solid hsla(166, 79%, 42%, 1)",
                        backgroundColor: "hsla(166, 79%, 42%, 0.38)",
                        color: "hsla(166, 79%, 42%, 1)",
                    }}
                    onClick={() => handleEdit(category)}
                >
                    Edit
                </button>
            </td>
        </tr>
    )
}

export default CategoryList