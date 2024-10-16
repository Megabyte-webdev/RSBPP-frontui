import { BsJournalCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useContext } from "react";
import axios from "axios"; // Import Axios
import { ResourceContext } from "../context/ResourceContext";
import { UserContext } from "../context/AuthContext";

const BASE_URL = "https://dash.rsbpp.nl/api/";

const AddJournal = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState("Select a Faculty");
  const [course, setCourse] = useState("Select a Programme");
  const [prof, setProf] = useState("Prof Samuel Attong");
  const [remark, setRemark] = useState("");

  const { setGetAllFaculty, getAllFaculty } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);

  const addJournal = (selectedCourse) => {
    if (!filteredData || !selectedCourse) {
      setMessage("Please select a valid faculty and course.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("course_id", selectedCourse.id);
    formData.append("faculty_id", filteredData.id);
    formData.append("created_by_id", filteredData.id);
    formData.append("text_submission", remark);
    formData.append("status", "");

    axios
      .post(`${BASE_URL}course/addJournal`, formData, {
        headers: {
          Authorization: `Bearer ${userCredentials.token}`,
        },
      })
      .then((response) => {
        setMessage(response.data.message || "Journal submitted successfully");
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
        <BsJournalCheck size="24" />Add Journal
      </p>
      <div>
        <p>{message && message}</p>
        {loading && <p>Loading...</p>}

        {/* Faculty Dropdown */}
        <div className="font-medium my-3">
          <p className="text-sm md:text-xl my-2">Choose RSBPP Faculty</p>
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
        <div className="relative font-medium my-3">
          <section className="flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
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
              <option disabled value="Select a Programme">
                Select a Course
              </option>
              {filteredData?.courses?.map((item, index) => (
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

        {/* Remark Section */}
        <div className="font-medium my-3">
          <section className="flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
            <div className="flex-1 flex flex-col gap-y-2">
              <p className="text-sm md:text-[16px] capitalize">Remark</p>
              <textarea
                cols="30"
                className="p-2 h-28 w-full bg-transparent placeholder:text-gray-500 placeholder:text-sm"
                value={remark}
                onInput={(e) => setRemark(e.target.value)}
                placeholder="Add Description"
              />
            </div>
          </section>
        </div>

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
