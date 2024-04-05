import React, { useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md';

const Curricullum = () => {

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
    const items = [
        {
            topic: "1 Curricullum",
            sub: ["Administer and support Linux in your environment",]
        },
        {
            topic: "2 Curricullum",
            sub: ["Chapters Administer and support Linux in your environment",]
        },
        {
            topic: "3 Curricullum",
            sub: ["9 Chapter Administer and support Linux in your environment",]
        },
    ]
    return (
        <>
            {
                items.map((item) => {
                    const subItems =item.sub;
                    return (
                        <div key={item.topic} className="mb-2 bg-white rounded p-4">
                            <div className="d-flex justify-content-between">
                                <h5>{item.topic}</h5>
                                <button className='prime_brown btn border-0'><span>preview</span> <span> <MdArrowDropDown size={24} /> </span></button>
                            </div>
                            <ol className="fs_sm my-1">
                                {subItems.map((sub, index) =>(
                                <li key={index}>{sub}</li>
                                )) }
                            </ol>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Curricullum