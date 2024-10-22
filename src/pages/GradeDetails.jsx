import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useContext } from "react";
import { ResourceContext } from "../context/ResourceContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IMAGE_URL } from "../components/utils/base";

const GradeDetails = ({ data, setScore, score, setRemark, remark }) => {
  const navigate = useNavigate();
  const { setGetAllFaculty, getAllFaculty } = useContext(ResourceContext);

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [faculty, setFaculty] = useState("Select a Faculty");
  const [course, setCourse] = useState("Select a Programme");
  const [prof, setProf] = useState("Prof Samuel Attong");

  // Load all faculty data on component mount
  useEffect(() => {
    setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
  }, [setGetAllFaculty]);

  // Sync faculty and course when data is provided
  useEffect(() => {
    if (data) {
      const facultyItem = getAllFaculty?.data?.find(item => item.id === data.faculty_id);
      setSelectedFaculty(facultyItem || null);

      const courseItem = facultyItem?.courses?.find(course => course.id === data.course_id);
      setSelectedCourse(courseItem || null);

      setFaculty(facultyItem ? facultyItem.title : "Select a Faculty");
      setCourse(courseItem ? courseItem.title : "Select a Programme");
    }
  }, [data, getAllFaculty]);

  const handleScore = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value <= 100) {
      setScore(value);
    }
  };

  return (
    <div className="flex flex-col p-3 min-vh-100 poppins" style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>

      {/* Faculty Dropdown */}
      <div className="font-medium my-3">
        <p className="text-xs md:text-sm my-2">Choose RSBPP Faculty</p>
        <section className="relative flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
          <div className="flex flex-col gap-y-2">
            <p className="text-xs md:text-[16px] capitalize">{faculty}</p>
            <p className="text-xs md:text-sm text-gray-600 capitalize overflow-hidden">
              {selectedFaculty
                ? `${selectedFaculty.description.split(" ").slice(0, 8).join(" ")}...`
                : "Select Faculty"}
            </p>
          </div>

          <p className="border-l border-gray-500 md:pl-7 pl-4 text-red-500">
            <IoIosArrowDown size="20" />
          </p>
        </section>
      </div>

      {/* Course Dropdown */}
      <div className="relative font-medium my-3">
        <section className="flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
          <div className="flex flex-col gap-y-2">
            <p className="text-xs md:text-[16px] capitalize">{course}</p>
            <p className="text-xs md:text-sm text-gray-500 capitalize">
              {selectedCourse
                ? `${selectedCourse.description.split(" ").slice(0, 8).join(" ")}...`
                : "Select Course"}
            </p>
          </div>
          <small className="font-bold ml-auto px-[2px] text-[10px] md:text-xs text-red-500">
            {prof}
          </small>

          <p className="pl-[2px] md:pl-4 text-red-500">
            <IoIosArrowDown size="20" />
          </p>
        </section>
      </div>

      {/* Description Field */}
      <div className="font-medium my-2 border-[1px] border-red-500 p-2 md:p-3 rounded-md">
        <p className='text-sm md:text-[16px]'>Comment by Admin</p>
        <textarea
          rows="4"
          onInput={(e) => setRemark(e.target.value)}
          value={remark}
          placeholder="Assignment description..."
          className="h-28 w-full bg-transparent text-gray-700 font-normal placeholder:text-gray-400 placeholder:text-sm p-2"
        />
      </div>

      {/* File Upload Section */}
      <div>
        <div className={`min-h-32 font-medium my-2 flex flex-col items-center gap-2 border-[1px] border-red-500 rounded-md px-3 py-4`}>
          <MdOutlineCloudUpload size={24} className="text-gray-700 mb-2" />
          <p className="text-gray-800 text-center text-sm">
            {data?.file_submission ? data?.file_submission.split("/").pop() : 'No files Submitted'}
          </p>
          {data?.file_submission && (
            <a href={`${IMAGE_URL}${data?.file_submission}`} target="_blank" rel="noopener noreferrer">
              <button
                type="button"
                className="mt-2 bg-transparent border-[2px] border-gray-900 text-gray-600 px-10 py-2 rounded-3xl font-medium"
              >
                View Files
              </button>
            </a>
          )}
        </div>
      </div>

      {/* Score Field */}
      <div className="h-20 font-medium my-2 border-[1px] border-red-500 p-2 md:p-3 rounded-md flex justify-between">
        <div>
          <p className='text-sm md:text-[16px]'>Score Point</p>
          <input
            type="text"
            placeholder="Enter a score"
            onInput={handleScore}
            value={score}
            className='mx-2 bg-gray-200 placeholder:text-gray-500 py-2 px-3 w-full text-sm'
          />
        </div>
        <div className='font-bold text-red-500 text-[18px] my-2 md:mx-[10%]'>
          {score}/100
        </div>
      </div>
    </div>
  );
};

export default GradeDetails;
