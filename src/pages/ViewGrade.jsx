import { BsJournalCheck } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { ResourceContext } from '../context/ResourceContext';
import { useContext, useRef } from "react";

import { UserContext } from "../context/AuthContext";


const ViewGrade = () => {
    const location = useLocation();
    const remarkRef = useRef(null)

    const { assignment } = location.state;
   
   
    const { userCredentials } = useContext(UserContext);
    const role = userCredentials?.user?.role
   


    const formatDate = (timestamp) => {
        const dateObj = new Date(timestamp);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div
            className="flex flex-col p-3 p-md-5 min-vh-100 poppins"
            style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}
        >
            <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
            View Grade
            </p>

            <div className="my-2">
                {assignment && <div className="flex flex-col gap-y-3">
                    <div className="flex gap-3 text-sm md:text-xl">
                        <p className="font-bold">Faculty: </p>
                        <p className="md:text-[18px]">{assignment.faculty_label}</p>
                    </div>
                    <div className="flex gap-3 text-sm md:text-xl">
                        <p className="font-semibold">Course: </p>
                        <p className="md:text-[18px]">{assignment.course_label}</p>
                    </div>
                    <div className="flex gap-3 text-sm md:text-xl">
                        <p className="font-semibold">Date Submitted: </p>
                        <p className="md:text-[18px]">{formatDate(assignment?.created_at)}</p>
                    </div>
                
                    
                    {/* Score Field */}
                    <div className={`h-24 font-medium my-2 border-[1px] ${assignment?.grade ? 'border-green-500 text-green-500':'border-red-500 text-red-5'} p-2 md:p-3 rounded-md flex justify-between`}>
                        <p className='text-sm md:text-[16px]'>Score Point</p>


                        <div className='font-bold text-[18px] my-2 md:mx-[10%]'>
                            {assignment ? `${assignment?.grade}/100`:'Pending' }
                        </div>

                    </div>
                    {/* Remark Section */}
                    <div className="font-medium my-3">
                        <section className={`flex justify-between items-center gap-2 border-[1px] ${assignment?.remark ? 'border-green-500' : 'border-red-500'} rounded-md p-2 md:p-3`}>
                            <div className="flex-1 flex flex-col gap-y-2">
                                <p className="text-sm md:text-[16px] capitalize">Remark</p>
                                <textarea
                                    cols="30"
                                    className="p-2 h-28 w-full bg-transparent placeholder:text-gray-500 placeholder:text-sm"
                                    value={assignment?.remark}
                                    ref={remarkRef}
                                    disabled={true}
                                    placeholder="Add Description"
                                />
                            </div>
                        </section>
                    </div>

                </div>}
            </div>

        </div>

    )

}
export default ViewGrade;