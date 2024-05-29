import { useContext, useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import THead from '../components/general/THead'
import { ResourceContext } from '../context/ResourceContext'
import toast from 'react-hot-toast'
import { BASE_URL } from '../components/utils/base'
import { UserContext } from '../context/AuthContext'
import Pagination from '../components/general/Pagination'
import CourseRow from '../components/stats/CourseRow'

let PageSize = 7;
const CourseAdmin = () => {

    const [searchInput, setSearchInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { userCredentials } = useContext(UserContext);
    const {
        setGetAllCourses,
        getAllCourses,
        getAllFaculty,
        setGetAllFaculty } = useContext(ResourceContext);

    useEffect(() => {
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetAllFaculty((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    const sortType = getAllCourses.data?.sort((a, b) => b.id - a.id)

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

    // pagination methods Ends here

    const deleteFunc = async (id) => {
        setIsSubmitting(true)
        setGetAllCourses((prev) => {
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
            const response = await fetch(`${BASE_URL}user/deleteUser/${id}`, params);
            if (response.ok) {
                await response.json();
                setIsSubmitting(false)
                // console.log(response)
                setGetAllCourses((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })

            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                setIsSubmitting(false)
                toast.danger(error.response.data.message);
                console.log(error.response);
            } else {
                setIsSubmitting(false)
                toast.danger(error.message);
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        setTotalPage(Math.ceil(typeSearch?.length / PageSize));
    }, [typeSearch, getAllCourses.date])

    // console.log(currentTableData)
    return (
        <div
            className="p-3 p-md-5 min-vh-100"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .3)" }}
        >
            <div className="col-md-">
                <div className=" border-bottom">
                    <h2>Course Administration</h2>
                </div>

                <div>

                    <div className="p-3 my-5 bg-white rounded-3 shadow-sm">
                        <div className="d-md-flex justify-content-between">
                            <div className="mb-3">
                                <h5>All Registered Courses</h5>
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
                                </div>
                            </div>
                        </div>
                        <div className="overflow_y_md_50 overflow_y_80">
                            <div className="mt-4 table-responsive-md">
                                <table className="table  table-hover">
                                    <thead>
                                        <tr>
                                            <THead name="" />
                                            <THead name="Type" />
                                            <THead name="Course" />
                                            {/* <THead name="Code" /> */}
                                            {/* <THead name="Description" /> */}
                                            <THead name="program" />
                                            <THead name="price" />
                                            <THead name="More" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentTableData?.map((user) => {
                                            return (
                                                <CourseRow key={user.id} 
                                                getAllFaculty={getAllFaculty.data}
                                                user={user} />
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {getAllCourses.data && (
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
            </div>
        </div>
    )
}

export default CourseAdmin