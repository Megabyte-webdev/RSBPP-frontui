import { FaFileUpload } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ResourceContext } from "../context/ResourceContext";
import { UserContext } from "../context/AuthContext";
import { BASE_URL } from "../components/utils/base";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom"; // Import useLocation

const UploadAssignment = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [faculty, setFaculty] = useState("Select a Faculty");
  const [course, setCourse] = useState("Select a Course");
  const [prof, setProf] = useState("Prof Samuel Attong");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInput = useRef(null);

  const { setGetAllFaculty, getAllFaculty } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);
  const role = userCredentials?.user.role.toLowerCase();

  const location = useLocation(); // Get the location object
  const editData = location.state?.editData || null; // Extract editData from location state

  useEffect(() => {
    // Load faculty and course data
    setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));

    if (editData) {
      // Find the faculty and course based on their IDs
      const selectedFaculty = getAllFaculty?.data?.find(item => item.id === editData.faculty_id);
      const selectedCourse = selectedFaculty?.courses?.find(course => course.id === editData.course_id); // Assuming courses are under faculty

      // Set states with found titles
      setFaculty(selectedFaculty ? selectedFaculty.title : "Select a Faculty");
      setCourse(selectedCourse ? selectedCourse.title : "Select a Course");
      setDescription(editData.content || ""); // Adjust according to your data structure
      // Do not reset selectedFile; it will depend on user interaction
    }
  }, [editData]);

  const uploadAssignment = () => {
    const selectedCourse = filteredData?.courses?.find(
      (item) => item.title === course
    );

    if (!filteredData || !selectedCourse) {
      toast.error("Please select a valid faculty and course.");
      return;
    }

    if (!selectedFile && !editData) { // Allow submission if editing
      toast.error("Please upload a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    if (role === "admin") {
      formData.append("title", `${course} Assignment`);
      formData.append("course_id", selectedCourse.id);
      formData.append("faculty_id", filteredData.id);
      formData.append("created_by_id", userCredentials.id);
      formData.append("content", description);
      if (selectedFile) formData.append("file", selectedFile); // Only add if new file
      formData.append("image", selectedCourse.image);
      formData.append("status", "active");
    } else {
      formData.append("assignment_id", editData ? editData.id : "2"); // Use editData ID if editing
      formData.append("course_id", selectedCourse.id);
      formData.append("faculty_id", filteredData.id);
      formData.append("created_by_id", userCredentials.id);
      formData.append("text_submission", description);
      if (selectedFile) formData.append("file_submission", selectedFile); // Only add if new file
      formData.append("status", editData ? "update" : "submit");
    }

    const myHeaders = {
      Authorization: `Bearer ${userCredentials.token}`,
    };

    const apiFunc = editData ? 'updateAssignment' : (role === "admin" ? 'addAssignment' : 'submitAssignment');

    axios
      .post(`${BASE_URL}course/${apiFunc}`, formData, { headers: myHeaders })
      .then((response) => {
        toast.success(response?.data.message || "Assignment submitted successfully");
        setLoading(false);
        resetFields(); // Reset fields after successful upload
      })
      .catch((error) => {
        console.error("Upload error:", error, error.response ? error.response.data : error.message);
        toast.error(error?.message || error?.data?.message || "An error occurred during upload.");
        setLoading(false);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5242880) {
        toast.error("File size should not exceed 5MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } });
    }
  };

  const resetFields = () => {
    setFaculty("Select a Faculty");
    setCourse("Select a Course");
    setDescription("");
    setSelectedFile(null);
  };

  useEffect(() => {
    const selectedFaculty = getAllFaculty?.data?.find((item) => item.title === faculty);
    setFilteredData(selectedFaculty);
  }, [faculty, getAllFaculty]);

  return (
    <div className="flex flex-col p-3 p-md-5 min-vh-100 poppins" style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        {(role === "admin")  ? (editData ? "Edit Assignment" : 'Add Assignment') : 'Upload Assignment'}
    
      </p>

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
            className="p-2 md:p-3 absolute w-[98%] min-h-full left-0 top-0 text-sm opacity-0 cursor-pointer rounded-md"
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
          <p className="border-l border-gray-500 md:pl-7 pl-4 text-red-500">
            <IoIosArrowDown size="20" />
          </p>
        </section>
      </div>

      {/* Course Dropdown */}
      <div className="font-medium my-3">
        <section className="relative flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
          <div className="flex flex-col gap-y-2">
            <p className="text-xs md:text-[16px] capitalize">{course}</p>
            <p className="text-xs md:text-sm text-gray-600 capitalize">Select Course</p>
          </div>
          <small className="font-bold ml-auto px-[2px] text-[10px] md:text-xs text-red-500">
            {prof}
          </small>
          <select
            className="p-2 md:p-3 w-[98%] absolute min-h-full left-0 top-0 text-sm opacity-0 cursor-pointer rounded-md"
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

      {/* Description Field */}
      <div className="font-medium my-2 border-[1px] border-red-500 p-2 md:p-3">
      <p className='text-sm md:text-[16px]'>{role === "admin" ? "Assignment":"Submission"}</p>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Assignment description..."
          className="h-28 w-full bg-transparent placeholder:text-gray-400 placeholder:text-sm p-2"
        />
      </div>

      {/* File Upload Section */}
      <div>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`font-medium my-2 flex flex-col items-center gap-2 border-[1px] border-red-500 rounded-md px-3 py-4 ${isDragging ? "bg-gray-200":""}`}>
          <FaFileUpload size={24} className="text-gray-700 mb-2" />
          <p className="text-gray-600 text-center text-sm">
{selectedFile ? selectedFile.name: 'Drag and drop your file here or click to upload'}</p>
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInput}
          />
          <button
            type="button"
            onClick={() => fileInput.current.click()}
            className="mt-2 bg-transparent border-[1px] border-gray-700 text-gray-500 px-6 py-2 rounded-md font-medium"
          >
            Select File
          </button>
        </div>
        
      </div>

      {/* Submit Button */}
      <div className="my-4 flex items-center justify-center">
        <button
          onClick={uploadAssignment}
          className={`bg-[navy] text-white my-2 py-2 px-8 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : (role === "admin" ? (editData ? "Edit" : 'Upload'):"Submit")}
        </button>
      </div>
    </div>
  );
};

export default UploadAssignment;
