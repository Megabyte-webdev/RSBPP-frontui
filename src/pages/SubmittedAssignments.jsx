import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../components/utils/base';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthContext';
import { ResourceContext } from '../context/ResourceContext';
import { useNavigate } from 'react-router-dom';

const SubmittedAssignments = ({ user }) => {
  const navigate = useNavigate();
  const { getAllFaculty, setGetAllFaculty } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const myHeaders = {
      Authorization: `Bearer ${userCredentials.token}`,
    };

    axios.get(`${BASE_URL}course/getAllAssignment`, { headers: myHeaders })
      .then((response) => {
        console.log("API Response:", response.data);
        setAssignments(response?.data?.allAssignment || []);
        setGetAllFaculty(prev => ({ ...prev, isDataNeeded: true }));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
        toast.error("Failed to load assignments.");
        setLoading(false);
      });
  }, [userCredentials]);

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

  /*content
: 
"New Assignment"
course_id
: 
57
created_at
: 
"2024-10-18T10:44:02.000000Z"
created_by_id
: 
76
faculty_id
: 
12
file
: 
"assignment/Screenshot 2024-09-27 234439.png_1729248242_assignment_file.png"
id
: 
1
image
: 
""
status
: 
"active"
title
: 
"Engineering Mathematics Assignment"
updated_at
: 
"2024-10-18T10:44:02.000000Z"
*/
  return (
    <div className="p-8 min-h-max bg-gray-50 flex flex-col gap-y-2">
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        View Submitted Assignments
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">

        {assignments.map((row) => (
          <div
            key={row.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <img
              src={row?.image || 'https://via.placeholder.com/100'}
              alt={row?.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-lg text-center font-semibold">{getDetails('course', row.course_id, row.faculty_id)?.title}</h3>
            <p className="text-sm text-gray-500">{getDetails('faculty', row.course_id, row.faculty_id)?.title}</p>
            <p className="text-sm text-gray-400">{row?.email}</p>
            <p className="text-xs text-gray-500">
              Submitted by: {row?.submittedBy}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmittedAssignments;
