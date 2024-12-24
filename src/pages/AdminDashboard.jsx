import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/AuthContext";
import { ResourceContext } from "../context/ResourceContext";
import { MdAddBox, MdOutlineCalendarMonth, MdOutlineCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
// import DashboardWidget from "../components/dashboard/DashboardWidget";
import { FaVideo } from "react-icons/fa6";
import RoundChart from "../components/general/RoundChart";
import BarChart from "../components/general/BarCharts";
import CourseOverview from './CourseOverview'
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { setSideBg } = useContext(ThemeContext);
  const { setGetAllUsers, getAllUsers, setGetAllCourses, getAllCourses, getAllSchedules, setGetAllSchedules } = useContext(ResourceContext);
  const { userCredentials } = useContext(UserContext);
  //   console.log(userCredentials);
  const [stats, setStats] = useState({})
  useEffect(() => {
    setSideBg("brown_sidebar");
    setGetAllUsers((prev) => ({ ...prev, isDataNeeded: true }));
    setGetAllSchedules((prev) => ({ ...prev, isDataNeeded: true }));
    setGetAllCourses((prev) => ({ ...prev, isDataNeeded: true }));
  }, []);
  console.log(getAllCourses, getAllUsers)

  const calculateStats = (scheduleData) => {
    const currentMonth = new Date().toISOString().slice(0, 7); // e.g., "2024-12"

    const totalSchedules = scheduleData.length;
    const schedulesThisMonth = scheduleData.filter((schedule) =>
      schedule.day.startsWith(currentMonth)
    ).length;
    const cancelledSchedules = scheduleData.filter(
      (schedule) => schedule.status === "cancel"
    ).length;

    setStats({
      totalSchedules,
      schedulesThisMonth,
      cancelledSchedules,
    });
  };

  // Recalculate stats whenever schedules change
  useEffect(() => {
    if (getAllSchedules.data?.length > 0) {
      calculateStats(getAllSchedules?.data);
    }
  }, [getAllSchedules]);

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

  return (
    <div
      className="p-3 p-md-5"
      style={{ backgroundColor: "hsla(0, 0%, 85%, .1)" }}
    >
      <Col md={10} className="d-flex mb-4 justify-content-between">
        <h6 className="my-4">Upcoming Courses  Meeting</h6>
        {/* <DashboardWidget /> */}
        <Link className="d-flex nav-link text-primary align-items-center">
          <span>
            <MdAddBox size={25} className="me-2" />
          </span>
          <p className="fs_sm">Invite Participant</p>
        </Link>
      </Col>
      <Row className="border border-primary p-2 rounded-3">
        <Col md={4} className="my-3 my-md-0">
          <div className="border-end py-3 d-md-flex justify-content-center">
            <div className="d-flex align-items-center" >
              <div style={{ color: "#D1D0D0", marginRight: "1rem" }}>
                <span>
                  <FaVideo size={30} />
                </span>
              </div>
              <div>
                <p>No. of meetings</p>
                <p><b>{stats?.totalSchedules}</b></p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="my-3 my-md-0">
          <div className="border-end py-3 d-md-flex justify-content-center">
            <div className="d-flex align-items-center" >
              <div style={{ color: "#D1D0D0", marginRight: "1rem" }}>
                <span>
                  <MdOutlineCalendarMonth size={30} />
                </span>
              </div>
              <div>
                <p>Scheduled meetings</p>
                <p><b>{stats?.schedulesThisMonth}</b> <span className="fs_xsm">This Month</span></p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="my-3 my-md-0">
          <div className="border-end py-3 d-md-flex justify-content-center">
            <div className="d-flex align-items-center" >
              <div style={{ color: "#D1D0D0", marginRight: "1rem" }}>
                <span>
                  <MdOutlineCancel size={30} />
                </span>
              </div>
              <div>
                <p>Cancelled meetings </p>
                <p><b>{stats?.cancelledSchedules}</b> <span className="fs_xsm">This Month</span></p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Col>
        <div className="flex flex-wrap my-5 justify-between gap-3">
          <Col className="my-3 my-md-0 w-full min-w-60">
            <div className="shadow-sm h-100 rounded p-3">
              <div className="d-flex mb-4 border-bottom justify-content-between">
                <p className="my-4">Recently enrolled Students</p>
                <div onClick={() => navigate("/registra")} className="d-flex nav-link text-primary align-items-center">
                  <p className="fw-bold">see all</p>
                </div>
              </div>
              {
                getAllUsers?.data?.filter(item => item.role === "student")?.slice(0, 7)?.map((user) => (
                  <div key={user?.id} className="d-flex align-items-center justify-content-center">
                    <div className="light_sky rounded p-1 text-primary">
                      <span className="fw-bold">{`${user?.first_name[0]} ${user?.last_name[0]}`}</span>
                    </div>
                    <div className="px-2 mr-auto">
                      <p className="fs_sm">{`${user?.first_name} ${user?.last_name}`}</p>
                      <p className="fs_xsm">{user?.organization}</p>
                    </div>
                    <p className="fs_xsm">10:25 am</p>
                  </div>
                ))
              }
            </div>
          </Col>

          <Col className="my-3 my-md-0  min-w-60" >
            <div className="shadow h-100 p-2">
              <div className="d-flex justify-content-between">
                <p className="my-4">Upcoming Activities</p>
                <Link className="d-flex nav-link text-primary align-items-center">
                  <p className="fw-bold">see all</p>
                </Link>
              </div>
              {getAllSchedules.data?.slice(0, 5)?.map(schedule => (
                <div key={schedule?.id} className="light_sky my-2 rounded p-1">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="rounded p-1 px-2 text-white" style={{ backgroundColor: "#0052B4" }}>
                      <span className="fw-bold">{schedule?.day?.split("-")[2]}</span>
                    </div>
                    <div className="px-2 mr-auto">
                      <p className="fs_sm">{schedule?.title}</p>
                      <p className="fs_xsm"> <Link to={""}>{schedule?.meeting_code}</Link> </p>
                    </div>
                    <div className="">
                      <p className="fs_xsm">{schedule?.start_time?.slice(0, 5)}</p>
                      <p className="fs_xsm text-danger">{schedule?.end_time?.slice(0, 5)}</p>
                    </div>
                  </div>
                </div>))}

            </div>
          </Col>
        </div>
      </Col>
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Courses and Users Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Courses Overview Section */}
          <div className="bg-white p-4 rounded-lg shadow-md ">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Courses Overview</h3>
            <div className="h-80 overflow-y-auto">
              {/* Simple Chart for Courses */}
              <CourseOverview courses={getAllCourses?.data} />
            </div>
          </div>

          {/* Users Overview Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Users Overview</h3>
            <div className="h-64">
              {/* Simple Chart for Users */}
              <BarChart users={getAllUsers?.data} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
