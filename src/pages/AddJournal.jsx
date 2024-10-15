Here's the recreated design using dropdown select:

```
jsx
import { BsJournalCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const AddJournal = () => {
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [remark, setRemark] = useState("");

  const faculties = [
    "Faculty of Business Communication and Finance",
    "Faculty of Engineering",
    "Faculty of Science",
  ];

  const courses = [
    "Business Administration",
    "Computer Science",
    "Economics",
  ];

  return (
    <div
      className="flex flex-col p-3 p-md-5 min-vh-100 poppins"
      style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}
    >
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        <BsJournalCheck size="24" /> Add Journal
      </p>
      <div>
        {/* Faculty Dropdown */}
        <div className="font-medium my-2">
          <p className="text-sm md:text-xl my-2">Choose RSBPP Faculty</p>
          <select
            className="flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
          >
            <option value="">Select Faculty</option>
            {faculties.map((faculty, index) => (
              <option key={index} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>

        {/* Course Dropdown */}
        <div className="font-medium my-2">
          <p className="text-sm md:text-xl my-2">Select Course</p>
          <select
            className="flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Remark */}
        <div className="font-medium my-2">
          <p className="text-sm md:text-xl my-2">Remark</p>
          <textarea
            cols="30"
            className="p-2 h-28 w-full placeholder:text-gray-500 placeholder:text-sm"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Add Description"
          />
        </div>

        <button className="my-2 mx-auto w-48 px-8 py-2 text-white bg-[navy] rounded-md font-medium">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddJournal;
```