import React, { useState } from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

import instructorPics from "../../assets/participant.png"
import img from "../../assets/user-icon.png"
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';

const ParticipantRow = () => {
    const navigate = useNavigate()
    const [check, setcheck] = useState(false)
    const handleCheck = () => (setcheck(value => !value))
    return (
        <tr
            // onClick={() => navigate("/meetings_history/details")}
            className='fs_sm'>
            {/* <CourseViewer
    user={user}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={data}
        faculty={faculty}
        handleDisplay={handleDisplay} /> */}
            <td>
                <div className="d-flex align-items-center">
                    <div className='text-secondary'>
                        {check ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                    </div>
                    <div className="d-flex ms-2">
                        <div>
                            <img src={instructorPics} alt="" className="img-fluid" />
                        </div>
                        <div className='ms-2'>
                            <p className="fs_sm fw-semibold">Prof John Addidas</p>
                            <p className="fs_sm ">Business Science (Faculty ofBusiness )</p>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                Z5vZal
            </td>
            <td><span>example@mail.com</span></td>
            <td><span>Jun 1, 2024 4:52 PM</span></td>
            <td><span>-</span></td>
            <td>
                <div className='d-flex align-items-center'>
                   <div>
                   <Avatar alt="Remy Sharp" src={img} />
                   </div>
                    <span className='ms-1'> <MdOutlineRadioButtonUnchecked />
                    </span>
                </div>
            </td>
        </tr >
    )
}

export default ParticipantRow