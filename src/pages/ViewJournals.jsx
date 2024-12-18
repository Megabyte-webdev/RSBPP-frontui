import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../components/utils/base';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthContext';
import { ResourceContext } from '../context/ResourceContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const ViewJournals = () => {
    const navigate = useNavigate();
    const { getAllFaculty, setGetAllFaculty, setGetAllCourses, getAllCourses } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);
    const [journals, setJournals] = useState([]);
    const [displayedJournals, setDisplayedJournals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Number of journals per page

    useEffect(() => {
        setGetAllCourses((prev) => ({
            ...prev, isDataNeeded: true
        }));
    }, []);


    useEffect(() => {
        if (!userCredentials) return;
        const myCourses = getAllCourses?.data?.filter(
            (course) => parseInt(userCredentials?.user?.id) === parseInt(course.created_by_id)
        ) || [];
        setLoading(true);
        const controller = new AbortController();
        const myHeaders = {
            Authorization: `Bearer ${userCredentials.token}`,
        };

        axios
            .get(`${BASE_URL}course/getAllJournal`, { headers: myHeaders, signal: controller.signal })
            .then((response) => {
                console.log('Fetched Journals:', response.data);

                let userJournals = [];
                if (userCredentials?.user?.role === 'instructor') {
                    const courseIds = myCourses.map((course) => course.id);
                    console.log('Instructor Course IDs:', courseIds);
                    userJournals = response.data.allJournal.filter((journal) =>
                        courseIds.includes(journal.course_id)
                    );
                } else {
                    console.log('Student ID:', userCredentials.user.id);
                    userJournals = response.data.allJournal.filter(
                        (journal) => journal.user_id === userCredentials.user.id
                    );
                }

                console.log('Filtered Journals:', userJournals);

                setJournals(userJournals);

                const sortJournalsByCourse = (journals) => {
                    return [...journals]?.sort((a, b) =>
                        new Date(b.created_at) - new Date(a.created_at)
                    );

                };
                const displayedJournals = sortJournalsByCourse(userJournals)?.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize
                );
                console.log('displayedJournals', displayedJournals);
                setDisplayedJournals(displayedJournals)
                setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
                setLoading(false);
            })
            .catch((error) => {
                if (!controller.signal.aborted) {
                    console.error('Error fetching journals:', error);
                    toast.error('Failed to load journals.');
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [getAllCourses]);

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

    const handleJournal = (event, journal) => {
        if (userCredentials?.user?.role === "student" && journal.remark) {
            navigate('/view-remark', { state: { journal: journal } });
        } else if (userCredentials?.user?.role === "student" && journal.remark === null) {
            navigate('/add-journal', { state: { editData: journal } });
        }
        if (userCredentials?.user?.role === "instructor") {
            navigate('/remark-journal', { state: { journal: journal } });
        }
    };

    const totalPages = Math.ceil(journals.length / pageSize);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="flex flex-col p-4 md:p-8 min-h-full w-full font-sans">
            <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
                All Journal
            </p>

            <div className="flex justify-between my-3 text-xs">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <div className="overflow-x-auto mt-6">
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center"><Spinner /></div>
                ) : journals?.length > 0 ? (
                    <table className="w-full min-w-[700px] overflow-auto bg-white rounded-lg border border-gray-300">
                        <thead className="bg-gray-200 font-medium">
                            <tr>
                                <th className="p-2 mx-2 text-left min-w-[50px]">S/N</th>
                                <th className="p-2 mx-2 text-left min-w-[150px]">Course Name</th>
                                <th className="p-2 mx-2 text-left min-w-[150px]">Faculty</th>
                                <th className="p-2 mx-2 text-left min-w-[150px]">Date Added</th>
                                <th className="p-2 mx-2 text-left min-w-[150px]">Status</th>
                                <th className="p-2 mx-2 text-left min-w-[150px]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedJournals.map((row, index) => (
                                <tr className="hover:bg-[rgba(180,180,180,.7)]" key={row.id}>
                                    <td className="p-2 mx-2 min-w-[50px]">
                                        {(currentPage - 1) * pageSize + index + 1}
                                    </td>
                                    <td className="p-2 mx-2 min-w-[150px]">
                                        {getDetails('course', row.course_id, row.faculty_id)?.title}
                                    </td>
                                    <td className="p-2 mx-2 min-w-[150px]">
                                        {getDetails('faculty', row.course_id, row.faculty_id)?.title}
                                    </td>
                                    <td className="p-2 mx-2 min-w-[150px]">{new Date(row.created_at).toLocaleDateString()}</td>
                                    <td className={`${row?.remark ? 'text-green-500' : 'text-red-500'} font-medium p-2 mx-2`}>
                                        {row.remark ? 'remarked' : 'pending'}
                                    </td>
                                    <td className="p-2 mx-2">
                                        <button
                                            onClick={(event) => handleJournal(event, row)}
                                            className="bg-blue-500 text-white font-semibold px-2 py-1 rounded-md"
                                        >
                                            {userCredentials?.user?.role === "instructor"
                                                ? row?.remark ? 'Edit' : 'Remark'
                                                : row?.remark ? 'View' : 'Edit'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No Journals available.</p>
                )}
            </div>
        </div>
    );
};

export default ViewJournals;
