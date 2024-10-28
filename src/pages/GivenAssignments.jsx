import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../components/utils/base';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthContext';
import { ResourceContext } from '../context/ResourceContext';
import { useNavigate } from 'react-router-dom';

const GivenAssignment = () => {
    const navigate = useNavigate();
    const { getAllFaculty, setGetAllFaculty, getEnrolledCourses } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);
    const role = userCredentials?.user?.role;
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // Number of assignments per page

    useEffect(() => {
        const fetchAssignments = async () => {
            setLoading(true);
            const headers = { Authorization: `Bearer ${userCredentials.token}` };
            
            try {
                const enrolledCourses = getEnrolledCourses.data || []; // Get enrolled courses
                const fetchedAssignments = [];

                // Fetch assignments for each enrolled course
                await Promise.all(enrolledCourses.map(async (course) => {
                    const url = `${BASE_URL}/course/getAllAssignmentCourse/${course.courseId}`;
                    const response = await axios.get(url, { headers });
                    
                    // Assuming response.data contains the assignments directly
                    const assignmentsFromCourse = response.data; // Adjust this based on your actual API response structure
                    fetchedAssignments.push(...assignmentsFromCourse); // Merge fetched assignments
                }));

                setAssignments(fetchedAssignments);
                setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
            } catch (error) {
                console.error("Error fetching assignments:", error);
                toast.error("Failed to load assignments.");
            } finally {
                setLoading(false);
            }
        };

        if (getEnrolledCourses.data) {
            fetchAssignments();
        }
    }, [getEnrolledCourses, userCredentials]);

    const totalPages = Math.ceil(assignments.length / pageSize);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const displayedAssignments = assignments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const getDetails = (attr, info, facId) => {
        const faculty = getAllFaculty?.data?.find((item) => item.id === facId);
        if (!faculty) return { title: 'N/A' };
        if (attr === 'course') {
            return faculty.courses?.find((item) => item.id === info) || { title: 'N/A' };
        }
        return faculty;
    };

    return (
        <div className="flex flex-col p-4 md:p-8 min-h-max w-full font-sans">
            <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
                {role === "instructor" ? 'All Assignments' : 'Submitted Assignments'}
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
                ) : assignments.length > 0 ? (
                    <table className="w-full min-w-[700px] overflow-auto bg-white rounded-lg border border-gray-300">
                        <thead className='bg-gray-200 font-medium'>
                            <tr>
                                <th className='p-2 mx-2 text-left min-w-[50px]'>S/N</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Assignment</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Course Name</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Faculty</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Date Added</th>
                                <th className='p-2 mx-2 text-left min-w-[150px]'>Status</th>
                                {role === "instructor" && <th className='p-2 mx-2 text-left min-w-[150px]'>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {displayedAssignments.map((row, index) => (
                                <tr className='cursor-pointer' key={row.id}>
                                    <td className='p-2 mx-2 min-w-[50px]'>{(currentPage - 1) * pageSize + index + 1}</td>
                                    <td className='p-2 mx-2 min-w-[150px]'>{row.assignmentName || 'N/A'}</td> {/* Assuming the assignment has a name */}
                                    <td className='p-2 mx-2 min-w-[150px]'>{getDetails('course', row.course_id, row.faculty_id)?.title}</td>
                                    <td className='p-2 mx-2 min-w-[150px]'>{getDetails('faculty', row.course_id, row.faculty_id)?.title}</td>
                                    <td className='p-2 mx-2 min-w-[150px]'>{new Date(row.created_at).toLocaleDateString()}</td> {/* Assuming created_at is the timestamp */}
                                    <td className='p-2 mx-2 min-w-[150px]'>{row.status || 'Pending'}</td> {/* Assuming there is a status field */}
                                    {role === "instructor" && (
                                        <td className='p-2 mx-2 min-w-[150px]'>
                                            <button onClick={() => navigate(`/edit-assignment/${row.id}`)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                        </td>
                                    )}
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
