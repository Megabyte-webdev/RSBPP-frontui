import React, { useState } from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const HoverList = ({ sub, clickedIndex, handleClick }) => {
    const navigate = useNavigate();

    return (
        <li
            onClick={() => handleClick(sub.title)}
            className='pointer sidelist hover_effect ps-4 position-relative'
            // data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
        >
            {clickedIndex === sub.title && (
                <span className='position-absolute start-0'><FaLongArrowAltRight size={12} /></span>
            )}
            <p onClick={() => navigate(sub.link)} className="nav-link">{sub.title} </p></li>
    )
}

export default HoverList