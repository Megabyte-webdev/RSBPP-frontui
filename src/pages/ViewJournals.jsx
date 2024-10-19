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

    useEffect(() => {
        if (!userCredentials) return; // Prevent unnecessary fetch if user is not available

        setLoading(true);
        const myHeaders = {
            Authorization: `Bearer ${userCredentials.token}`,
        };

        axios
            .get(`${BASE_URL}course/getAllJournal`, { headers: myHeaders })
            .then((response) => {
                console.log('API Response:', response.data);

                // Filter journals to only show those belonging to the current user
                const userJournals = response.data.allJournal.filter(
                    (journal) => journal.user_id === userCredentials.user.id
                );

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

    const formatDate = (timestamp) => {
        const dateObj = new Date(timestamp);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleEdit = (journal) => {
      navigate("/add-journal", { state: { editData: journal } });
    };

    return (
        <div className="flex flex-col p-4 md:p-8 min-h-max w-full font-sans">
            <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
                All Journal
            </p>

            <div className="overflow-x-auto mt-6">
                {loading ? (
                    <p>Loading...</p>
                ) : journals.length > 0 ? (
                    <table className="w-full min-w-[700px] overflow-auto bg-white rounded-lg border border-gray-300">
                        <thead className="bg-gray-200 font-medium">
                            <tr>
                                <th className="p-2 mx-2 text-left min-w-[150px]">Course Name</th>
                                <th className="p-2 mx-2 text-left min-w-[150px]">Faculty</th>
                                <th className="p-2 mx-2 text-left min-w-[150px]">Date Added</th>
                                <th className="p-2 mx-2 text-left min-w-[150px]">File Submission</th>
                                <th className="p-2 mx-2 text-left min-w-[150px]">Status</th>
                                <th className="p-2 mx-2 text-left min-w-[150px]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {journals.map((row) => (
                                <tr key={row.id}>
                                    <td className="p-2 mx-2 min-w-[150px]">
                                        {getDetails('course', row.course_id, row.faculty_id)?.title}
                                    </td>
                                    <td className="p-2 mx-2 min-w-[150px]">
                                        {getDetails('faculty', row.course_id, row.faculty_id)?.title}
                                    </td>
                                    <td className="p-2 mx-2 min-w-[150px]">{formatDate(row.created_at)}</td>
                                    <td className="p-2 mx-2">{row.submission || 'N/A'}</td>
                                    <td className="p-2 mx-2">{row.status || 'N/A'}</td>
                                    <td className="p-2 mx-2">
                                        <button
                                            onClick={() => handleEdit(row)}
                                            className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-md"
                                        >
                                            Edit
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
