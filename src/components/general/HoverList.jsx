import React, { useState } from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const HoverList = ({ sub }) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleClick = () => setIsClicked(true);

    return (
        <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className='pointer hover_effect ps-4 position-relative'
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
        >
            {/* {isHovered || isClicked ? <span className='position-absolute start-0'><FaLongArrowAltRight /></span> : null} */}

            {/* {show && (
                <span className='position-absolute start-0'><FaLongArrowAltRight /></span>
            )} */}
            <p onClick={() => navigate(sub.link)} className="nav-link">{sub.title}</p></li>
    )
}

export default HoverList