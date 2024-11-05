import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../components/utils/base';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthContext';
import { ResourceContext } from '../context/ResourceContext';
import { useNavigate } from 'react-router-dom';

const GivenAssignment = () => {
    const navigate = useNavigate();
    const { getAllFaculty, setGetAllFaculty, getEnrolledCourses, setGetEnrolledCourses } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);
    const role = userCredentials?.user?.role;

    // State for assignments and loading
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [assignmentsPerPage] = useState(5); // Number of assignments to display per page

    useEffect(() => {
        setGetEnrolledCourses((prev) => ({
            ...prev, isDataNeeded: true
        }));
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        
        const fetchAssignments = async () => {
            setLoading(true);
            const headers = { Authorization: `Bearer ${userCredentials.token}` };

            try {
                const enrolledCourses = getEnrolledCourses.data || []; // Get enrolled courses
                console.log("Enrolled Courses:", enrolledCourses); // Log enrolled courses

                const fetchedAssignments = []; // Initialize the fetched assignments array

                // Fetch assignments for each enrolled course
                await Promise.all(enrolledCourses.map(async (course) => {
                    if (!course.courseId) {
                        console.warn(`Course ID is missing for course:`, course);
                        return; // Skip if courseId is invalid
                    }

                    try {
                        const url = `${BASE_URL}course/getAllAssignmentCourse/${course.courseId}`;
                        const response = await axios.get(url, { headers, signal: controller.signal });
                        console.log(`Response from API for course ${course.courseId}:`, response.data);

                        // Access assignments from the correct key
                        const assignmentsFromCourse = response.data.allAssignment || [];

                        // Only push assignments if they exist
                        if (assignmentsFromCourse.length > 0) {
                            fetchedAssignments.push(...assignmentsFromCourse); // Merge fetched assignments
                        }
                    } catch (error) {
                        if (!controller.signal.aborted) {
                            console.error(`Error fetching assignments for course ${course.courseId}:`, error);
                        }
                    }
                }));

                console.log("Fetched Assignments:", fetchedAssignments); // Log fetched assignments
                setAssignments(fetchedAssignments); // Set assignments directly

                setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("Error fetching assignments:", error);
                    toast.error("Failed to load assignments.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (getEnrolledCourses.data) {
            fetchAssignments();
        }

        return () => controller.abort();
    }, [getEnrolledCourses, userCredentials]);

    console.log("Assignments State:", assignments); // Log assignments to check their values

    const getDetails = (attr, info, facId) => {
        const faculty = getAllFaculty?.data?.find((item) => item.id === facId);
        if (!faculty) return { title: 'N/A' };
        if (attr === 'course') {
            return faculty.courses?.find((item) => item.id === info) || { title: 'N/A' };
        }
        return faculty;
    };

    // Pagination logic
    const indexOfLastAssignment = currentPage * assignmentsPerPage;
    const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
    const currentAssignments = assignments.slice(indexOfFirstAssignment, indexOfLastAssignment);
    const totalPages = Math.ceil(assignments.length / assignmentsPerPage);

    return (
        <div className="flex flex-col p-4 md:p-8 min-h-max w-full font-sans">
            <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
                All Assignments
            </p>
            {/* Pagination Controls */}
            <div className="flex justify-between mt-4 text-xs">
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <p>Page {currentPage} of {totalPages}</p>
                <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <div className='overflow-x-auto mt-6'>
                {loading ? (
                    <p>Loading...</p>
                ) : currentAssignments.length > 0 ? (
                    <table className="w-full min-w-[700px] overflow-auto bg-white rounded-lg border border-gray-300">
                        <thead className='bg-gray-200 font-medium'>
                            <tr>
                                <th className='p-2 mx-2 text-left min-w-[50px]'>S/N</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Assignment</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Course Name</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Faculty</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Date Added</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Status</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAssignments.map((row, index) => (
                                <tr key={index} className='hover:bg-[#ddd]'>
                                    <td className='p-2 mx-2 min-w-[50px]'>{index + 1 + indexOfFirstAssignment}</td>
                                    <td className='p-2 mx-2 min-w-[150px]'>{row?.title || 'N/A'}</td>
                                    <td className='p-2 mx-2 min-w-[150px]'>{getDetails('course', row.course_id, row.faculty_id)?.title}</td>
                                    <td className='p-2 mx-2 min-w-[150px]'>{getDetails('faculty', row.course_id, row.faculty_id)?.title}</td>
                                    <td className='p-2 mx-2 min-w-[150px]'>{new Date(row.created_at).toLocaleDateString()}</td>
                                    <td className='p-2 mx-2 min-w-[150px]'>{row?.status || 'Pending'}</td>
                                    <td className='p-2 mx-2 min-w-[150px]'>
                                        <button onClick={() => navigate('/upload-assignment')} className="bg-blue-500 text-white px-2 py-1 rounded">Submit</button>
                                    </td>
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

export default GivenAssignment;
