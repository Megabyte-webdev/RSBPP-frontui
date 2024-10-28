import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../components/utils/base';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthContext';
import { ResourceContext } from '../context/ResourceContext';
import { useNavigate } from 'react-router-dom';

const AllAssignment = () => {
    const navigate = useNavigate();
    const { getAllFaculty, setGetAllFaculty } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);
    const role = userCredentials?.user?.role;
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submissions, setSubmissions] = useState({});
    const [submissionsLoading, setSubmissionsLoading] = useState({});

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Number of assignments per page

    useEffect(() => {
        const fetchAssignments = async () => {
            setLoading(true);
            const myHeaders = {
                Authorization: `Bearer ${userCredentials.token}`,
            };

            try {
                const response = await axios.get(`${BASE_URL}course/${role === "instructor" ? "getAllAssignment" : "getAssignmentSubmitCourseAll"}`, { headers: myHeaders });
                setAssignments(role === "instructor" ? response.data.allAssignment : response.data.allAssignmentSubmit || []);
                setGetAllFaculty(prev => ({ ...prev, isDataNeeded: true }));
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching assignments:", error);
                toast.error("Failed to load assignments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [userCredentials]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            const newSubmissionsLoading = {};
            const newSubmissions = {};

            for (const assignment of assignments) {
                newSubmissionsLoading[assignment.course_id] = true;
                const myHeaders = {
                    Authorization: `Bearer ${userCredentials.token}`,
                };

                try {
                    const response = await axios.get(`${BASE_URL}course/getAssignmentSubmit/${assignment.course_id}`, { headers: myHeaders });
                    newSubmissions[assignment.course_id] = response.data.allAssignmentSubmit || [];
                } catch (error) {
                    console.error("Error fetching submissions:", error);
                    newSubmissions[assignment.course_id] = [];
                } finally {
                    newSubmissionsLoading[assignment.course_id] = false;
                }
            }

            setSubmissions(newSubmissions);
            setSubmissionsLoading(newSubmissionsLoading);
        };

        if (assignments.length > 0) {
            fetchSubmissions();
        }
    }, [assignments, userCredentials]);



const fetchContent = (assignmentId) => {
 
   axios.get(`${BASE_URL}course/getAssignment/${assignmentId}`, { headers: myHeaders }).then(response=>
return response?.data?.assignment 
).catch(err=>
return {content:"..."}
)
                   
}

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

    const handleEdit = (assignment, event) => {
        event.stopPropagation(); // Prevents the row click event
        navigate('/upload-assignment', { state: { editData: assignment } });
    };


    const handleViewAssignments = async (assignment) => {
        if (role === "instructor") {
            const course = await getDetails('course', assignment.course_id, assignment.faculty_id);
            if (course) {
                navigate(`/view-assignments/${course.title}`, { state: { courseId: assignment.course_id } });
            }
        } else {
            navigate(`/view-grade/${assignment.course_label}`, { state: { assignment: assignment } });

        }
    };

    // Calculate total pages
    const totalPages = Math.ceil(assignments.length / pageSize);

    // Slice assignments for current page
    const displayedAssignments = assignments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="flex flex-col p-4 md:p-8 min-h-max w-full font-sans">
            <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
                All Assignments
            </p>

            {/* Pagination Controls */}
            <div className="flex justify-between my-2">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md'>Prev</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md'>Next</button>
            </div>

            <div className='overflow-x-auto mt-6'>
                {loading ? (
                    <p>Loading...</p>
                ) : displayedAssignments.length > 0 ? (
                    <table className="w-full min-w-[700px] overflow-auto bg-white rounded-lg border border-gray-300">
                        <thead className='bg-gray-200 font-medium'>
                            <tr>
                                <th className='p-2 mx-2 text-left min-w-[50px]'>S/N</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Assignment</th>
   <th className='p-2 mx-2 text-left min-w-[150px]'>Course Name</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Faculty</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Date Added</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>{role === "instructor" ? 'Submissions' : 'Grade'}</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Status</th>
                                {role === "instructor" && <th className='p-2 mx-2 text-left min-w-[150px]'>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {displayedAssignments.map((row, index) => (
                                <tr className='cursor-pointer' key={row.id} onClick={() => { handleViewAssignments(row) }}>
                                    <td className='p-2 mx-2 min-w-[50px]'>{(currentPage - 1) * pageSize + index + 1}</td>

 <td className='p-2 mx-2 min-w-[150px]'>
  {role === "instructor" ? row?.content : fetchContent(row?.assignment_id)?.content || 'Loading...'}
</td>

 <td className='p-2 mx-2 min-w-[150px]'>{getDetails('course', row.course_id, row.faculty_id)?.title}</td>
   
                                <td className='p-2 mx-2 min-w-[150px]'>{getDetails('faculty', row.course_id, row.faculty_id)?.title}</td>
                                    <td className='p-2 mx-2 min-w-[150px]'>{formatDate(row.created_at)}</td>
                                    <td className='p-2 mx-2 text-left'>
                                        {role === 'instructor' ? (submissionsLoading[row.course_id] ? "Loading..." : (submissions[row.course_id]?.length || 0)) : row?.grade || 'pending'}
                                    </td>
                                    <td className='p-2 mx-2'>{row?.grade ? 'graded' : 'pending'}</td>
                                    {role === "instructor" && <td className='p-2 mx-2'>
                                        <button onClick={(e,) => handleEdit(row, e)} className='bg-blue-500 text-white font-semibold px-2 py-1 rounded-md'>Edit</button>
                                    </td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No assignments available.</p>
                )}
            </div>


        </div>
    );
};

export default AllAssignment;
