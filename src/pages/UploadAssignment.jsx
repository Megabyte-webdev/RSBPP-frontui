import { FaFileUpload } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useContext, useRef } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { UserContext } from "../context/AuthContext";

const BASE_URL = "https://dash.rsbpp.nl/api/";

const UploadAssignment = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [faculty, setFaculty] = useState("Select a Faculty");
  const [course, setCourse] = useState("Select a Course");
  const [prof, setProf] = useState("Prof Samuel Attong");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInput = useRef(null); // Use ref for file input

  const { setGetAllFaculty, getAllFaculty } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);

  useEffect(() => {
    setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
  }, [userCredentials]);

  useEffect(() => {
    const selectedFaculty = getAllFaculty?.data?.find(
      (item) => item.title === faculty
    );
    setFilteredData(selectedFaculty);
  }, [faculty, getAllFaculty]);

  const handleCourseSelection = () =>
    filteredData?.courses?.find((item) => item.title === course);

  const uploadAssignment = () => {
    const selectedCourse = handleCourseSelection();
    if (!filteredData || !selectedCourse) {
      setMessage("Please select a valid faculty and course.");
      return;
    }
    if (!fileInput.current.files.length) {
      setMessage("Please upload a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("course_id", selectedCourse.id);
    formData.append("faculty_id", filteredData.id);
    formData.append("created_by_id", userCredentials.id);
    formData.append("text_submission", description);
    formData.append("file_submission", fileInput.current.files[0]);

    fetch(`${BASE_URL}course/uploadAssignment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userCredentials.token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message || "Assignment uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setMessage("An error occurred");
        setLoading(false);
      });
  };

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

        {/* Submission Section */}
        <div className="font-medium my-2">
          <section className="flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-3">
            <div className="flex-1 flex flex-col gap-y-2">
              <p className="text-sm md:text-[16px] capitalize">Submission</p>
              <textarea
                cols="30"
                className="p-2 h-28 w-full bg-transparent placeholder:text-gray-500 placeholder:text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add Description"
              />
            </div>
          </section>
        </div>

        {/* File Upload */}
        <div className="font-medium my-2 flex flex-col justify-center items-center h-max gap-2 border-[1px] border-red-500 rounded-md p-3">
          <FaFileUpload size="24" />
          <p>Choose a file or drag & drop it here</p>
          <button className="border-[1px] border-gray-600 my-2 mx-auto w-48 px-8 py-2 text-gray-700 bg-transparent rounded-2xl font-medium relative cursor-pointer">
            <input
              type="file"
              ref={fileInput}
              className="cursor-pointer absolute top-0 bottom-0 right-0 left-0 w-full h-full opacity-0 m-auto"
            />
            Browse File
          </button>
        </div>
      </div>

      <button
        onClick={uploadAssignment}
        className="my-2 mx-auto w-48 px-8 py-2 text-white bg-[navy] rounded-md font-medium"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default UploadAssignment;
