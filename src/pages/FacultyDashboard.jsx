import { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ResourceContext } from "../context/ResourceContext";
import CourseOverview from "../pages/CourseOverview";
import InstructorCourseAnalysis from "../components/instructor/InstructorCourseAnalysis";
import FacultyScheduleStats from "../components/faculty/FacultySheduleStats";
import axios from "axios";
import { BASE_URL } from "../components/utils/base";

const today = new Date();
const FacultyDashboard = () => {
  const { setSideBg } = useContext(ThemeContext);
  const { userCredentials } = useContext(UserContext);
  const {
    getAllCourses,
    setGetAllCourses,
    getAllInstructors,
    getAllInstructorsSchedules,
    setGetAllInstructorsSchedules,
    getAllSchedules,
    setGetAllSchedules,
    getEnrolledCourses,
    setGetEnrolledCourses, } = useContext(ResourceContext);
  const navigate = useNavigate()
  console.log(userCredentials);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  useEffect(() => {
    setGetAllCourses((prev) => {
      return {
        ...prev, isDataNeeded: true
      }
    })
  }, [])

  useEffect(() => {
    setGetAllSchedules((prev) => {
      return {
        ...prev, isDataNeeded: true
      }
    })
  }, [])


  useEffect(() => {
    setGetAllInstructorsSchedules((prev) => {
      return {
        ...prev, isDataNeeded: true
      }
    })
  }, [])

  const instructorCourses = getAllCourses.data?.filter((schedule => schedule.created_by_id == userCredentials.user.id))

  console.log(getAllInstructorsSchedules)
  const todaySchedules = getAllInstructorsSchedules.data?.filter(classItem => {
    // Assuming 'classem' has a 'date' property for the class
    const classDate = new Date(classItem.day);
    // Compare year, month, Itand day to check if dates are the same
    return (classDate.getFullYear() == today.getFullYear() &&
      classDate.getMonth() == today.getMonth() &&
      classDate.getDate() == today.getDate());
  });

  // const myClasses = todaySchedules?.filter((schedule) => getEnrolledCourses.data?.some((enrollCourse) => enrollCourse.courseId == schedule.course_id))

  // console.log(myClasses);

  const strokeProps = {
    strokeCap: "round",
    strokeColor: "#0052B4",
    strokeSize: "50%",
    strokeHeight: "100px",
    strokeLabel: "32%"
  }

  const strokePropsTwo = {
    strokeCap: "round",
    strokeColor: "#AB3335",
    strokeSize: "65%",
    // strokeHeight: "100",
    strokeLabel: "Completed"
  }

  const strokePropsThree = {
    strokeCap: "round",
    strokeColor: "#0052B4",
    strokeSize: "65%",
    // strokeHeight: "100",
    strokeLabel: "Storage Used"

  }


  const fetchEnrolledStudents = async (courseId) => {
    try {
      const response = await axios.get(`${BASE_URL}enroll/getEnrollByCourceId/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${userCredentials?.token}`,
        },
      });
      return response.data.enrolled_users || []; // Return the array of enrolled users
    } catch (error) {
      console.error(error);
      return []; // Return an empty array if there's an error
    }
  };

  useEffect(() => {

    const getAllEnrolledStudents = async () => {
      try {
        if (!instructorCourses || instructorCourses.length === 0) {
          setEnrolledStudents([]); // No courses are enrolled
        }

        // Fetch enrolled students for all courses and merge the results
        const allEnrolledStudents = await Promise.all(
          instructorCourses?.map((course) => fetchEnrolledStudents(course.id))
        );

        // Flatten the array of arrays
        const mergedEnrolledStudents = allEnrolledStudents.flat();

        console.log("All enrolled students:", mergedEnrolledStudents);
        setEnrolledStudents(mergedEnrolledStudents);
      } catch (error) {
        console.error(error);
        setEnrolledStudents([]);
      }
    };
    if (getAllCourses.data) {
      getAllEnrolledStudents();
    }
  }, [getAllCourses])



  return (
    <div
      className="p-3 p-md-5"
      style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
    >
      <FacultyScheduleStats allSchedules={getAllInstructorsSchedules.data} />
      <Col>
        <div className="my-5 pt-5 grid grid-cols-responsive3 gap-2">
          <Col className="my-3 my-md-0 min-w-72">
            <div className="shadow-sm min-h-60 rounded p-3">
              <div className="d-flex mb-4 pb-2 border-bottom justify-content-between">
                <p className="">Recently enrolled Students</p>
                <Link to="/participant_list" className="d-flex nav-link text-primary align-items-center">
                  <p className="fw-bold">see all</p>
                </Link>
              </div>

              {enrolledStudents?.map(user => (
                <div key={user?.id} className="d-flex align-items-center justify-content-center">
                  <div className="light_sky rounded p-1 text-primary">
                    <span className="fw-bold">{`${user?.first_name[0]} ${user?.last_name[0]}`}</span>
                  </div>
                  <div className="px-2 mr-auto">
                    <p className="fs_sm">{`${user?.first_name} ${user?.last_name}`}</p>
                    <p className="fs_xsm">{user?.email}</p>
                  </div>

                </div>))
              }
            </div>
          </Col>
          <Col className="my-3 my-md-0 ">
            <div className="shadow rounded h-100 p-2">
              <p className="fw-bold">Course Progress</p>
              <div className="overflow_y">
                <CourseOverview courses={instructorCourses} />
                {/* {instructorCourses?.map((course) => (
                  <InstructorCourseAnalysis key={course.id} course={course} />
                ))} */}

              </div>
            </div>
          </Col>
          <Col className="my-3 my-md-0">
            <div className="shadow min-h-60 p-2">
              <div className="d-flex mb-4 pb-2 border-bottom justify-content-between">
                <p className="">Upcoming Classes</p>
                <Link to="/meetings_history" className="d-flex nav-link text-primary align-items-center">
                  <p className="fw-bold">see all</p>
                </Link>
              </div>
              {getAllInstructorsSchedules.data === null && <p className="w-full h-full flex items-center justify-center"><Spinner /></p>}

              {getAllInstructorsSchedules.data?.slice(0, 5)?.map(schedule => (
                <div key={schedule?.id} onClick={() => navigate('/time_table', { state: { startDate: schedule?.start } })} className="cursor-pointer light_sky my-2 rounded p-1">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="rounded p-1 px-2 text-white" style={{ backgroundColor: "#0052B4" }}>
                      <span className="fw-bold">{schedule?.day?.split("-")[2]}</span>
                    </div>
                    <div className="px-2 mr-auto">
                      <p className="fs_sm">{getAllCourses.data?.find(one => one.id === schedule?.course_id)?.title}</p>
                      <p className="fs_xsm"> <Link to={""}>{schedule?.meeting_code}</Link> </p>
                    </div>
                    <div className="">
                      <p className="fs_xsm">{schedule?.start_time?.slice(0, 5)}</p>
                      <p className="fs_xsm text-danger">{schedule?.end_time?.slice(0, 5)}</p>
                    </div>
                  </div>
                </div>))}
              {getAllInstructorsSchedules.data?.length < 1 && <p className="text-center fs-5">No live class today</p>}
            </div>
          </Col>
        </div>
      </Col >
      {/* <div className="rounded bg-white py-5">
        <Row>
          <Col>
            <div className="border p-2 h-100 rounded">
              <p className="text-center my-2">Syllabus Overview</p>
              <RoundChart strokeProps={strokePropsTwo} />
            </div>
          </Col>
          <Col md={6} className="px-5">
            <div className="border p-2 h-100 rounded">
              <div className="d-flex justify-content-between">
                <p>Attendance Overview</p>
                <p>Jan 2024</p>
              </div>
              <BarChart />
            </div>
          </Col>
          <Col>
            <div className="border p-2 h-100 rounded">
              <p className="text-center my-2">Cloud Storage</p>
              <RoundChart strokeProps={strokePropsThree} />
            </div>
          </Col>
        </Row>
      </div> */}
    </div >
  );
};

export default FacultyDashboard;
