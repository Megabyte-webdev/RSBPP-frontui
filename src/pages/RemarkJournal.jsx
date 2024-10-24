import { BsJournalCheck } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { ResourceContext } from "../context/ResourceContext";
import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { BASE_URL, IMAGE_URL } from "../components/utils/base";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";

const RemarkJournal = () => {
  const location = useLocation();
  const remarkRef = useRef(null);
  const { journal } = location.state;

  const [loading, setLoading] = useState(false);
  const [remark, setRemark] = useState(journal?.remark);

  const { setGetAllUsers, getAllUsers, getAllFaculty, setGetAllFaculty } =
    useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);
  const role = userCredentials?.user?.role;

  useEffect(() => {
    setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
    setGetAllUsers((prev) => ({ ...prev, isDataNeeded: true }));
  }, []);

  const GetUserDetails = useMemo(() => {
    return (userId) => {
      const user = getAllUsers?.data?.find((item) => item.id === userId);
      return (
        user || { first_name: "N/A", last_name: "", role: "N/A", email: "", image: "" }
      );
    };
  }, [getAllUsers]);

  const user = GetUserDetails(journal?.user_id);

  const getDetails = (attr, info, facId) => {
    const faculty = getAllFaculty?.data?.find((item) => item.id === facId);
    if (!faculty) return { title: "N/A" };
    if (attr === "course") {
      return faculty.courses?.find((item) => item.id === info) || { title: "N/A" };
    }
    return faculty;
  };

  const handleRemark = () => {
    if (journal?.remark === remark) {
      remarkRef.current.focus();
      return;
    }

    let details = { id: journal?.id, remark: remark };
    setLoading(true);

    axios
      .post(`${BASE_URL}course/remarkJournal`, details, {
        headers: { Authorization: `Bearer ${userCredentials.token}` },
      })
      .then((response) => {
        toast.success(response.data.message || "Remark sent");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "An error occurred");
        setLoading(false);
      });
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen p-5 bg-gray-50"
      style={{ backgroundColor: "hsla(219, 50%, 95%, 0.3)" }}
    >
      {/* User Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={`${IMAGE_URL}/profile/${user?.image}`}
          alt="User Profile"
          className="w-32 h-32 rounded-full mb-2"
        />
        <p className="text-lg font-semibold">{user?.role}</p>
      </div>

      {/* User and Journal Details Section */}
      <div className="grid gap-6 w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DataField label="First Name" value={user?.first_name} />
          <DataField label="Last Name" value={user?.last_name} />
          <DataField label="Email" value={user?.email} />
          <DataField
            label="Faculty"
            value={getDetails("faculty", journal?.course_id, journal?.faculty_id)?.title}
          />
          <DataField label="Date of Birth" value={user?.dob} />
          <DataField
            label="Course"
            value={getDetails("course", journal?.course_id, journal?.faculty_id)?.title}
          />
        </div>

        {/* Journal Text Submission Section */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">Journal Submission</label>
          <div className="p-4 border bg-white rounded-md shadow-sm">
            <p className="text-gray-800 whitespace-pre-wrap">
              {journal?.text_submission || "No journal submitted."}
            </p>
          </div>
        </div>

        {/* Remark Section */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">Remark</label>
          <textarea
            ref={remarkRef}
            className="w-full h-24 p-3 border rounded-md"
            placeholder="Add Remark"
            value={remark}
            disabled={role !== "admin"}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>

        {/* Action Button */}
        {role === "admin" && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleRemark}
              className="w-48 px-4 py-2 text-white bg-blue-600 rounded-md"
              disabled={loading}
            >
              {loading ? (
                <Spinner size="sm" className="mr-2" />
              ) : (
                journal?.remark ? "Edit Remark" : "Add Remark"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable DataField Component
const DataField = ({ label, value }) => (
  <div className="flex flex-col">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="p-2 border bg-gray-100 rounded-md">{value || "N/A"}</p>
  </div>
);

export default RemarkJournal;
