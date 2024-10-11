import { useEffect, useState } from "react";
import Hero from "./Hero";
import ProgramPreview from "./ProgramPreview";
import { useLocation } from "react-router-dom";
//import programList from './programList';
import axios from "axios";
import { BASE_URL, TOKEN } from "../utils/base";
const Programme = () => {
  const { state } = useLocation();
  const courseId = state.courseId;
  console.log(courseId);
  const [programInfo, setProgramInfo] = useState(null);
  useEffect(() => {
    axios
      .get(`${BASE_URL}course/getCourseById/${courseId}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        const {course}=response.data
        setProgramInfo(course);
        console.log(programInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [courseId]);

  scrollTo(0, 0);
  return (
    programInfo &&
      <>
        <Hero programme={true} title={programInfo.title && programInfo.title} />
        <ProgramPreview details={programInfo && programInfo} />
      </>
    )
};
export default Programme;
