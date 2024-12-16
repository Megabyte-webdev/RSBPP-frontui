import React, { useEffect, useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import THead from '../general/THead';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import AddCourseForm from '../courses/AddCourseForm';
import Pagination from '../general/Pagination';

const PageSize = 7;

const AllCourses = ({ getAllCourses }) => {
    const [searchInput, setSearchInput] = useState("");
    const [isOpen, setIsOpen] = useState({
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        display: "none"
    });
    const [editCourse, setEditCourse] = useState(null); // State to hold the course being edited

    // Open the AddCourseForm for creating a new course
    const handleDisplay = () => {
        setEditCourse(null); // Clear editCourse for create mode
        setIsOpen((prev) => ({
            ...prev,
            display: "block",
        }));
    };

    // Open the AddCourseForm for editing an existing course
    const handleEdit = (course) => {
        setEditCourse(course); // Set the course to be edited
        setIsOpen((prev) => ({
            ...prev,
            display: "block",
        }));
    };

    const sortedCourses = getAllCourses?.sort((a, b) => b.id - a.id);

    const filteredCourses = sortedCourses?.filter((course) =>
        course.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredCourses?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredCourses]);

    useEffect(() => {
        setTotalPage(Math.ceil(filteredCourses?.length / PageSize));
    }, [filteredCourses]);

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
                <div className="overflow_y_md_50 overflow_y_80">
                    <div className="mt-4 table-responsive-md">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <THead name="Type" />
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
                                        <td>{course.title}</td>
                                        <td>{course.program}</td>
                                        <td>{course.price}</td>
                                        <td>
                                            <button
                                                className="btn"
                                                style={{
                                                    border: "1px solid hsla(166, 79%, 42%, 1)",
                                                    backgroundColor: "hsla(166, 79%, 42%, 0.38)",
                                                    color: "hsla(166, 79%, 42%, 1)",
                                                }}
                                                onClick={() => handleEdit(course)}
                                            >
                                                Edit
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
