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
  const { setGetAllFaculty, getAllFaculty } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);
  const role = userCredentials?.user.role.toLowerCase();
  const editData = location.state?.editData || null;

  const [filteredData, setFilteredData] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [faculty, setFaculty] = useState("Select a Faculty");
  const [course, setCourse] = useState("Select a Programme");
  const [prof, setProf] = useState("Prof Samuel Attong"); // Default professor value
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
  }, []);

  // Sync faculty and course when editData is provided
  useEffect(() => {
    if (editData) {
      const facultyItem = getAllFaculty?.data?.find(item => item.id === editData.faculty_id);
      setSelectedFaculty(facultyItem || null);

      const courseItem = facultyItem?.courses?.find(course => course.id === editData.course_id);
      setSelectedCourse(courseItem || null);

      setFaculty(facultyItem ? facultyItem.title : "Select a Faculty");
      setCourse(courseItem ? courseItem.title : "Select a Programme");
      setDescription(editData.content || "");
    }
  }, [editData, getAllFaculty]);

  // Sync selected faculty with user input
  useEffect(() => {
    const facultyItem = getAllFaculty?.data?.find(item => item.title === faculty);
    setSelectedFaculty(facultyItem || null);

    if (editData && facultyItem) {
      const matchingCourse = facultyItem.courses.find(course => course.id === editData.course_id);
      setCourse(matchingCourse ? matchingCourse.title : "Select a Programme");
    } else {
      const matchingCourse = facultyItem?.courses.find(item => item.title === course);
      setCourse(matchingCourse ? matchingCourse.title : "Select a Programme");
    }
  }, [faculty, getAllFaculty]);

  // Sync selected course with user input and load assignments for non-admin users
  useEffect(() => {
    if (selectedFaculty) {
      const courseItem = selectedFaculty.courses?.find(item => item.title === course);
      setSelectedCourse(courseItem || null);

      if (role !== "admin" && courseItem) {
        axios
          .get(`${BASE_URL}course/getAllAssignmentCourse/${courseItem.id}`, { headers: myHeaders })
          .then((response) => {
            const newAssignmentId = response.data?.allAssignment[0]?.id || null;
            setAssignmentId(newAssignmentId);
            if (newAssignmentId === null) {
              toast.error("No Assignment Found for this course");
            }
          })
          .catch((error) => {
            console.error("Error fetching assignment:", error);
            toast.error("Error fetching assignment for this course");
            setAssignmentId(null);
          });
      }
    }
  }, [course, selectedFaculty, role]);

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
    const apiFunc = role === "admin" ? (editData ? 'updateAssignment' : 'addAssignment') : 'submitAssignment';

    if (role === "admin") {
      if (editData) formData.append("id", editData.id);
      formData.append("title", `${course} Assignment`);
      formData.append("course_id", selectedCourse.id);
      formData.append("faculty_id", selectedFaculty.id);
      formData.append("created_by_id", userCredentials?.user?.id);
      formData.append("content", description);
      if (selectedFile) formData.append("file", selectedFile);
      formData.append("image", editData ? editData.image : selectedCourse.image);
      formData.append("status", "active");
    } else {
      formData.append("assignment_id", assignmentId);
      formData.append("course_id", selectedCourse.id);
      formData.append("faculty_id", selectedFaculty.id);
      formData.append("created_by_id", userCredentials?.user?.id);
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
        navigate(role === "admin" ? '/view-assignments' : '/submitted-assignments');
      })
      .catch((error) => {
        console.error("Upload error:", error);
        toast.error(error.response?.data?.message || "An error occurred during upload.");
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
    setCourse("Select a Programme");
    setDescription("");
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col p-3 p-md-5 min-vh-100 poppins" style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        {role === "admin" ? (editData ? "Edit Assignment" : 'Add Assignment') : 'Upload Assignment'}
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
        <p className="text-xs md:text-sm my-2">Choose RSBPP Programme</p>
        <section className="relative flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
          <div className="flex flex-col gap-y-2">
            <p className="text-xs md:text-[16px] capitalize">{course}</p>
            <p className="text-xs md:text-sm text-gray-600 capitalize overflow-hidden">
              {selectedCourse
                ? `${selectedCourse.description.split(" ").slice(0, 8).join(" ")}...`
                : "Select Programme"}
            </p>
          </div>
          <select
            className="p-2 md:p-3 absolute w-[98%] min-h-full left-0 top-0 text-sm opacity-0 cursor-pointer rounded-md"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option disabled value="Select a Programme">
              Select a Programme
            </option>
            {selectedFaculty?.courses?.map((courseItem, index) => (
              <option key={index} value={courseItem.title}>
                {courseItem.title}
              </option>
            ))}
          </select>
          <p className="border-l border-gray-500 md:pl-7 pl-4 text-red-500">
            <IoIosArrowDown size="20" />
          </p>
        </section>
      </div>

      {/* File Upload */}
      <div
        className={`border-2 border-dashed rounded-md p-5 mt-5 mb-4 ${isDragging ? "border-blue-500" : "border-gray-500"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf, .doc, .docx"
        />
        <p className="text-center text-gray-500">
          {selectedFile ? selectedFile.name : "Drag and drop your file here, or click to upload"}
        </p>
        <button type="button" onClick={() => fileInput.current.click()} className="mt-2 text-blue-500">
          Choose File
        </button>
      </div>

      {/* Description Field */}
      <textarea
        className="border-2 border-gray-300 rounded-md p-2 w-full"
        placeholder="Enter assignment description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={uploadAssignment}
        className="bg-blue-500 text-white p-2 rounded-md mt-4"
        disabled={loading}
      >
        {loading ? <Spinner animation="border" size="sm" /> : "Upload Assignment"}
      </button>
    </div>
  );
};

export default UploadAssignment;
