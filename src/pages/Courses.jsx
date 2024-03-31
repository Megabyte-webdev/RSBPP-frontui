import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FiSearch } from 'react-icons/fi'
import CoursesStats from '../components/courses/CoursesStats'
import ReactCalendar from '../components/general/ReactCalendar'
import FeatureCourses from '../components/courses/FeatureCourses'
import { ThemeContext } from '../context/ThemeContext'
import user from "../assets/user-icon.png"


const Courses = () => {
    const { setSideBg } = useContext(ThemeContext);

    useEffect(()=>{
      setSideBg("brown_sidebar")
  }, [])

  return (
    <div className='p-5 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, 1)" }}>
      <div className='col-8 col-md-4'>
        <form className='open_sans mb-3 ' style={{ color: "hsla(242, 97%, 15%, .6)" }}>
          <div className="mb-4">
            <div className='position-relative'>
              <input type="text" className="btn border bg-white text-start px-5 py-2 w-100" id="search" placeholder='Search' />
              <span className="position-absolute start-0 top-0 p-2"><FiSearch /> </span>
            </div>
          </div>
        </form>
      </div>
      <Row>
        <Col md={9}>
          <div className="brown_bg p-5 my-4 rounded">
                        <div className="d-flex align-items-center text-white">
                            <div className="me-3 border border-4 rounded-pill">
                                <img src={user} alt="" className="img-fluid" />
                            </div>
                            <div>
                                <p>Ekong  Lawal</p>
                                <p>S7 - Electronics and communication Engineering</p>
                                <p className="fs_xsm">Course No : 673664646</p>
                            </div>
                        </div>
                    </div>
          <div className="d-flex px-3 mb-3 justify-content-between">
            <h5 className="prime_blue">Course Stats</h5>
            <p>View all</p>
          </div>
          <Row>
            <Col md={4}>
              <CoursesStats />
            </Col>
            <Col md={4}>
              <CoursesStats />
            </Col>
            <Col md={4}>
              <CoursesStats />
            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <ReactCalendar />
        </Col>
      </Row>
      <div className="my-3">
        <h5 className="prime_blue mb-3" >Course Stats</h5>
        <Row>
          <Col md={9}>
            <Row>
              <Col md={4}>
                <FeatureCourses />
              </Col>
              <Col md={4}>
                <FeatureCourses />
              </Col>
              <Col md={4}>
                <FeatureCourses />
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <div className="bg-white" style={{ minHeight: "200px" }}>
              <div className="border-bottom py-3">
                <p className="text-center">Upcoming Events</p>

              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Courses