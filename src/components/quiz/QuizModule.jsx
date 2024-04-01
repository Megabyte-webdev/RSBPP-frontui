import React from 'react'
import { IoMdArrowDropdown, IoMdCheckboxOutline } from "react-icons/io";
import { Link } from 'react-router-dom';

const QuizModule = ({
    course,
    isOpenOption,
    handleSubOptionClick }) => {
    const steps = course.modules;
    return (
        <div>
            <div className='d-flex fs_sm pointer' onClick={() => handleSubOptionClick(course.lesson)}>
                <div className='me-2'>
                    <IoMdCheckboxOutline size={30} className='prime_brown' />
                </div>
                <div className='w-100'>
                    <h6>{course.lesson}
                    </h6>

                </div>
                <div>
                    <IoMdArrowDropdown className='prime_brown' size={20} />
                </div>
            </div>
            {steps === null? null : (

                <div>
                    {isOpenOption === course.lesson && (
                        <ul className='fs_sm' style={{ listStyle: "none" }}>
                            {
                                steps?.map((step, i) => (
                                    <li key={i}> <Link to={""} className='nav-link'>{step}</Link> </li>
                                ))
                            }
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}

export default QuizModule