import { useContext, useEffect, useState, useMemo } from 'react';
import { BASE_URL, IMAGE_URL } from '../components/utils/base';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthContext';
import { ResourceContext } from '../context/ResourceContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SubmittedAssignments = () => {
  const location = useLocation();
  const { course } = useParams();
  const navigate = useNavigate();
  const { setGetAllFaculty, setGetAllUsers, getAllUsers } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const myHeaders = {
      Authorization: `Bearer ${userCredentials.token}`,
    };

    if (course) {
      const { courseId } = location.state;
      setLoading(true);

      axios
        .get(`${BASE_URL}course/getAssignmentSubmit/${courseId}`, { headers: myHeaders })
        .then((response) => {
          console.log("API Response:", response.data);
          setAssignments(response?.data?.allAssignmentSubmit || []);
          setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
          setGetAllUsers((prev) => ({ ...prev, isDataNeeded: true }));
        })
        .catch((error) => {
          console.error("Error fetching assignments:", error);
          toast.error("Failed to load assignments.");
        })
        .finally(() => setLoading(false));
    }
  }, [userCredentials.token, course, location.state, setGetAllFaculty, setGetAllUsers]);

  const GetUserDetails = useMemo(() => {
    return (userId) => {
      const user = getAllUsers?.data?.find((item) => item.id === userId);
      return user || { first_name: "N/A", last_name: "", role: "N/A", email: "", image: "" };
    };
  }, [getAllUsers]);

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="p-8 min-h-max bg-gray-200 flex flex-col gap-y-2">
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        View Submitted Assignments
      </p>

      {loading ? (
        <div className="text-xl font-semibold">Loading...</div>
      ) : assignments.length === 0 ? (
        <div className="text-xl font-semibold">No Submitted Assignments</div>
      ) : (
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {assignments.map((row) => 
const user = GetUserDetails(row.user_id);

return(
              <div
                key={row.id}
                onClick={() => {
                  navigate('/grade-assignment', { state: { assignment: row } });
                  scrollTo(0, 0);
                }}
                className="min-h-[300px] cursor-pointer bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
              >
                <img
                  src={`${IMAGE_URL}profile/${user.image}` || 'https://via.placeholder.com/100'}
                  alt={row?.user_id}
                  className="w-28 h-28 rounded-full mb-4"
                />
                <h3 className="text-lg text-center font-semibold mt-auto">
                  {`${user.first_name} ${user.last_name}`}
                </h3>
                <p className="text-sm text-gray-600 my-[2px]">{user.role}</p>
                <p className="text-sm text-gray-600 my-[2px]">{user.email}</p>

                <div className="flex justify-between items-center text-[10px]">
                  <p
                    className={`mt-1 ${
                      row?.grade !== null ? 'text-green-500' : 'text-red-500'
                    } font-semibold`}
                  >
                    Grade: {row?.grade || 'Pending'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubmittedAssignments;
