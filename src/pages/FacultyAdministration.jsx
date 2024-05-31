import { useContext, useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import THead from '../components/general/THead'
import { ResourceContext } from '../context/ResourceContext'
import { UserContext } from '../context/AuthContext'
import Pagination from '../components/general/Pagination'
import FacultyRow from '../components/stats/FacultyRow'

let PageSize = 7;
const FacultyAdministration = () => {

    const [searchInput, setSearchInput] = useState("");
    const {
        getAllFaculty,
        setGetAllFaculty } = useContext(ResourceContext);


    useEffect(() => {
        setGetAllFaculty((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    const sortType = getAllFaculty.data?.sort((a, b) => b.id - a.id)

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


    useEffect(() => {
        setTotalPage(Math.ceil(typeSearch?.length / PageSize));
    }, [typeSearch, getAllFaculty.data])

    // console.log(currentTableData)
    return (
        <div
            className="p-3 p-md-5 min-vh-100"
            style={{ backgroundColor: "hsla(0, 0%, 85%, .3)" }}
        >
            <div className="col-md-">
                <div className=" border-bottom">
                    <h2>Faculty Administration</h2>
                </div>

                <div>

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
                                </div>
                            </div>
                        </div>
                        <div className="overflow_y_md_50 overflow_y_80">
                            <div className="mt-4 table-responsive-md">
                                <table className="table  table-hover">
                                    <thead>
                                        <tr>
                                            <THead name="" />
                                            <THead name="Title" />
                                            <THead name="Description" />
                                            <THead name="More" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentTableData?.map((faculty) => {
                                            return (
                                                <FacultyRow key={faculty.id} 
                                                faculty={faculty} />
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {getAllFaculty.data && (
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

export default FacultyAdministration