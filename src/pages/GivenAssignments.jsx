import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../components/utils/base';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthContext';
import { ResourceContext } from '../context/ResourceContext';
import { useNavigate } from 'react-router-dom';
import AssignmentTable from './AssignmentTable'; // Import the AssignmentTable component
import { Spinner } from 'react-bootstrap';

const GivenAssignment = () => {
    const navigate = useNavigate();
    const { getAllFaculty, setGetAllFaculty, getEnrolledCourses, setGetEnrolledCourses } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);

    // State for assignments, loading, and errors
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [assignmentsPerPage] = useState(5); // Number of assignments to display per page

    useEffect(() => {
        setGetEnrolledCourses((prev) => ({
            ...prev, isDataNeeded: true
        }));
    }, []);

    useEffect(() => {
        setLoading(true);
        setError(null); // Reset error state before fetching
        const controller = new AbortController();

        const fetchAssignments = async () => {
            const headers = { Authorization: `Bearer ${userCredentials.token}` };

            try {
                const enrolledCourses = getEnrolledCourses.data || [];
                const fetchedAssignments = [];

                // Fetch assignments for each enrolled course
                await Promise.all(enrolledCourses.map(async (course) => {
                    if (!course.courseId) return; // Skip if courseId is invalid

                    try {
                        const url = `${BASE_URL}course/getAllAssignmentCourse/${course.courseId}`;
                        const response = await axios.get(url, { headers, signal: controller.signal });
                        const assignmentsFromCourse = response.data.allAssignment || [];

                        // Only push assignments if they exist
                        if (assignmentsFromCourse.length > 0) {
                            fetchedAssignments.push(...assignmentsFromCourse);
                        }
                    } catch (error) {
                        if (!controller.signal.aborted) {
                            console.error(`Error fetching assignments for course ${course.courseId}:`, error);
                        }
                    }
                }));

                // Update state only if component is still mounted
                if (!controller.signal.aborted) {
                    setAssignments(fetchedAssignments);
                    console.log(fetchedAssignments)
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("Error fetching assignments:", error);
                    setError("Failed to load assignments. Please try again later."); // Set error message
                    toast.error("Failed to load assignments.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        if (getEnrolledCourses.data) {
            fetchAssignments();
        }

        return () => controller.abort();
    }, [getEnrolledCourses, userCredentials]);



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
    console.log(currentAssignments)
    const totalPages = Math.ceil(assignments.length / assignmentsPerPage);

    return (
        <div className="flex flex-col p-4 md:p-8 min-h-max w-full font-sans">
            <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
                All Assignments
            </p>

            {/* Loading State */}
            {loading && <p className="w-full h-full flex items-center justify-center"><Spinner /></p>}

            {/* Error State */}
            {error && <p className="text-red-500">{error}</p>}


            {/* Assignments Table */}
            {!loading && !error && (
                <>
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
                        {currentAssignments.length > 0 ? (
                            <AssignmentTable
                                assignments={currentAssignments}
                                navigate={navigate}
                                getDetails={getDetails}
                                indexOfFirstAssignment={indexOfFirstAssignment}
                            />
                        ) : (
                            <p>No assignments available.</p>
                        )}
                    </div>
                </>
            )}


        </div>
    );
};

export default GivenAssignment;
