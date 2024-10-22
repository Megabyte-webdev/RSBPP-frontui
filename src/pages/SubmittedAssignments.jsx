import { useContext, useEffect, useState } from 'react';
import { BASE_URL, IMAGE_URL } from '../components/utils/base';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthContext';
import { ResourceContext } from '../context/ResourceContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SubmittedAssignments = () => {
  const location = useLocation();
  const { course } = useParams();
  console.log(course)
  const navigate = useNavigate();
  const { getAllFaculty, setGetAllFaculty } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const myHeaders = {
      Authorization: `Bearer ${userCredentials.token}`,
    };

    if (course) {
      setLoading(true);
      const { courseId } = location.state;
      axios.get(`${BASE_URL}course/getAssignmentSubmit/${courseId}`, { headers: myHeaders })
        .then((response) => {
          console.log("API Response:", response.data);
          setAssignments(response?.data?.allAssignmentSubmit || []);
          setGetAllFaculty(prev => ({ ...prev, isDataNeeded: true }));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching assignments:", error);
          toast.error("Failed to load assignments.");
          setLoading(false);
        });
    }
  }, [userCredentials,course]);

  const getDetails = (attr, info, facId) => {
    const faculty = getAllFaculty?.data?.find((item) => item.id === facId);
    if (!faculty) return { title: 'N/A' };
    if (attr === 'course') {
      return faculty.courses?.find((item) => item.id === info) || { title: 'N/A' };
    }
    return faculty;
  };

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="p-8 min-h-max bg-gray-50 flex flex-col gap-y-2">
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        View Submitted Assignments
      </p>
      {assignments.length !== 0 ? (<div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        
        {assignments?.map((row) => (
          <div
            onClick={() => { navigate('/grade-assignment', { state: { assignment: row } }); scrollTo(0, 0) }}
            key={row.id}
            className="min-h-[300px] cursor-pointer bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
          >
            <img
              src='https://via.placeholder.com/100'
              alt={row?.user_id}
              className="w-28 h-28 rounded-full mb-4"
            />
            <h3 className="text-lg text-center font-semibold mt-auto">Aflabi Mubarak</h3>
            <p className="text-sm text-gray-600">{getDetails('course', row.course_id, row.faculty_id)?.title}</p>
            <p className="text-sm text-gray-400">{row?.email}</p>
            <p className="text-xs text-gray-500">
              Date Submitted: {formatDate(row?.created_at)}
            </p>

            <p className={`text-[14px] mt-1 ${row?.grade !== null ? 'text-green-500':'text-red-500'} font-semibold`}>
              Grade: {row?.grade || 'Pending'}
            </p>
          </div>
        ))}
      </div>):(
        
        <div className="text-xl font-semibold">{loading ? 'Loading..' :' No Submitted Assignment'}</div>
        )}
    </div>
  );
};

export default SubmittedAssignments;
