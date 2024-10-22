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
  const [prof, setProf] = useState("Prof Samuel Attong"); // Default professor name
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

  // Fetch instructors from API
  useEffect(() => {
    axios
      .get(`${BASE_URL}instructors`, { headers: myHeaders })
      .then((response) => {
        const instructors = response.data.instructors || [];
        // Set the professor's name based on the first instructor
        if (instructors.length > 0) {
          const firstInstructor = instructors[0];
          setProf(`${firstInstructor.title || ""} ${firstInstructor.first_name} ${firstInstructor.last_name}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
        toast.error("Failed to load instructors.");
      });
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
    const apiFunc = role === "admin" ? (editData ? "updateAssignment" : "addAssignment") : "submitAssignment";

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
        navigate(role === "admin" ? "/view-assignments" : "/submitted-assignments");
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
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
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
        {role === "admin" ? (editData ? "Edit Assignment" : "Add Assignment") : "Upload Assignment"}
      </p>

      {/* Faculty Dropdown */}
      {/* Rest of the UI remains unchanged */}
    </div>
  );
};

export default UploadAssignment;
