import { FaFileUpload } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ResourceContext } from "../context/ResourceContext";
import { UserContext } from "../context/AuthContext";

const BASE_URL = "https://dash.rsbpp.nl/api/";

const UploadAssignment = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [faculty, setFaculty] = useState("Select a Faculty");
  const [course, setCourse] = useState("Select a Course");
  const [prof, setProf] = useState("Prof Samuel Attong");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInput = useRef(null);

  const { setGetAllFaculty, getAllFaculty } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);

  const uploadAssignment = () => {
    const selectedCourse = filteredData?.courses?.find(
      (item) => item.title === course
    );

    if (!filteredData || !selectedCourse) {
      setMessage("Please select a valid faculty and course.");
      return;
    }

    if (!selectedFile) {
      setMessage("Please upload a file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("assignment_id", "2");
    formData.append("course_id", selectedCourse.id);
    formData.append("faculty_id", filteredData.id);
    formData.append("created_by_id", userCredentials.id);
    formData.append("text_submission", description);
    formData.append("file_submission", selectedFile);
    formData.append("status", "submit");

    axios
      .post(`${BASE_URL}course/submitAssignment`, formData, {
        headers: {
          Authorization: `Bearer ${userCredentials.token}`,
        },
      })
      .then((response) => {
        setMessage(response.data.message || "Assignment uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setMessage("An error occurred during upload.");
        setLoading(false);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  useEffect(() => {
    setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
  }, [userCredentials]);

  useEffect(() => {
    const selectedFaculty = getAllFaculty?.data?.find(
      (item) => item.title === faculty
    );
    setFilteredData(selectedFaculty);
  }, [faculty, getAllFaculty]);

  return (
    <div
      className="flex flex-col p-3 p-md-5 min-vh-100 poppins"
      style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}
    >
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        Upload Assignment
      </p>
      <div>
        <p>{message && message}</p>
        {loading && <p>Loading...</p>}

        {/* Faculty Dropdown */}
        <div className="font-medium my-3">
          <p className="text-xs md:text-sm my-2">Choose RSBPP Faculty</p>
          <section className="relative flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
            <div className="flex flex-col gap-y-2">
              <p className="text-xs md:text-[16px] capitalize">{faculty}</p>
              <p className="text-xs md:text-sm text-gray-600 capitalize overflow-hidden">
                {filteredData
                  ? `${filteredData.description.split(" ").slice(0, 8).join(" ")}...`
                  : "Select Faculty"}
              </p>
            </div>
            <select
              className="p-2 md:p-3 absolute w-full min-h-full left-0 top-0 text-sm opacity-0 cursor-pointer rounded-md border-[1px] border-red-500"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option disabled value="Select a Faculty">
                Select a Faculty
              </option>
              {getAllFaculty?.data?.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
            <p className="border-l border-gray-500 pl-4 text-red-500">
              <IoIosArrowDown size="20" />
            </p>
          </section>
        </div>

        {/* Course Dropdown */}
        <div className="font-medium my-3">
          <section className="relative flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
            <div className="flex flex-col gap-y-2">
              <p className="text-xs md:text-[16px] capitalize">{course}</p>
              <p className="text-xs md:text-sm text-gray-600 capitalize">
                Select Course
              </p>
            </div>
            <small className="font-bold ml-auto px-[2px] text-[10px] md:text-xs text-red-500">
              {prof}
            </small>
            <select
              className="p-2 md:p-3 absolute w-full min-h-full left-0 top-0 text-sm opacity-0 cursor-pointer rounded-md border-[1px] border-red-500"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option disabled value="Select a Course">
                Select a Course
              </option>
              {filteredData?.courses?.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
            <p className="pl-[1px] md:pl-4 text-red-500">
              <IoIosArrowDown size="20" />
            </p>
          </section>
        </div>

        {/* Description Section */}
        <div className="border-[1px] border-red-500 rounded-md p-2 md:p-3 font-medium my-2">
          <p className="text-sm md:text-[16px] mb-1">Submission</p>
          <textarea
            cols="30"
            className="p-2 h-28 w-full bg-transparent placeholder:text-gray-500 placeholder:text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add Description"
          />
        </div>

        {/* File Upload Section */}
        <div className="font-medium my-2 flex flex-col items-center gap-2 border-[1px] border-red-500 rounded-md px-3 py-4">
          <FaFileUpload size="24" />
          <p>
            {selectedFile ? selectedFile.name : "Choose a file or drag & drop it here"}
          </p>
          <input
            type="file"
            ref={fileInput}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInput.current.click()}
            className="border-[1px] border-gray-600 px-8 py-2 text-gray-700 bg-transparent rounded-2xl font-medium"
          >
            Browse File
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={uploadAssignment}
            className="w-48 my-2 px-8 py-2 text-white bg-[navy] rounded-md font-medium"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadAssignment;
