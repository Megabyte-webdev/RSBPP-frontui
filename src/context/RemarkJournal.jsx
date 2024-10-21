import { BsJournalCheck } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { ResourceContext } from '../context/ResourceContext';
import { useContext, useEffect } from "react";

const RemarkJournal=()=>{
    const location = useLocation();
    
    const {journal}= location.state;

    const { getAllFaculty, setGetAllFaculty } = useContext(ResourceContext);

    useEffect(()=>{
        setGetAllFaculty(prev => ({ ...prev, isDataNeeded: true })); 
    },[])
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


    return(
        <div
      className="flex flex-col p-3 p-md-5 min-vh-100 poppins"
      style={{ backgroundColor: "hsla(219, 50%, 95%, .3)" }}
    >
      <p className="sticky top-18 bg-transparent ml-auto my-2 flex items-center gap-2 font-medium">
        <BsJournalCheck size="24" /> Remark Journal
      </p>

      <div className="">
            {journal?.map((item, index)=>(
                <div key={index}>
                    <p>{getDetails('faculty', item?.course_id, item?.faculty_id)?.title}</p>
                    <p>{getDetails('course', item?.course_id, item?.faculty_id)?.title}</p>
                    <p>{formatDate(item?.created_at)}</p>
                    <img src={item?.file_submission} alt="img" />
                    <p>{item?.text_submission}</p>
                    <textarea cols="30" rows="10" placeholder="RemarkJournal" value={item.remark}></textarea>

                    {item.remark === null && <button>Add Remark</button>}

                </div>
            ))}
      </div>
      
    </div>

    )

}
export default RemarkJournal;