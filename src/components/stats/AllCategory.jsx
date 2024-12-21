import { useContext, useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import THead from '../general/THead'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import AddCategoryForm from './AddCategoryForm'
import Pagination from '../general/Pagination'
import toast from 'react-hot-toast'
import { ResourceContext } from '../../context/ResourceContext'
import { BASE_URL } from '../utils/base'
import CategoryList from './CategoryList'

const PageSize = 7;

const AllCategory = ({ getAllCategory, userCredentials }) => {
    console.log(getAllCategory)
    const { setGetAllCategory } = useContext(ResourceContext);

    const [searchInput, setSearchInput] = useState("");
    const [editCategory, setEditCategory] = useState("");
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const [isOpen, setIsOpen] = useState({
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        display: "none"
    }
    )
   
    const sortType = getAllCategory?.sort((a, b) => b.id - a.id)

    const typeSearch = sortType?.filter((category) =>
        category?.label.toLowerCase()?.includes(searchInput.toLowerCase())
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
    }, [typeSearch, getAllCategory])

    // pagination methods Ends here

    const deleteFunc = async (id, setIsSubmitting) => {
        setIsSubmitting(true)
        setGetAllCategory((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })

        const params = {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${userCredentials.token}`
            },
        }
        try {
            const response = await fetch(`${BASE_URL}faculty/deleteCourseByCategory/${id}`, params);
            if (response.ok) {
                await response.json();
                setIsSubmitting(false)
                // console.log(response)
                setGetAllCategory((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                toast.success("Category deleted successfully")

            }else{
                setIsSubmitting(false)
                toast.error("An error occured");
            }
            
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
     // Open the AddCourseForm for creating a new course
     const handleDisplay = () => {
        setEditCategory(null); // Clear editCourse for create mode
        setIsOpen((prev) => ({
            ...prev,
            display: "block",
        }));
    };

// Open the AddCourseForm for editing an existing course
const handleEdit = (course) => {
    setEditCategory(course); // Set the course to be edited
    setIsOpen((prev) => ({
        ...prev,
        display: "block",
    }));
};

    return (
        <div>
            <AddCategoryForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editCategory={editCategory} />
            <div className="p-3 my-5 bg-white rounded-3 shadow-sm">
                <div className="d-md-flex justify-content-between">
                    <div className="mb-3">
                        <h5>All Registered Categories</h5>
                        {/* <span className='prime_blue fs_sm'>Active Members</span> */}
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col">
                                <div className='position-relative'>
                                    <input
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        type="text" className="border bg-white text-start px-5 py-2 w-100" id="search" placeholder='Search' />
                                    <span className="position-absolute start-0 top-0 p-2"><FiSearch /> </span>
                                </div>
                            </div>
                            <div className="col">
                                <button onClick={handleDisplay}
                                    className='btn brown_bg text-white px-4'>Add Category</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow_y_md_50 overflow_y_80">
                    <div className="mt-4 table-responsive-md">
                        <table className="table  table-hover">
                            <thead>
                                <tr>
                                    <THead name="Category" />
                                    <THead name="Description" />
                                    <THead name="Action" />
                                </tr>
                            </thead>
                            <tbody>
                                {currentTableData?.map((category) => {
                                    return (
                                        <CategoryList key={category.id} category={category} handleEdit={handleEdit} deleteFunc={deleteFunc} />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {getAllCategory && (
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

export default AllCategory