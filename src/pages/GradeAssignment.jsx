import { useLocation } from "react-router-dom"
import { ResourceContext } from "../context/ResourceContext";
import { UserContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../components/utils/base";
import axios from "axios";
import toast from "react-hot-toast";
import GradeDetails from "./GradeDetails";
import { Spinner } from "react-bootstrap";
const GradeAssignment = () => {
    const location= useLocation();
    const {assignment} =location.state;
    const [loading, setLoading] = useState(false);
    const [remark, setRemark] = useState(assignment?.remark || "");
  const [score, setScore] = useState(assignment?.grade || 0);
    const [submissionId, setSubmissionId ]= useState(null)
  const { setGetAllFaculty, getAllFaculty } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);

useEffect(()=>{
    axios.get(`${BASE_URL}course/getAssignmentSubmit/${assignment.course_id}`, {
        headers: {
            Authorization: `Bearer ${userCredentials.token}`,
        }
    })
    .then((response)=>{
        console.log(response.data);
        setSubmissionId(response.data.allAssignmentSubmit[0]?.id);

    })
    .catch((error) =>{
            console.error(error);
            toast.error(
                error?.response?.data?.message || "Error confirming assignment submission"
            );
        });
        
        
},[assignment])
  
  const handleGrade = () => {
    if(submissionId){
        if(!remark || !score){
            toast.error("Enter grade and comment")
            return;
        }
        
    let details = {
        id: submissionId,
        grade: score,
        remark: remark
    }
    console.log(details)
    


    setLoading(true)
    axios
        .post(`${BASE_URL}course/gradeAssignmentSubmit`, details, {
            headers: {
                Authorization: `Bearer ${userCredentials.token}`,
            },
        })
        .then((response) => {
            console.log(response)
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
}

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
    
  return (
    <div className="flex flex-wrap">
    <div className='grid grid-cols-auto gap-4 pt-5 gap-y-6 px-2 sm:px-0'>
        <div
            key={assignment.id}
            className="h-max cursor-pointer bg-white shadow-md shadow-slate-600 rounded-lg p-6 flex flex-col items-center"
          >
            <img
              src={assignment?.image || 'https://via.placeholder.com/100'}
              alt={assignment?.user_id}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-lg text-center font-semibold">Aflabi Mubarak</h3>
            <p className="text-sm text-gray-500">{getDetails('faculty', assignment.course_id, assignment.faculty_id)?.title}</p>
            <p className="text-sm text-gray-400">{assignment?.email}</p>
            <p className="text-xs text-gray-500">
              Submitted by: {assignment?.user_id}
            </p>
          </div>
          </div>

          <div className="flex-1">
          <GradeDetails handleGrade={handleGrade} data={assignment} score={score} setScore={setScore} remark={remark} setRemark={setRemark} />
          
      {/* Submit Button */}
      <div className="flex items-center justify-center mt-[-3px] mb-2">
        <button
        onClick={handleGrade}
          className={`bg-[navy] text-white py-2 px-8 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          <span>Submit</span>{loading && <Spinner animation="border" size="sm" />}
        </button>
      </div>
          </div>
    </div>
  )

}
export default GradeAssignment