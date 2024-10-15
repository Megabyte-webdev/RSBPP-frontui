

import { BsJournalCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const AddJournal = () => {
const [faculty, setFaculty] = useState("Faculty of business communication and finance");
const [course, setCourse] = useState("Select a Programme");
const [prof, setProf] = useState("Prof Samuel Attong");
const [remark, setRemark] = useState("");

return (
<div className='flex flex-col p-3 p-md-5 min-vh-100 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>
<p className='sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium'><BsJournalCheck size="24" />Add Journal</p>
<div>
{/* Dropdown */}
<div className='font-medium my-2'>
<p className='text-sm md:text-xl my-2'>Choose RSBPP Faculty</p>
<section className='flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3'>
<div className='flex flex-col gap-y-2'>
<p className='text-xs md:text-[16px] capitalize'>{faculty}</p>
<p className='text-xs md:text-sm text-gray-600 capitalize'>Select Faculty</p>
</div>
<select
className='absolute w-full opacity-0 cursor-pointer'
value={faculty}
onChange={(e) => setFaculty(e.target.value)}
>
<option value="Faculty of Technology">Faculty of Technology</option>
<option value="Faculty of Science">Faculty of Science</option>
</select>
<p className='border-l border-gray-500 pl-4 text-red-500'><IoIosArrowDown size='20' /></p>
</section>
</div>
  <div className='font-medium my-2'>
      <section className='flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3'>
        <div className='flex flex-col gap-y-2'>
          <p className='text-xs md:text-[16px] capitalize'>{course}</p>
          <p className='text-xs md:text-sm text-gray-600 capitalize'>Select Course</p>
        </div>
        <small className='font-bold text-[10px] text-red-500'>{prof}</small>
        <select
          className='absolute w-full opacity-0 cursor-pointer'
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="Course 1">Course 1</option>
          <option value="Course 2">Course 2</option>
        </select>
        <p className='pl md:pl-4 text-red-500'><IoIosArrowDown size='20' /></p>
      </section>
    </div>

    <div className='font-medium my-2'>
      <section className='flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3'>
        <div className='flex-1 flex flex-col gap-y-2'>
          <p className='text-sm md:text-[16px] capitalize'>Remark</p>
          <textarea 
            cols='30' 
            className="p-2 h-28 w-full placeholder:text-gray-500 placeholder:text-sm" 
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder='Add Description'
          />
        </div>
      </section>
    </div>

  </div>
<button className="my-2 mx-auto w-48 px-8 py-2 text-white bg-[navy] rounded-md font-medium">Submit</button>
</div>

);
};

export default AddJournal;