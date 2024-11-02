import { useLocation } from "react-router-dom";
import { ResourceContext } from "../context/ResourceContext";
import { UserContext } from "../context/AuthContext";
import { useContext, useEffect, useState, useMemo } from "react";
import { BASE_URL, IMAGE_URL } from "../components/utils/base";
import axios from "axios";
import toast from "react-hot-toast";
import GradeDetails from "./GradeDetails";
import { Spinner } from "react-bootstrap";

const GradeAssignment = () => {
  const location = useLocation();
  const { assignment } = location.state;
  const [loading, setLoading] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(true);
  const [remark, setRemark] = useState(assignment?.remark || "");
  const [score, setScore] = useState(assignment?.grade || 0);
  const [submissionId, setSubmissionId] = useState(null);

  const { setGetAllFaculty, getAllFaculty, setGetAllUsers, getAllUsers } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);

  useEffect(() => {
    // Fetch submission details when component loads
    axios
      .get(`${BASE_URL}course/getAssignmentSubmit/${assignment.course_id}`, {
        headers: {
          Authorization: `Bearer ${userCredentials.token}`,
        },
      })
      .then((response) => {
        const submission = response.data.allAssignmentSubmit.find(sub => sub.user_id === assignment.user_id && sub.assignment_id === assignment.assignment_id);
        if (submission) {
          setSubmissionId(submission.id);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || "Error confirming assignment submission");
      })
      .finally(() => setSubmissionLoading(false));
  }, [assignment.course_id, assignment.user_id, userCredentials.token]);

  useEffect(() => {
    // Ensure data is marked as needed to trigger fetch
    setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
    setGetAllUsers((prev) => ({ ...prev, isDataNeeded: true }));
  }, [setGetAllFaculty, setGetAllUsers]);

  const handleGrade = () => {
    if (!submissionId) return;

    if (!remark || !score) {
      toast.error("Enter grade and comment");
      return;
    }

    const details = { id: submissionId, grade: score, remark };

    setLoading(true);
    axios
      .post(`${BASE_URL}course/gradeAssignmentSubmit`, details, {
        headers: { Authorization: `Bearer ${userCredentials.token}` },
      })
      .then((response) => {
        toast.success(response.data.message || "Remark sent");
        // Update the assignment state with the new values
        assignment.grade = score; // Update the assignment with the new grade
        assignment.remark = remark; // Update the assignment with the new remark
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "An error occurred");
      })
      .finally(() => setLoading(false));
  };

  const getUserDetails = useMemo(() => {
    const user = getAllUsers?.data?.find((item) => item.id === assignment.user_id);
    return user || { first_name: "N/A", last_name: "", role: "N/A", email: "", image: "" };
  }, [assignment.user_id, getAllUsers]);

  return (
    <div className="px-[2%] flex flex-col items-center gap-3 min-[800px]:items-start min-[800px]:flex-row">
      <div className="w-80 gap-4 pt-5 gap-y-6 px-2 sm:px-0">
        <div
          key={assignment.id}
          className="h-max cursor-pointer bg-white shadow-md shadow-slate-600 rounded-lg p-6 flex flex-col items-center"
        >
          {submissionLoading ? (
            <Spinner animation="border" />
          ) : (
            <>
              <img
                src={`${IMAGE_URL}profile/${getUserDetails.image}` || 'https://via.placeholder.com/100'}
                alt={assignment?.user_id}
                className="w-28 h-28 rounded-full mb-4"
              />
              <h3 className="text-lg text-center font-semibold mt-auto">
                {`${getUserDetails.first_name} ${getUserDetails.last_name}`}
              </h3>
              <p className="text-sm text-gray-600 my-[2px]">{getUserDetails.role}</p>
              <p className="text-sm text-gray-600 my-[2px]">{getUserDetails.email}</p>
              <div className="flex justify-between items-center text-[10px]">
                <p className={`mt-1 ${assignment?.grade !== null ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                  Grade: {assignment?.grade || 'Pending'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 w-full">
        <GradeDetails
          handleGrade={handleGrade}
          data={assignment}
          score={score}
          setScore={setScore}
          remark={remark}
          setRemark={setRemark}
        />

        {/* Submit Button */}
        <div className="flex items-center justify-center mt-[-3px] mb-2">
          <button
            onClick={handleGrade}
            className={`bg-[navy] text-white py-2 px-8 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            <span>{assignment?.grade ? 'Update' : 'Submit'}</span>
            {loading && <Spinner animation="border" size="sm" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradeAssignment;
