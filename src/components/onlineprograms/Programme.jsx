import { useEffect, useState } from "react";
import Hero from "./Hero";
import ProgramPreview from "./ProgramPreview";
import { useLocation } from "react-router-dom";
//import programList from './programList';
import axios from "axios";
import { BASE_URL, TOKEN } from "../utils/base";
const Programme = ({displayType}) => {
  const { state } = useLocation();
  const courseId = state.courseId;
  console.log(courseId);
  const [programInfo, setProgramInfo] = useState(null);
  useEffect(() => {
    axios
      .get(`${BASE_URL}guest/getCourseById/${courseId}`)
      .then((response) => {
        const {course}=response.data
        setProgramInfo(course[0]);
        console.log(course[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [courseId]);

  scrollTo(0, 0);
  
  return (
    
    programInfo ?
      <>
        <Hero programme={true} title={programInfo.title && programInfo.title} programInfo={programInfo} displayType={displayType} />
        <ProgramPreview details={programInfo && programInfo} />
      </>
      :
      <>
        <Hero programme={true} title="Loading..." />
        <ProgramPreview details="Loading..." />
      </>
    )
};
export default Programme;
