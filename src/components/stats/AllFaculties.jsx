import { useContext, useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import THead from '../general/THead'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import AddFacultyForm from '../faculty/AddFacultyForm'
import Pagination from '../general/Pagination'
import toast from 'react-hot-toast'
import { ResourceContext } from '../../context/ResourceContext'
import { BASE_URL } from '../utils/base'
import FacultyList from './FacultyList'

const PageSize = 7;

const AllFaculties = ({ getAllFaculty, userCredentials }) => {

    const { setGetAllFaculty } = useContext(ResourceContext);
    const [editFaculty, setEditFaculty] = useState("");

    const [searchInput, setSearchInput] = useState("");
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const [isOpen, setIsOpen] = useState({
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        display: "none"
    }
    )
    // Open the AddCourseForm for creating a new course
    const handleDisplay = () => {
        setEditFaculty(null); // Clear editCourse for create mode
        setIsOpen((prev) => ({
            ...prev,
            display: "block",
        }));
    };

    // Open the AddCourseForm for editing an existing course
    const handleEdit = (course) => {
        setEditFaculty(course); // Set the course to be edited
        setIsOpen((prev) => ({
            ...prev,
            display: "block",
        }));
    };

    const sortType = getAllFaculty?.sort((a, b) => b.id - a.id)

    const typeSearch = sortType?.filter((user) =>
        user.title.toLowerCase().includes(searchInput.toLowerCase())
    )


    // pagination methods Starts here

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return typeSearch?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, typeSearch]);

    useEffect(() => {
        setTotalPage(Math.ceil(typeSearch?.length / PageSize));
    }, [typeSearch, getAllFaculty])

    // pagination methods Ends here

    const deleteFunc = async (id, setIsSubmitting) => {
        setIsSubmitting(true)
        setGetAllFaculty((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${userCredentials.token}`
            },
        }
        try {
            const response = await fetch(`${BASE_URL}faculty/deleteFaculty/${id}`, params);
            if (response.ok) {
                await response.json();
                setIsSubmitting(false)
                // console.log(response)
                setGetAllFaculty((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })

            }
            toast.error("An error occured");
        } catch (error) {
            console.log(error);
            if (error.response) {
                setIsSubmitting(false)
                toast.error(error.response.data.message);
                console.log(error.response);
            } else {
                setIsSubmitting(false)
                toast.error(error.message);
                console.log(error.message);
            }
        }
    }

    return (
        <div>
            <AddFacultyForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editFaculty={editFaculty} />
            <div className="p-3 my-5 bg-white rounded-3 shadow-sm">
                <div className="d-md-flex justify-content-between">
                    <div className="mb-3">
                        <h5>All Registered Faculties</h5>
                        {/* <span className='prime_blue fs_sm'>Active Members</span> */}
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col">
                                <div className='position-relative'>
                                    <input
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        type="text" className="btn border bg-white text-start px-5 py-2 w-100" id="search" placeholder='Search' />
                                    <span className="position-absolute start-0 top-0 p-2"><FiSearch /> </span>
                                </div>
                            </div>
                            <div className="col">
                                <button onClick={() => handleDisplay()}
                                    className='btn brown_bg text-white px-4'>Add Faculty</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow_y_md_50 overflow_y_80">
                    <div className="mt-4 table-responsive-md">
                        <table className="table  table-hover">
                            <thead>
                                <tr>
                                    <THead name="Faculty" />
                                    <THead name="Description" />
                                    <THead name="Action" />
                                </tr>
                            </thead>
                            <tbody>
                                {currentTableData?.map((faculty) => {
                                    return (
                                        <FacultyList key={faculty.id} faculty={faculty} deleteFunc={deleteFunc} handleEdit={handleEdit} />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {getAllFaculty && (
                    <div className="mt-5 ash_text d-md-flex justify-content-between">
                        <div>
                            <p>Showing {currentPage}/{totalPage} of  {typeSearch?.length} entries</p>
                        </div>
                        <div className='d-flex my-4'>
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={typeSearch?.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default AllFaculties