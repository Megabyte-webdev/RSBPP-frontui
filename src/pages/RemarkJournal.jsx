import { BsJournalCheck } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { ResourceContext } from '../context/ResourceContext';
import { useContext, useEffect, useRef, useState } from "react";
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

    const { getAllFaculty, setGetAllFaculty } = useContext(ResourceContext);
    const { userCredentials } = useContext(UserContext);
    const role= userCredentials?.user?.role
    useEffect(() => {
        setGetAllFaculty(prev => ({ ...prev, isDataNeeded: true }));
    }, [])


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
            className="flex flex-col p-3 p-md-5 min-vh-100 poppins"
            style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}
        >
            <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
                <BsJournalCheck size="24" /> Remark Journal
            </p>

            <div className="">
                {journal && <div className="flex flex-col gap-y-3">
                    <div className="flex gap-3 text-sm md:text-xl">
                        <p className="font-bold">Faculty: </p>
                        <p className="md:text-[18px]">{getDetails('faculty', journal?.course_id, journal?.faculty_id)?.title}</p>
                    </div>
                    <div className="flex gap-3 text-sm md:text-xl">
                        <p className="font-semibold">Course: </p>
                        <p className="md:text-[18px]">{getDetails('course', journal?.course_id, journal?.faculty_id)?.title}</p>
                    </div>
                    <div className="flex gap-3 text-sm md:text-xl">
                        <p className="font-semibold">Date: </p>
                        <p className="md:text-[18px]">{formatDate(journal?.created_at)}</p>
                    </div>
                    {/* <div className="flex items-center gap-3 text-sm md:text-xl">
                        <p className="font-semibold">File Submitted: </p>
                        <img className={`${journal?.file_submission && "w-full h-[300px] object-cover"}`} src={`${IMAGE_URL}${journal?.file_submission}`} alt={journal?.file_submission} />
                    </div> */}

                    <div className="flex flex-col gap-1 text-sm md:text-xl">
                        <p className="font-semibold">Journal: </p>
                        <p className="border-[1px] border-green-500 p-2 md:text-[16px] text-sm rounded-md">{journal?.text_submission}</p>
                    </div>

                    {/* Remark Section */}
                    <div className="font-medium my-3">
                        <section className={`flex justify-between items-center gap-2 border-[1px] ${journal?.remark ? 'border-green-500':'border-red-500'} rounded-md p-2 md:p-3`}>
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

                    {role === "admin" && <div className="flex justify-center">
                        <button
                            onClick={handleRemark}
                            className="w-48 my-2 px-8 py-2 text-white bg-[navy] rounded-md font-medium cursor-pointer"
                            disabled={loading}>
                            <span>{(journal?.remark && journal?.remark !== remark) ? 'Edit Remark' : 'Add Remark'}</span>
                            <span>{loading && <Spinner size="sm" className="ms-2" />}</span>
                        </button>
                    </div>}

                </div>}
            </div>

        </div>

    )

}
export default RemarkJournal;