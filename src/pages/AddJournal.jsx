import { BsJournalCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useContext, useRef } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { UserContext } from "../context/AuthContext";

const BASE_URL = "https://dash.rsbpp.nl/api/";

const AddJournal = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [remark, setRemark] = useState("");
  const fileInput = useRef(null); // Use ref for file input

  const { setGetAllFaculty, getAllFaculty } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);

  const addJournal = (selectedCourse) => {
    if (!filteredData) {
      setMessage("Please select a faculty.");
      return;
    }
    if (!selectedCourse) {
      setMessage("Please select a valid course.");
      return;
    }
    if (!fileInput.current.files.length) {
      setMessage("Please upload a file.");
      return;
    }

    setLoading(true);
    const formdata = new FormData();
    formdata.append("course_id", selectedCourse.id);
    formdata.append("faculty_id", filteredData.id);
    formdata.append("created_by_id", filteredData.id);
    formdata.append("text_submission", remark);
    formdata.append("file_submission", fileInput.current.files[0]);
    formdata.append("status", "");

    fetch(`${BASE_URL}course/addJournal`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userCredentials.token}`,
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message || "Journal submitted successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setMessage("An error occurred");
        setLoading(false);
      });
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

  const handleCourseSelection = () =>
    filteredData?.courses?.find((item) => item.title === course);

  return (
    <div
      className="flex flex-col p-3 p-md-5 min-vh-100 poppins"
      style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}
    >
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        <BsJournalCheck size="24" />
        Add Journal
      </p>
      <div>
        <p>{message && message}</p>
        {loading && <p>Loading...</p>}

        {/* Faculty Dropdown */}
        <div className="font-medium my-3">
          <p className="text-sm md:text-xl my-2">Choose RSBPP Faculty</p>
          <section className="relative flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
            <select
              className="p-2 md:p-3 w-full text-sm cursor-pointer rounded-md border-[1px] border-red-500"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option disabled value="">
                Select a Faculty
              </option>
              {getAllFaculty?.data?.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
            <IoIosArrowDown size="20" className="text-red-500" />
          </section>
        </div>

        {/* Course Dropdown */}
        <div className="font-medium my-3">
          <section className="flex items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
            <select
              className="p-2 md:p-3 w-full text-sm cursor-pointer rounded-md border-[1px] border-red-500"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option disabled value="">
                Select a Course
              </option>
              {filteredData?.courses?.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
            <IoIosArrowDown size="20" className="text-red-500" />
          </section>
        </div>

        {/* Remark Section */}
        <div className="font-medium my-3">
          <textarea
            cols="30"
            rows="5"
            className="p-2 w-full bg-transparent border-[1px] border-red-500 rounded-md placeholder:text-gray-500"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Add Description"
          />
        </div>

        {/* File Input */}
        <input
          type="file"
          ref={fileInput}
          className="my-3"
          accept="application/pdf, image/*"
        />

        {/* Submit Button */}
        <button
          onClick={() => addJournal(handleCourseSelection())}
          className="my-3 mx-auto w-48 px-8 py-2 text-white bg-[navy] rounded-md font-medium"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddJournal;
