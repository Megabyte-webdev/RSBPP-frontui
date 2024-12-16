import React, { useState } from 'react'

const CategoryList = ({ user, deleteFunc }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <tr>
            <td>{user?.label}</td>
            <td>{user?.description}</td>
            <td>
                <button
                    disabled={isSubmitting}
                    onClick={() => deleteFunc(user.id, setIsSubmitting)}
                    className='btn' style={{ border: "1px solid hsla(166, 79%, 42%, 1)", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>{isSubmitting ? "Deleting.." : "Delete"}</button>
            </td>
        </tr>
    )
}

export default CategoryList