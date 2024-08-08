import { useContext, useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import THead from '../general/THead'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { ResourceContext } from '../../context/ResourceContext'
import toast from 'react-hot-toast'
import { BASE_URL } from '../utils/base'
import Pagination from '../general/Pagination'

let PageSize = 5;

const AllStudents = ({ getAllUsers, userCredentials }) => {
    const [searchInput, setSearchInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setGetAllUsers } = useContext(ResourceContext);

    const sortType = getAllUsers?.sort((a, b) => b.id - a.id)

    const typeSearch = sortType?.filter((user) =>
        user.first_name.toLowerCase().includes(searchInput.toLowerCase())
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
    }, [typeSearch, getAllUsers])

    // pagination methods Ends here

    const deleteFunc = async (id) => {
        setIsSubmitting(true)
        setGetAllUsers((prev) => {
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
                setGetAllUsers((prev) => {
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


    return (
        <div>

            <div className="p-3 my-5 bg-white rounded-3 shadow-sm">
                <div className="d-md-flex justify-content-between">
                    <div className="mb-3">
                        <h5>All Registered Students</h5>
                        <span className='prime_blue fs_sm'>Active Members</span>
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
                                    <THead name="Name" />
                                    <THead name="Organization" />
                                    <THead name="Position" />
                                    <THead name="Email" />
                                    <THead name="Role" />
                                    <THead name="Status" />
                                </tr>
                            </thead>
                            <tbody>
                                {currentTableData?.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.first_name}</td>
                                            <td>{user.organization}</td>
                                            <td>{user.position}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button
                                                    disabled={isSubmitting}
                                                    onClick={() => deleteFunc(user.id)}
                                                    className='btn' style={{ border: "1px solid hsla(166, 79%, 42%, 1)", backgroundColor: "hsla(166, 79%, 42%, 0.38)", color: "hsla(166, 79%, 42%, 1)" }}>{isSubmitting ? "Deleting.." : "Delete"}</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {getAllUsers && (
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

export default AllStudents