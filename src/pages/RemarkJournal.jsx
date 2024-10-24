import { BsJournalCheck } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { ResourceContext } from '../context/ResourceContext';
import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { BASE_URL, IMAGE_URL } from "../components/utils/base";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";

const RemarkJournal = () => {
    const location = useLocation();
    const remarkRef= useRef(null)

    const { journal } = location.state;
    
    const [loading, setLoading] = useState(false);
    const [remark, setRemark] = useState(journal?.remark);

    const { setGetAllUsers, getAllUsers, getAllFaculty, setGetAllFaculty } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);
    const role= userCredentials?.user?.role
    useEffect(() => {
        setGetAllFaculty(prev => ({ ...prev, isDataNeeded: true }));
        setGetAllUsers((prev) => ({ ...prev, isDataNeeded: true }));
      
    
    }, [])
    const GetUserDetails = useMemo(() => {
        return (userId) => {
          const user = getAllUsers?.data?.find((item) => item.id === userId);
          return user || { first_name: "N/A", last_name: "", role: "N/A", email: "", image: "" };
        };
      }, [getAllUsers]);

      const user = GetUserDetails(journal?.user_id);
      console.log(user)

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

    const handleRemark = () => {
        if(journal?.remark === remark){
            remarkRef.current.focus();
            return;
        }
        let details = {
            id: journal?.id,
            remark: remark
        }
        setLoading(true)
        axios
            .post(`${BASE_URL}course/remarkJournal`, details, {
                headers: {
                    Authorization: `Bearer ${userCredentials.token}`,
                },
            })
            .then((response) => {
                toast.success(response.data.message || "Remark sent");
                setLoading(false);
                //   navigate("/view-journals");
            })
            .catch((error) => {
                console.error(error);
                toast.error(
                    error?.response?.data?.message || "An error occurred"
                );
                setLoading(false);
            });

    }

    return (
        <div
            className="flex flex-col p-3 p-md-5 min-vh-100 poppins items-center"
            style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}>
        <div className="flex justify-center">
            <img src={`${IMAGE_URL}/profile/${user?.image}`} alt={user?.image} className='w-40 h-40 rounded-full' />
          <p>{user?.role}</p>
        </div>

<div className='flex flex-wrap'>
          <section className='flex flex-wrap justify-between'>
            <label className='flex flex-col gap-2 w-full md:w-40'>
                <p className='text-gray-700'>First Name</p>
                <p className='py-2 px-4 border-[1px] border-gray-600 bg-gray-300'>{user?.first_name}</p>
            </label>
             <label className='flex flex-col gap-2 w-full md:w-40'>
                <p className='text-gray-700'>Last Name</p>
                <p className='border-[1px] border-gray-600 bg-gray-300 py-2 px-4'>{user?.last_name}</p>
            </label>

 <label className='flex flex-col gap-2 w-full md:w-40'>
                <p className='text-gray-700'>Email</p>
                <p className='border-[1px] border-gray-600 bg-gray-300 py-2 px-4'>{user?.email}</p>
            </label>
 <label className='flex flex-col gap-2 w-full md:w-40'>
                <p className='text-gray-700'>Phone Number</p>
                <p className='border-[1px] border-gray-600 bg-gray-300 py-2 px-4'>{user?.mobile}</p>
            </label>
 <label className='flex flex-col gap-2 w-full md:w-40'>
                <p className='text-gray-700'>Date Of Birth</p>
                <p className='border-[1px] border-gray-600 bg-gray-300 py-2 px-4'>{user?.dob}</p>
            </label>
 <label className='flex flex-col gap-2 w-full md:w-40'>
                <p className='text-gray-700'>Gender</p>
                <p className='border-[1px] border-gray-600 bg-gray-300 py-2 px-4'>{user?.gender}</p>
            </label>
            </section>
{/* Remark Section */}
                    <div className="font-medium my-3">
                        <section className={`flex justify-between items-center gap-2 border-[1px] border-gray-500 bg-gray-300 rounded-md p-2 md:p-3`}>
                            <div className="flex-1 flex flex-col gap-y-2">
                                <p className="text-sm md:text-[16px] capitalize">Remark</p>
                                <textarea
                                    cols="30"
                                    className="p-2 h-28 w-full bg-transparent placeholder:text-gray-500 placeholder:text-sm"
                                    value={remark}
                                    ref={remarkRef}
                                    disabled={role=== "admin" ? false : true}
                                    onInput={(e) => setRemark(e.target.value)}
                                    placeholder="Add Description"
                                />
                            </div>
                        </section>
                    </div>


</div>

                    

                    {role === "admin" && <div className="flex justify-center">
                        <button
                            onClick={handleRemark}
                            className="w-48 my-2 px-8 py-2 text-white bg-[navy] rounded-md font-medium cursor-pointer"
                            disabled={loading}>
                            <span>{(journal?.remark && journal?.remark !== remark) ? 'Edit Remark' : 'Add Remark'}</span>
                            <span>{loading && <Spinner size="sm" className="ms-2" />}</span>
                        </button>
                    </div>}

            

        </div>

    )

}
export default RemarkJournal;