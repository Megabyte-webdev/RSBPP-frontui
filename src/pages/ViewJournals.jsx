import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../components/utils/base';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/AuthContext';
import { ResourceContext } from '../context/ResourceContext';
import { useNavigate } from 'react-router-dom';

const ViewJournals = () => {
    const navigate = useNavigate();
    const { getAllFaculty, setGetAllFaculty } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Number of journals per page

    useEffect(() => {
        if (!userCredentials) return;

        setLoading(true);
        const myHeaders = {
            Authorization: `Bearer ${userCredentials.token}`,
        };

        axios
            .get(`${BASE_URL}course/getAllJournal`, { headers: myHeaders })
            .then((response) => {
                console.log('API Response:', response.data);

                const userJournals =
                    userCredentials?.user?.role === 'admin'
                        ? response.data.allJournal
                        : response.data.allJournal.filter(
                            (journal) => journal.user_id === userCredentials.user.id
                        );

                // Set the journals and trigger faculty data fetching
                setJournals(userJournals);
                setGetAllFaculty((prev) => ({ ...prev, isDataNeeded: true }));
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching journals:', error);
                toast.error('Failed to load journals.');
                setLoading(false);
            });
    }, [userCredentials, setGetAllFaculty]);

    const getDetails = (attr, info, facId) => {
        const faculty = getAllFaculty?.data?.find((item) => item.id === facId);
        if (!faculty) return { title: 'N/A' };
        if (attr === 'course') {
            return faculty.courses?.find((item) => item.id === info) || { title: 'N/A' };
        }
        return faculty;
    };

    const sortJournalsByCourse = (journals) => {
        return [...journals].sort((a, b) => {
            const courseA = getDetails('course', a.course_id, a.faculty_id)?.title.toLowerCase() || '';
            const courseB = getDetails('course', b.course_id, b.faculty_id)?.title.toLowerCase() || '';
            return courseA.localeCompare(courseB);
        });
    };

    const formatDate = (timestamp) => {
        const dateObj = new Date(timestamp);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleEdit = (event, journal) => {
        event.stopPropagation(); // Prevent row click event
        navigate('/add-journal', { state: { editData: journal } });
    };

    const totalPages = Math.ceil(journals.length / pageSize);
    const displayedJournals = sortJournalsByCourse(journals).slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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

            <div className="flex justify-between my-3">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                    Next
                </button>
            </div>

            <div className="overflow-x-auto mt-6">
                {loading ? (
                    <p>Loading...</p>
                ) : displayedJournals.length > 0 ? (
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
                                <tr
                                    className="hover:bg-[rgba(180,180,180,.7)]"
                                    key={row.id}
                                >
                                    <td className="p-2 mx-2 min-w-[50px]">
                                        {(currentPage - 1) * pageSize + index + 1}
                                    </td>
                                    <td className="p-2 mx-2 min-w-[150px]">
                                        {getDetails('course', row.course_id, row.faculty_id)?.title}
                                    </td>
                                    <td className="p-2 mx-2 min-w-[150px]">
                                        {getDetails('faculty', row.course_id, row.faculty_id)?.title}
                                    </td>
                                    <td className="p-2 mx-2 min-w-[150px]">{formatDate(row.created_at)}</td>
                                    <td className={`${row?.remark ? 'text-green-500' : 'text-red-500'} font-medium p-2 mx-2`}>
                                        {row.remark ? 'remarked' : 'pending'}
                                    </td>
                                    <td className="p-2 mx-2">
                                        <button
                                            onClick={(event) =>
                                                userCredentials?.user?.role === "admin"
                                                    ? navigate('/remark-journal', { state: { journal: row } })
                                                    : handleEdit(event, row)
                                            }
                                            className="bg-blue-500 text-white font-semibold px-2 py-1 rounded-md"
                                        >
                                            {userCredentials?.user?.role === "admin"
                                                ? row?.remark ? 'Edit' : 'Remark'
                                                : 'Edit'}
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
