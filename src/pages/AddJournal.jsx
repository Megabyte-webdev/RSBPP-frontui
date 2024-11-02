import { BsJournalCheck } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ResourceContext } from "../context/ResourceContext";
import { UserContext } from "../context/AuthContext";
import { BASE_URL } from "../components/utils/base";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";

const AddJournal = () => {
  const navigate = useNavigate(); // Used for navigation
  const location = useLocation(); // Get location object

  // Extract editData and determine if we're in edit mode
  const editData = location.state?.editData || null;
  const isEditMode = Boolean(editData); // Define isEditMode

  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState("Select a Faculty");
  const [course, setCourse] = useState("Select a Programme");
  const [prof, setProf] = useState("");
  const [remark, setRemark] = useState("");
  const { setGetAllFaculty, getAllFaculty, getEnrolledCourses, setGetEnrolledCourses } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);



  // Load all faculty data on component mount
  useEffect(() => {
    setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));

  }, []);

  useEffect(() => {
    setGetEnrolledCourses((prev) => {
      return {
        ...prev, isDataNeeded: true
      }
    })
  }, [])


  // Filter faculties based on enrolled courses
  const relevantFaculties = getAllFaculty?.data?.filter((faculty) =>
    faculty.courses?.some((course) =>
      getEnrolledCourses?.data?.some(
        (enrolled) => enrolled.courseId === course.id
      )
    )
  )
    || [];
  // Populate data if in edit mode
  useEffect(() => {

    if (isEditMode) {
      const selectedFaculty = getAllFaculty?.data?.find(
        (item) => item.id === editData.faculty_id
      );
      const selectedCourse = selectedFaculty?.courses?.find(
        (course) => course.id === editData.course_id
      );

      setFaculty(selectedFaculty ? selectedFaculty.title : "Select a Faculty");
      setCourse(selectedCourse ? selectedCourse.title : "Select a Programme");
      setRemark(editData.text_submission || "");
    }
  }, []);

  useEffect(() => {
    const selectedFaculty = getAllFaculty?.data?.find(
      (item) => item.title === faculty
    );
    setFilteredData(selectedFaculty);
if(editData && faculty){
  const matchFaculty = getAllFaculty?.data?.find(
    (item) => item.id === editData.faculty_id
  );

  if(faculty !== "Select a Faculty" && matchFaculty.title !== faculty){
  console.log("select a course")
  setCourse("Select a Programme")
}else{
  const selectedCourse = selectedFaculty?.courses?.find(
    (course) => course.id === editData.course_id
  );
  setCourse(selectedCourse && selectedCourse.title)
}
}else{
  setCourse("Select a Programme")
}

  }, [faculty, getAllFaculty]);

  const handleCourseSelection = () =>
    filteredData?.courses?.find((item) => item.title === course);

  const submitJournal = (selectedCourse) => {
    if (!filteredData || !selectedCourse) {
      toast.error("Please select a valid faculty and course.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    editData && formData.append("id", editData.id);
    formData.append("course_id", selectedCourse.id);
    formData.append("faculty_id", filteredData.id);
    formData.append("created_by_id", userCredentials.user.id);
    formData.append("text_submission", remark);
    formData.append("status", editData ? editData.status : "draft"); // Replace "draft" with the expected default status.


    console.log([...formData])

    const url = isEditMode
      ? `${BASE_URL}course/updateJournal`
      : `${BASE_URL}course/addJournal`;

    axios
      .post(url, formData, {
        headers: {
  Authorization : `Bearer ${userCredentials?.token}`
},

      })
      .then((response) => {
        toast.success(response.data.message || "Journal saved successfully");
        setLoading(false);
        navigate("/view-journals");
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error?.response?.data?.message || "An error occurred"
        );
        setLoading(false);
      });
  };

  return (
    <div
      className="flex flex-col p-3 p-md-5 min-vh-100 poppins"
      style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}
    >
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        <BsJournalCheck size="24" />
        {isEditMode ? "Edit Journal" : "Add Journal"}
      </p>
      <div>
        {/* Faculty Dropdown */}
        <div className="font-medium my-3">
          <p className="md:text-sm text-xs my-2">Choose RSBPP Faculty</p>
          <section className="relative flex justify-between items-center gap-2 border-[1px] border-red-500 rounded-md p-2 md:p-3">
            <div className="flex flex-col gap-y-2">
              <p className="text-xs md:text-[16px] capitalize">{faculty}</p>
              <p className="text-xs md:text-sm text-gray-500 capitalize overflow-hidden">
                {filteredData
                  ? `${filteredData.description.split(" ").slice(0, 8).join(" ")}...`
                  : "Select Faculty"}
              </p>
            </div>
            <select
              className="p-2 md:p-3 absolute w-[98%] min-h-full left-0 top-0 text-sm opacity-0 cursor-pointer rounded-md border-[1px] border-red-500"
              disabled={isEditMode}
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option disabled value="Select a Faculty">
                Select a Faculty
              </option>
              {relevantFaculties?.map((item) => (
                <option key={item.id} value={item.title}>
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
              disabled={isEditMode}
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

        <div className="flex justify-center">
          <button
            onClick={() => submitJournal(handleCourseSelection())}
            className="w-48 my-2 px-8 py-2 text-white bg-[navy] rounded-md font-medium cursor-pointer"
            disabled={loading}
          >
            <span>{loading ? "Submitting..." : isEditMode ? "Update" : "Submit"}</span>
            {loading && <Spinner size="sm" className="ms-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJournal;