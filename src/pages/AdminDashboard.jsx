import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/AuthContext";
import { MdAddBox, MdOutlineCalendarMonth, MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
// import DashboardWidget from "../components/dashboard/DashboardWidget";
import { FaVideo } from "react-icons/fa6";
import RoundChart from "../components/general/RoundChart";
import BarChart from "../components/general/BarCharts";

const AdminDashboard = () => {
  const { setSideBg } = useContext(ThemeContext);
  const { userCredentials } = useContext(UserContext);
  //   console.log(userCredentials);

  useEffect(() => {
    setSideBg("brown_sidebar");
  }, []);

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
                <p><b>336</b> <span className="fs_xsm">This Month</span></p>
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
                <p>Rescheduled meetings</p>
                <p><b>15</b> <span className="fs_xsm">This Month</span></p>
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
                <p><b>21</b> <span className="fs_xsm">This Month</span></p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Col md={11}>
        <Row className="my-5">
          <Col className="my-3 my-md-0" md={5}>
            <div className="shadow-sm h-100 rounded p-3">
              <div className="d-flex mb-4 border-bottom justify-content-between">
                <p className="my-4">Recently enrolled Students</p>
                <Link className="d-flex nav-link text-primary align-items-center">
                  <p className="fw-bold">see all</p>
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="light_sky rounded p-1 text-primary">
                  <span className="fw-bold">AA</span>
                </div>
                <div className="px-2">
                  <p className="fs_sm">Adepoju Ademola</p>
                  <p className="fs_xsm">Hello, Mr John i am yet to get your class b res...</p>
                </div>
                <p className="fs_xsm">10:25 am</p>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="light_sky rounded p-1 text-primary">
                  <span className="fw-bold">AA</span>
                </div>
                <div className="px-2">
                  <p className="fs_sm">Adepoju Ademola</p>
                  <p className="fs_xsm">Hello, Mr John i am yet to get your class b res...</p>
                </div>
                <p className="fs_xsm">10:25 am</p>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="light_sky rounded p-1 text-primary">
                  <span className="fw-bold">TA</span>
                </div>
                <div className="px-2">
                  <p className="fs_sm">Adepoju Ademola</p>
                  <p className="fs_xsm">Hello, Mr John i am yet to get your class b res...</p>
                </div>
                <p className="fs_xsm">10:25 am</p>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="light_sky rounded p-1 text-primary">
                  <span className="fw-bold">AA</span>
                </div>
                <div className="px-2">
                  <p className="fs_sm">Adepoju Ademola</p>
                  <p className="fs_xsm">Hello, Mr John i am yet to get your class b res...</p>
                </div>
                <p className="fs_xsm">10:25 am</p>
              </div>
            </div>
          </Col>
          <Col className="my-3 my-md-0" md={3}>
            <div className="shadow rounded h-100 p-2">
              <p className="fw-bold">Class Progress</p>
              <div className="light_sky my-2 rounded p-1">
                <div className="d-flex justify-content-between">
                  <div className="fs_xsm">
                    <p><b>Class A</b></p>
                    <p className="ash_text">78 Registered</p>
                  </div>
                  <div className="">
                    <RoundChart strokeProps={strokeProps} />
                  </div>
                </div>
              </div>
              <div className="light_sky my-2 rounded p-1">
                <div className="d-flex justify-content-between">
                  <div className="fs_xsm">
                    <p><b>Class A</b></p>
                    <p className="ash_text">78 Registered</p>
                  </div>
                  <div className="">
                    <RoundChart strokeProps={strokeProps} />
                  </div>
                </div>
              </div>
              <div className="light_sky my-2 rounded p-1">
                <div className="d-flex justify-content-between">
                  <div className="fs_xsm">
                    <p><b>Class A</b></p>
                    <p className="ash_text">78 Registered</p>
                  </div>
                  <div className="">
                    <RoundChart strokeProps={strokeProps} />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className="my-3 my-md-0" md={4}>
            <div className="shadow h-100 p-2">
              <div className="d-flex justify-content-between">
                <p className="my-4">Upcoming Activities</p>
                <Link className="d-flex nav-link text-primary align-items-center">
                  <p className="fw-bold">see all</p>
                </Link>
              </div>
              <div className="light_sky my-2 rounded p-1">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="rounded p-1 px-2 text-white" style={{ backgroundColor: "#0052B4" }}>
                    <span className="fw-bold">31</span>
                  </div>
                  <div className="px-2">
                    <p className="fs_sm">Meeting with the VC</p>
                    <p className="fs_xsm"> <Link to={""}>Meeting link//www.zoom.com Upcoming</Link> </p>
                  </div>
                  <div className="">
                    <p className="fs_xsm">10:25 am</p>
                    <p className="fs_xsm text-danger">Due soon</p>
                  </div>
                </div>
              </div>
              <div className="light_sky my-2 rounded p-1">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="rounded p-1 px-2 text-white" style={{ backgroundColor: "#0052B4" }}>
                    <span className="fw-bold">04</span>
                  </div>
                  <div className="px-2">
                    <p className="fs_sm">Meeting with the J..</p>
                    <p className="fs_xsm"> <Link to={""}>Meeting link//www.zoom.com Upcoming</Link> </p>
                  </div>
                  <div className="">
                    <p className="fs_xsm">10:25 am</p>
                    <p className="fs_xsm text-danger">Due soon</p>
                  </div>
                </div>
              </div>
              <div className="light_sky my-2 rounded p-1">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="rounded p-1 px-2 text-white" style={{ backgroundColor: "#0052B4" }}>
                    <span className="fw-bold">31</span>
                  </div>
                  <div className="px-2">
                    <p className="fs_sm">Meeting with the VC</p>
                    <p className="fs_xsm"> <Link to={""}>Meeting link//www.zoom.com Upcoming</Link> </p>
                  </div>
                  <div className="">
                    <p className="fs_xsm">10:25 am</p>
                    <p className="fs_xsm text-danger">Due soon</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      <div className="rounded bg-white py-5">
        <Row>
          <Col md={3}>
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
          <Col md={3}>
            <div className="border p-2 h-100 rounded">
              <p className="text-center my-2">Cloud Storage</p>
              <RoundChart strokeProps={strokePropsThree} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminDashboard;
