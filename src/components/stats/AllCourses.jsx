import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import THead from '../general/THead'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import AddFacultyForm from '../faculty/AddFacultyForm'
import AddCourseForm from '../courses/AddCourseForm'

const AllCourses = ({ getAllCourses }) => {
    const [searchInput, setSearchInput] = useState("");

    const [isOpen, setIsOpen] = useState({
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        display: "none"
    }
    )
    const handleDisplay = () => (
        setIsOpen((prev) => {
            return {
                ...prev, display: "block"
            }
        })
    )
    const sortType = getAllCourses?.sort((a, b) => b.id - a.id)

    const typeSearch = sortType?.filter((user) =>
        user.title.toLowerCase().includes(searchInput.toLowerCase())
    )
    return (
        <div>
            <AddCourseForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleDisplay={handleDisplay} />
            <div className="p-3 my-5 bg-white rounded-3 shadow-sm">
                <div className="mb-4">
                    <div className="row">
                        <div className="col">
                            <div className='position-relative'>
                                <input
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type="text" className="btn border bg-white text-start px-5 py-2 w-100" id="search" placeholder='Search' />
                                <span className="position-absolute start-0 top-0 p-2"><FiSearch /> </span>
                            </div>
                        </div>
                        <div className="col text-end">
                            <button onClick={() => handleDisplay()}
                                className='btn brown_bg text-white px-4'>Create Course</button>
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
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    {/* <THead name="No:" /> */}
                                    <THead name="Type" />
                                    <THead name="Course" />
                                    {/* <THead name="Code" /> */}
                                    {/* <THead name="Description" /> */}
                                    {/* <THead name="Author" /> */}
                                    <THead name="program" />
                                    <THead name="price" />
                                </tr>
                            </thead>
                            <tbody>
                                {typeSearch?.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.course_type}</td>
                                            <td>{user.title}</td>
                                            {/* <td>{user.code}</td> */}
                                            {/* <td>{user.description}</td> */}
                                            {/* <td>{user.duration} {user.duration && ("")}</td> */}
                                            <td>{user.program}</td>
                                            <td>{user.price}</td>
                                            {/* <td>
                                                <button className='btn' style={{ border: "1px solid hsla(166, 79%, 42%, 1)", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>Active</button>
                                            </td> */}
                                        </tr>
                                    )
                                })}
                                {/* <tr>
                                <td>Jane Cooper</td>
                                <td>Microsoft</td>
                                <td>(225) 555-0118</td>
                                <td>jane@microsoft.com</td>
                                <td>United States</td>
                                <td>
                                    <button className='btn' style={{ border: "1px solid hsla(0, 97%, 44%, 1))", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>Active</button>
                                </td>
                            </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <div className="mt-5 ash_text d-md-flex justify-content-between">
                    <div>
                        <p>Showing data 1 to 8 of  256K entries</p>
                    </div>
                    <div className='d-flex my-4'>
                        <button className='border-0 rounded ms-2'> <MdChevronLeft /></button>
                        <button className='border-0 rounded ms-2'> 1</button>
                        <button className='border-0 rounded ms-2'> 2</button>
                        <button className='border-0 rounded ms-2'> ...</button>
                        <button className='border-0 rounded ms-2'> 40</button>
                        <button className='border-0 rounded ms-2'> <MdChevronRight /></button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default AllCourses