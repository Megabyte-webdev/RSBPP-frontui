import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../components/utils/base';
import { UserContext } from '../context/AuthContext';
import RoundChart from '../components/general/RoundChart';
import { Spinner } from 'react-bootstrap';

const CoursesOverview = ({ courses }) => {
  const { userCredentials } = useContext(UserContext);
  const [courseData, setCourseData] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchEnrolledStudents = async (courseId) => {
    try {
      const response = await axios.get(`${BASE_URL}enroll/getEnrollByCourceId/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${userCredentials.token}`,
        },
      });
      return response.data.enrolled_users?.length ||[];
    } catch (error) {
      console.error(error);
      return 0; // Return 0 if there's an error
    }
  };

  const courseDataRef = useRef([]);
const loadCourseData = async () => {
  if (!loader && courseDataRef.current.length === 0) {
    setLoader(true);
    const data = await Promise.all(
      courses?.map(async (course) => {
        const enrolledCount = await fetchEnrolledStudents(course.id);
        return {
          ...course,
          participation: (Math.min(enrolledCount, course?.participate) / course?.participate * 100).toFixed(1),
        };
      })
    );
    courseDataRef.current = data;
    setCourseData(data);
    setLoader(false);
  }
};


  useEffect(() => {
    if (courses?.length) {
      loadCourseData();
    }
  }, [courses]);

  return (
    <div className="p-6 pb-0 bg-gray-50 rounded-lg shadow-lg min-h-40">
      {loader ? <p className="w-full h-full flex items-center justify-center"><Spinner /></p>
      :<>
      {<h3 className="text-sm flex justify-center items-center font-semibold text-center capitalize">{courses?.length > 0 ? "Students overview": "No Courses available"}</h3>}
      <div className="grid grid-cols-responsive gap-2 justify-center">
        {courseData?.map((course) => (
          <div key={course?.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xs font-medium text-gray-700 mb-2">{course.title}</h3>
            <div className="max-w-60">
              <RoundChart
                strokeProps={{
                  strokeHeight: 350,
                  strokeSize: "50%",
                  strokeColor: ["#00E396", "#FEB019"],
                  strokeLabel: `${course.participation}%`,
                  shades: "5",
                  strokeCap: "round",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      </>
      }
      
    </div>
  );
};

export default CoursesOverview;
