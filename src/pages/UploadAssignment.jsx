import { FaFileUpload } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ResourceContext } from "../context/ResourceContext";
import { UserContext } from "../context/AuthContext";
import { BASE_URL } from "../components/utils/base";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const UploadAssignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setGetAllFaculty, getAllFaculty, getAllCourses,setGetAllCourses } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);
  const role = userCredentials?.user?.role.toLowerCase();
  const editData = location.state?.editData || null;

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [faculty, setFaculty] = useState("Select a Faculty");
  const [course, setCourse] = useState("Select a Programme");
  const [prof, setProf] = useState("Prof Samuel Attong");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [assignmentId, setAssignmentId] = useState(null);

  const fileInput = useRef(null);
  const myHeaders = { Authorization: `Bearer ${userCredentials.token}` };

  // Load all faculty data on component mount
  useEffect(() => {
    setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
setGetAllCourses((prev) => ({ ...prev, isDataNeeded: true }));
  }, [setGetAllFaculty, setGetAllCourses]);

  useEffect(() => {
    if (role === "instructor") {
      const myCourse = getAllCourses?.data?.find((course) => course?.created_by_id === userCredentials.user.id);
      const facultyItem = getAllFaculty?.data?.find((f) => f.id === myCourse?.faculty_id);

      setSelectedFaculty(facultyItem || null);
      setFaculty(facultyItem ? facultyItem.title : "Select a Faculty");
    }
  }, [getAllCourses, getAllFaculty]);

  // Sync faculty and course when editData is provided
  useEffect(() => {
    if (editData) {
      const facultyItem = getAllFaculty?.data?.find((item) => item.id === editData.faculty_id);
      setSelectedFaculty(facultyItem || null);

      const courseItem = facultyItem?.courses?.find((c) => c.id === editData.course_id);
      setSelectedCourse(courseItem || null);

      setFaculty(facultyItem ? facultyItem.title : "Select a Faculty");
      setCourse(courseItem ? courseItem.title : "Select a Programme");
      setDescription(editData.content || "");
    }
  }, [editData, getAllFaculty]);

  // Sync selected faculty with user input
  useEffect(() => {
    const facultyItem = getAllFaculty?.data?.find((item) => item.title === faculty);
    setSelectedFaculty(facultyItem || null);

    if (editData && facultyItem) {
      const matchingCourse = facultyItem.courses.find((c) => c.id === editData.course_id);
      setCourse(matchingCourse ? matchingCourse.title : "Select a Programme");
    } else {
      const matchingCourse = facultyItem?.courses.find((c) => c.title === course);
      setCourse(matchingCourse ? matchingCourse.title : "Select a Programme");
    }
  }, [editData]);

  // Sync selected course with user input and load assignments for non-admin users
  useEffect(() => {
    if (selectedFaculty) {
      const courseItem = selectedFaculty.courses?.find((c) => c.title === course);
      setSelectedCourse(courseItem || null);

      if (role !== "admin" && courseItem) {
        axios
          .get(`${BASE_URL}course/getAllAssignmentCourse/${courseItem.id}`, { headers: myHeaders })
          .then((response) => {
            const newAssignmentId = response.data?.allAssignment[0]?.id || null;
            setAssignmentId(newAssignmentId);
            if (!newAssignmentId) toast.error("No Assignment Found for this course");
          })
          .catch((error) => {
            console.error("Error fetching assignment:", error);
            toast.error("Error fetching assignment for this course.");
            setAssignmentId(null);
          });
      }
    }
  }, [course, selectedFaculty]);

  const uploadAssignment = () => {
    if (!selectedFaculty || !selectedCourse) {
      toast.error("Please select a valid faculty and course.");
      return;
    }

    if (!selectedFile && !editData) {
      toast.error("Please upload a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    const apiFunc = role === "instructor" ? (editData ? "updateAssignment" : "addAssignment") : "submitAssignment";

    if (role === "instructor") {
      if (editData) formData.append("id", editData.id);
      formData.append("title", `${course} Assignment`);
      formData.append("course_id", selectedCourse.id);
      formData.append("faculty_id", selectedFaculty.id);
      formData.append("created_by_id", userCredentials.user.id);
      formData.append("content", description);
      if (selectedFile) formData.append("file", selectedFile);
      formData.append("image", editData ? editData.image : selectedCourse.image);
      formData.append("status", "active");
    } else {
      formData.append("assignment_id", assignmentId);
      formData.append("course_id", selectedCourse.id);
      formData.append("faculty_id", selectedFaculty.id);
      formData.append("created_by_id", userCredentials.user.id);
      formData.append("text_submission", description);
      if (selectedFile) formData.append("file_submission", selectedFile);
      formData.append("status", "submit");
    }

    axios
      .post(`${BASE_URL}course/${apiFunc}`, formData, { headers: myHeaders })
      .then((response) => {
        toast.success(response.data.message || "Assignment submitted successfully");
        setLoading(false);
        resetFields();
        navigate("/view-assignments");
      })
      .catch((error) => {
        console.error("Upload error:", error);
        toast.error(error.response?.data?.message || "An error occurred during upload.");
        setLoading(false);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 5242880) {
      setSelectedFile(file);
    } else {
      toast.error("File size should not exceed 5MB");
    }
  };

  const handleDragOver = (event) => event.preventDefault();
  const handleDrop = (event) => {
    event.preventDefault();
    handleFileChange({ target: { files: event.dataTransfer.files } });
  };

  const resetFields = () => {
    setFaculty("Select a Faculty");
    setCourse("Select a Programme");
    setDescription("");
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col p-3 p-md-5 min-vh-100 poppins" style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        {(role === "instructor") ? (editData ? "Edit Assignment" : 'Add Assignment') : 'Upload Assignment'}

      </p>

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
      <div className="relative font-medium my-3">
        <section className="flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
          <div className="flex flex-col gap-y-2">
            <p className="text-xs md:text-[16px] capitalize">{course}</p>
            <p className="text-xs md:text-sm text-gray-500 capitalize">
              Select Course
            </p>
          </div>
          <small className="font-bold ml-auto px-[2px] text-[10px] md:text-xs text-red-500">
            {prof}
          </small>
          <select
            className="p-2 md:p-3 absolute w-[98%] min-h-full left-0 top-0 text-sm opacity-0 cursor-pointer rounded-md border-[1px] border-red-500"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option disabled value="Select a Programme">
              Select a Course
            </option>
            {selectedFaculty?.courses?.map((item, index) => (
              <option key={index} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
          <p className="pl-[2px] md:pl-4 text-red-500">
            <IoIosArrowDown size="20" />
          </p>
        </section>
      </div>

      {/* Description Field */}
      <div className="font-medium my-2 border-[1px] border-red-500 p-2 md:p-3 rounded-md">
        <p className='text-sm md:text-[16px]'>{role === "instructor" ? "Assignment" : "Submission"}</p>
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
          className={`font-medium my-2 flex flex-col items-center gap-2 border-[1px] border-red-500 rounded-md px-3 py-4 ${isDragging ? "bg-gray-200" : ""}`}>
          <FaFileUpload size={24} className="text-gray-700 mb-2" />
          <p className="text-gray-600 text-center text-sm">
            {selectedFile ? selectedFile.name : 'Drag and drop your file here or click to upload'}</p>
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
          {loading ? <Spinner animation="border" size="sm" /> : (role === "instructor" ? (editData ? "Edit" : 'Upload') : "Submit")}
        </button>
      </div>
    </div>
  );
};

export default UploadAssignment;
