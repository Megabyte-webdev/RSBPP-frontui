import React, { useEffect, useMemo, useState, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import THead from '../general/THead';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import AddCourseForm from '../courses/AddCourseForm';
import Pagination from '../general/Pagination';
import toast from 'react-hot-toast';
import { ResourceContext } from '../../context/ResourceContext';
import { BASE_URL } from '../utils/base';
const PageSize = 7;

const AllCourses = ({ getAllCourses, userCredentials }) => {
    const { setGetAllCourses } = useContext(ResourceContext);

    const [searchInput, setSearchInput] = useState('');
    const [isOpen, setIsOpen] = useState({
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        display: 'none',
    });
    const [editCourse, setEditCourse] = useState(null); // State to hold the course being edited
    const [isSubmitting, setIsSubmitting] = useState(null); // State to track the loading state of a specific course
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();

    // Open the AddCourseForm for creating a new course
    const handleDisplay = () => {
        setEditCourse(null); // Clear editCourse for create mode
        setIsOpen((prev) => ({
            ...prev,
            display: 'block',
        }));
    };

    // Open the AddCourseForm for editing an existing course
    const handleEdit = (course) => {
        setEditCourse(course); // Set the course to be edited
        setIsOpen((prev) => ({
            ...prev,
            display: 'block',
        }));
    };

    const sortedCourses = getAllCourses?.sort((a, b) => b.id - a.id);

    const filteredCourses = sortedCourses?.filter((course) =>
        course.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Pagination logic
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredCourses?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredCourses]);

    useEffect(() => {
        setTotalPage(Math.ceil(filteredCourses?.length / PageSize));
    }, [filteredCourses]);

    // Delete a course
    const deleteFunc = async (id) => {
        setIsSubmitting(id); // Set the ID of the course being deleted
        setGetAllCourses((prev) => ({
            ...prev,
            isDataNeeded: false,
        }));

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userCredentials.token}`,
            },
        };

        try {
            const response = await fetch(`${BASE_URL}course/deleteCourse/${id}`, params);
            if (response.ok) {
                await response.json();
                setGetAllCourses((prev) => ({
                    ...prev,
                    isDataNeeded: true,
                }));
                toast.success('Course deleted successfully');
            } else {
                setIsSubmitting(null);
                throw new Error('Failed to delete course');
                
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'An error occurred');
        } finally {
            setIsSubmitting(null); // Reset the loading state
        }
    };

    return (
        <div>
            <AddCourseForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editCourse={editCourse} // Pass the course being edited
            />
            <div className="p-3 my-5 bg-white rounded-3 shadow-sm">
                <div className="mb-4">
                    <div className="row">
                        <div className="col">
                            <div className="position-relative">
                                <input
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type="text"
                                    className="btn border bg-white text-start px-5 py-2 w-100"
                                    id="search"
                                    placeholder="Search"
                                />
                                <span className="position-absolute start-0 top-0 p-2">
                                    <FiSearch />
                                </span>
                            </div>
                        </div>
                        <div className="col text-end">
                            <button
                                onClick={handleDisplay}
                                className="btn brown_bg text-white px-4"
                            >
                                Create Course
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row text-white">
                    <div className="mb-3 py-3 brown_bg col">
                        <h5>All Courses</h5>
                    </div>
                    <div className="mb-3 ps-4 py-3 bg-black col">
                        <h5>Details</h5>
                    </div>
                </div>
                <div className=" w-full overflow-x-auto">
                    <div className="mt-4">
                        <table className="table-hover">
                            <thead>
                                <tr>
                                    <THead name="Type" />
                                    <THead name="Category" />
                                    <THead name="Course" />
                                    <THead name="Program" />
                                    <THead name="Price" />
                                    <THead name="Action" />
                                </tr>
                            </thead>
                            <tbody>
                                {currentTableData?.map((course) => (
                                    <tr key={course.id}>
                                        <td>{course.course_type}</td>
                                        <td>{course.category_label}</td>
                                        <td>{course.title}</td>
                                        <td>{course.program}</td>
                                        <td>{course.price}</td>
                                        <td className="">
                                            <button
                                                className="btn m-1"
                                                style={{
                                                    border: '1px solid hsla(166, 79%, 42%, 1)',
                                                    backgroundColor: 'hsla(166, 79%, 42%, 0.38)',
                                                    color: 'hsla(166, 79%, 42%, 1)',
                                                }}
                                                onClick={() => handleEdit(course)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                disabled={isSubmitting === course.id}
                                                onClick={() => deleteFunc(course.id)}
                                                className="btn w-max m-1"
                                                style={{
                                                    border: '1px solid hsla(166, 79%, 42%, 1)',
                                                    backgroundColor: 'hsla(166, 79%, 42%, 0.38)',
                                                    color: 'hsla(166, 79%, 42%, 1)',
                                                }}
                                            >
                                                {isSubmitting === course.id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {getAllCourses && (
                    <div className="mt-5 ash_text d-md-flex justify-content-between">
                        <div>
                            <p>
                                Showing {currentPage}/{totalPage} of {filteredCourses?.length} entries
                            </p>
                        </div>
                        <div className="d-flex my-4">
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={filteredCourses?.length}
                                pageSize={PageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCourses;
