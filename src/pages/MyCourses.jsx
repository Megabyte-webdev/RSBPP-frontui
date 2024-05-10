import { MdOutlineMoreHoriz } from "react-icons/md"
import { Link } from "react-router-dom"
import EnrolledCourse from "../components/courses/EnrolledCourse"
import { useContext, useEffect, useState } from "react"
import { ResourceContext } from "../context/ResourceContext"
import axios from "axios"
import { BASE_URL } from "../components/utils/base"
import { UserContext } from "../context/AuthContext"

const MyCourses = () => {
    const { getAllCourses, setGetAllCourses } = useContext(ResourceContext)
    const { userCredentials } = useContext(UserContext)
    useEffect(() => {
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    const getScheduleById = (id, setState) => {
        // setGetAllCarts((prev) => {
        //   return {
        //     ...prev, isDataNeeded: false
        //   }
        // })
        axios.get(`${BASE_URL}schedule/scheduleByCourseId/${id}`, {
          headers: {
            'Authorization': `Bearer ${userCredentials.token}`,
          },
        })
          .then(response => {
            // console.log(response.data.schedule)
            setState(response.data.schedule)
            // setGetAllCarts((prev) => {
            //   return {
            //     ...prev, isDataNeeded: true
            //   }
            // })
          })
          .catch((error) => {
            console.log(error);
            if (error.response) {
              console.log(error.response.data.message);
            } else {
              console.log(error.message);
            }
          });
      };

    return (
        <div className='p-3 p-md-5 poppins' style={{ backgroundColor: "hsla(219, 50%, 95%, 1)", minHeight: "100vh" }}>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <h3 className="prime_brown bottom_brown py-3">My Courses</h3>
                </div>
                <div className="d-flex align-items-center">
                    <Link to="" className="nav-link me-3">View</Link>
                    <div className="dropdown">
                        <button className="btn border-black border w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Type
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <span className="ms-2">
                        <MdOutlineMoreHoriz size={25} />
                    </span>
                </div>

            </div>
            <div className="my-5">
                <div className="col-md-11">
                    {
                        getAllCourses.data?.map((course) => (
                            <EnrolledCourse
                             key={course.id} 
                             course={course}
                             getScheduleById={getScheduleById} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MyCourses