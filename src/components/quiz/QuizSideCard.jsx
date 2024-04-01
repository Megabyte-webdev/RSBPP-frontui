import React, { useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import { BiChevronDown } from "react-icons/bi";
import QuizModule from './QuizModule';

const QuizSideCard = () => {

    const [isOpenOption, setIsOpenOption] = useState(null); // Track which subOption is open

    const handleSubOptionClick = (clickedOptionTitle) => {
        setIsOpenOption((prevIsOpenOption) => {
            if (prevIsOpenOption === clickedOptionTitle) {
                return null; // Close the currently open subOption
            } else {
                return clickedOptionTitle; // Open the clicked subOption
            }
        });
    };
    const courses = [
        {
            lesson: "Welcome to the Certified Cyber Intelligence Investigator (CCII)",
            modules: null
        },
        {
            lesson: "Welcome to the CCII",
            modules: [
                "Understanding the Manual Reading Assingment ",
                "Prep Review Quiz: History and Background",
            ]
        },
        {
            lesson: "Welcome to the CCI",
            modules: [
                "Understanding the Manual Reading Assingment ",
                "Prep Review Quiz: History and Background",
            ]
        },
        {
            lesson: "Introduction to the CCI",
            modules: [
                "Understanding the Manual Reading Assingment ",
                "Prep Review Quiz: History and Background",
            ]
        },
    ]

    const courseResource = courses?.map((course) => (
        <QuizModule
            key={course.lesson}
            course={course}
            isOpenOption={isOpenOption}
            handleSubOptionClick={handleSubOptionClick} />
    ))
    return (
        <div className='py-3 px-2 bg-white rounded'>
            <div className='position-relative'>
                <input type="text" className="btn border rounded bg-white text-start px-4 py-2 w-100" id="search" placeholder='Search by lesson title' />
                <div className="position-absolute top-50 end-0 translate-middle-y p-2">
                    <span className=" p-1">
                        <BiChevronDown size={20} />
                    </span>
                </div>
            </div>
            <div className="my-3">
                {courseResource}
            </div>
        </div>
    )
}

export default QuizSideCard