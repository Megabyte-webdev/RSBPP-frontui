import { useContext, useState } from 'react'
import featurePics from "../../assets/feature-courses.png"
import { FaRegClock } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { TbCurrentLocation } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { BiSolidCart } from 'react-icons/bi';
import { BASE_URL, IMAGE_URL } from '../utils/base';
import axios from 'axios';
import { ResourceContext } from '../../context/ResourceContext';
import toast from 'react-hot-toast';
import { Spinner } from 'react-bootstrap';
import ConfirmDelete from '../general/ConfirmDelete';
import NewModal from '../general/NewModal';

const LearningCourse = ({ course, userCredentials, cartList, getAllInstructors }) => {

  const navigate = useNavigate();
  const { getAllCarts, setGetAllCarts, setGetAllCourses } = useContext(ResourceContext);

  const [errorMesage, setErrorMessage] = useState('');
  const [show, setShow] = useState(false);

  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false)

  const date = new Date(course.updated_at);
  const userRole = userCredentials?.user.role
  const itemId = course.id

  const details = {
    user_id: userCredentials?.user.id,
    course_id: course?.id
  }
  const adminAndInstructor = userRole === "admin" || userRole === "instructor"
  const adminAuth = userRole === "admin"
  const hasItem = cartList?.some(item => item.courseId === course.id)
  function HandleAddToCart(){
    scrollTo(0, 0); navigate('/carts'); if (fromLocal === null || (fromLocal && !fromLocal.data.find((item) => item.title === details.title))) {
        localStorage.setItem("carts", JSON.stringify(fromLocal ? [{ user: "guest", data: [...fromLocal.data, details] }] : [{ user: "guest", data: [details] }]))
    } localStorage.setItem("comingFrom", JSON.stringify({ user: "guest" }))

}
  const addToCart = () => {
    setGetAllCarts((prev) => {
      return {
        ...prev, isDataNeeded: false
      }
    })
    axios.post(`${BASE_URL}cart/addCart`, details, {
      headers: {
        'Authorization': `Bearer ${userCredentials.token}`,
      },
    })
      .then(response => {
        console.log(response)
        toast.success(response.data.message)
        setGetAllCarts((prev) => {
          return {
            ...prev, isDataNeeded: true
          }
        })
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage(error.message);
        }
      });
  };
  const instructorDetails = getAllInstructors?.find((instructor) => instructor.user_id == course.created_by_id);

  const deleteFunc = async () => {
    setGetAllCourses((prev) => {
      return {
        ...prev, isDataNeeded: false
      }
    })
    setIsDeleting(true)
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${userCredentials.token}`
      },
    }
    try {
      const response = await fetch(`${BASE_URL}course/deleteCourse/${itemId}`, params);
      if (response.ok) {
        await response.json();
        setGetAllCourses((prev) => {
          return {
            ...prev, isDataNeeded: true
          }
        })
        setShow(false)
        setIsDeleting(false)
        toast.success("successful");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
      setIsDeleting(false)
    }
  }

  return (
    <div className='rounded bg-white mb-3 h-100 '>
      <div className='hover_effect h-100 d-flex flex-column justify-content-between'>
        <div onClick={() => navigate(`/learning/${course.title}`, { state: { course: course, instructorDetails: instructorDetails } })} className='nav-link pointer'>
          <div>
            <img src={course.image ? `${IMAGE_URL}/${course.image}` : featurePics} alt="" className="img-fluid w-100" />
          </div>
          <div className="p-2 fs_xsm">
            <p className="fw-semibold mb-1">{course.title}</p>
            {/* <p dangerouslySetInnerHTML={{ __html: course.description }} /> */}
            <p className='my-3'>
              {course.description}
            </p>
            <div className="my-2 px-1 fw-semibold d-flex justify-content-between">
              <div className='d-flex'>
                <span> <FaRegClock className='prime_brown' /></span>
                <span className='ms-2'>{date.toLocaleTimeString()}</span>
              </div>
              <div className='d-flex'>
                <span> <TbCurrentLocation className='prime_brown' /></span>
                <span className='ms-2'>{course.course_type}</span>
              </div>
              <div className='d-flex'>
                <span> <MdAssignmentAdd className='prime_brown' /></span>
                <span className='ms-2'> $ {course.price}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          {!adminAndInstructor && (
            <div className='px-1 mb-2'>
              <button
                disabled={hasItem}
                onClick={() => addToCart()}
                className='btn w-100 btn-danger d-flex align-items-center'>Add to Cart <span className="ms-3"><BiSolidCart /></span></button>
            </div>
          )}
          {adminAndInstructor && (<div className='px-1'>
            <button
              onClick={() => navigate(adminAuth ? `/faculty_courses/${course.id}` : `/instructor_courses/${course.id}`, { state: { course: course } })}
              className='btn w-100 mb-2 blue_bg text-white'>Edit Course</button>
            {/* <button
            onClick={() => deleteFunc()}
            className='btn w-100 btn-secondary'>Delete Course {isDeleting && <span><Spinner size='sm' /> </span>}  </button> */}
            <ConfirmDelete
              course={course}
              show={show}
              setShow={setShow}
              errorMesage={errorMesage}
              isDeleting={isDeleting}
              deleteFunc={deleteFunc}
            />
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default LearningCourse