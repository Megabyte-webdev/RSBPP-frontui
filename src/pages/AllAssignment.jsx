import { useContext, useEffect, useState, useRef } from 'react';
import { BASE_URL } from '../components/utils/base';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthContext';
import { ResourceContext } from '../context/ResourceContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const AllAssignment = () => {
    const navigate = useNavigate();

    const assignmentsControllerRef = useRef(null);
    const submissionsControllerRef = useRef(null);
    const contentControllerRef = useRef(null);

    const { getAllFaculty, setGetAllFaculty } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);
    const role = userCredentials?.user?.role;
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submissions, setSubmissions] = useState({});
    const [submissionsLoading, setSubmissionsLoading] = useState({});
    const [assignmentContents, setAssignmentContents] = useState({});

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Number of assignments per page

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        const fetchAssignments = async () => {
            setLoading(true);
            const headers = { Authorization: `Bearer ${userCredentials.token}` };
            setGetAllFaculty(prev => ({ ...prev, isDataNeeded: false }));
            try {
                const response = await axios.get(
                    `${BASE_URL}course/${role === "instructor" ? "getAllAssignment" : "getAssignmentSubmitCourseAll"}`,
                    { headers, signal: controller.signal }
                );
                setAssignments(role === "instructor" ? response.data.allAssignment : response.data.allAssignmentSubmit || []);
                console.log(response.data)
                setGetAllFaculty(prev => ({ ...prev, isDataNeeded: true }));
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Fetch aborted");
                } else {
                    console.error("Error fetching assignments:", error);
                    toast.error("Failed to load assignments.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchAssignments();

        return () => {
            if (assignmentsControllerRef.current) assignmentsControllerRef.current.abort();
        };
    }, [userCredentials]);
    useEffect(() => {
        const controller = new AbortController();
    
        const fetchSubmissions = async () => {
            const newSubmissionsLoading = {};
            const newSubmissions = {};
    
            // Iterate over assignments and fetch submission data
            for (const assignment of assignments) {
                newSubmissionsLoading[assignment.course_id] = true;
                const headers = {
                    Authorization: `Bearer ${userCredentials.token}`,
                };
    
                try {
                    const response = await axios.get(
                        `${BASE_URL}course/getAssignmentSubmit/${assignment.course_id}`,
                        { headers, signal: controller.signal }
                    );
                    newSubmissions[assignment.course_id] = response.data.allAssignmentSubmit || [];
                } catch (error) {
                    if (!controller.signal.aborted) {
                        console.error("Error fetching submissions:", error);
                        newSubmissions[assignment.course_id] = [];
                    }
                } finally {
                    if (!controller.signal.aborted) {
                        newSubmissionsLoading[assignment.course_id] = false;
                    }
                }
            }
    
            // Update the state after all fetches are complete
            setSubmissions(newSubmissions);
            setSubmissionsLoading(newSubmissionsLoading);
        };
    
        // Trigger the fetch function only if there are assignments
        if (assignments.length > 0) {
            fetchSubmissions();
        }
    
        return () => {
            // Clean up and abort requests if the component unmounts or effect re-runs
            controller.abort();
        };
    }, [assignments, userCredentials]); // Dependencies: assignments and userCredentials
    
    const fetchContent = async (assignmentId) => {
        const controller = new AbortController();

        try {
            const response = await axios.get(
                `${BASE_URL}course/getAssignment/${assignmentId}`,
                { headers: { Authorization: `Bearer ${userCredentials.token}` }, signal: controller.signal }
            );
            return response?.data?.assignment?.content || 'No content available';
        } catch (error) {
            if (!axios.isCancel(error)) {
                console.error('Error fetching assignment content:', error);
            }
            return '...'; // Handle error gracefully
        }
    };

    const getContent = (assignmentId) => {
        if (assignmentContents[assignmentId]) {
            return assignmentContents[assignmentId]; // Return cached content if available
        } else if (assignmentContents[assignmentId] === 'loading') {
            return 'Loading...'; // Display loading while content is being fetched
        } else {
            // Mark as loading and fetch the content
            setAssignmentContents((prev) => ({
                ...prev,
                [assignmentId]: 'loading', // Mark the assignment as loading
            }));
    
            fetchContent(assignmentId).then((content) => {
                // Once content is fetched, update the state
                setAssignmentContents((prev) => ({
                    ...prev,
                    [assignmentId]: content, // Set the fetched content
                }));
            });
    
            return '...'; // Return loading until content is fetched
        }
    };
    

    const getDetails = (attr, info, facId) => {
        console.log(getAllFaculty)
        const faculty = getAllFaculty?.data?.find((item) => item.id === facId);
        if (!faculty) return { title: 'N/A' };
        if (attr === 'course') {
            return faculty.courses?.find((item) => item.id === info) || { title: 'N/A' };
        }
        return faculty;
    };

    const handleEdit = (assignment, event) => {
        event.stopPropagation();
        navigate('/upload-assignment', { state: { editData: assignment } });
    };

    const handleViewAssignments = async (assignment) => {
        if (role === "instructor") {
            const course = await getDetails('course', assignment.course_id, assignment.faculty_id);
            if (course) {
                navigate(`/view-assignments/${course.title}`, { state: { courseId: assignment.course_id, assignmentId: assignment.id } });
            }
        } else {
            navigate(`/view-grade/${assignment.course_label}`, { state: { assignment: assignment } });
        }
    };

    const totalPages = Math.ceil(assignments.length / pageSize);
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
                {role === " instructor" ? 'All Assignments' : 'Submitted Assignments'}
            </p>

            <div className="flex justify-between my-2 text-xs">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50'>Prev</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50'>Next</button>
            </div>

            <div className='overflow-x-auto mt-6'>
                {loading ? (
                    <p className="w-full h-full flex items-center justify-center"><Spinner /></p>
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
                                <tr className='cursor-pointer' key={row.id} onClick={() => handleViewAssignments(row)}>
                                    <td className='p-2 mx-2'>{(currentPage - 1) * pageSize + index + 1}</td>
                                    
                                    <td className='p-2 mx-2 min-w-[150px]'>
                                        {role === "instructor" ? row?.content : getContent(row?.assignment_id)}
                                    </td>  
                                    <td className='p-2 mx-2'>{getDetails('course', row.course_id, row.faculty_id)?.title}</td>
                                    <td className='p-2 mx-2'>{getDetails('faculty', row.course_id, row.faculty_id)?.title}</td>
                                    <td className='p-2 mx-2 min-w-[150px]'>{new Date(row.created_at).toLocaleDateString()}</td>
                                    <td className='p-2 mx-2 text-left'>
                                        {role === 'instructor' ? (
                                            submissionsLoading[row.course_id] ?
                                                <Spinner /> :
                                                (Array.isArray(submissions[row.course_id]) ?
                                                    submissions[row.course_id].filter(
                                                        (item) => row.id === item.assignment_id
                                                    ).length : 0
                                                )
                                        ) : row?.grade || 'pending'}
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
                    <p>No assignments available</p>
                )}
            </div>
        </div>
    );
};

export default AllAssignment;
