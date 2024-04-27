import { useContext, useState } from 'react'
import featurePics from "../../assets/feature-courses.png"
import { FaRegClock } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { TbCurrentLocation } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { BiSolidCart } from 'react-icons/bi';
import { BASE_URL } from '../utils/base';
import axios from 'axios';
import ResourceContextProvider, { ResourceContext } from '../../context/ResourceContext';

const LearningCourse = ({ course, userCredentials, cartList }) => {

  const navigate = useNavigate();

  const { getAllCarts, setGetAllCarts } = useContext(ResourceContext);

  const [errorMesage, setErrorMessage] = useState('');

  const date = new Date(course.updated_at);

  const details = {
    user_id: userCredentials?.user.id,
    course_id: course?.id
  }

const hasItem = cartList?.some(item => item.id === course.id)

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
  return (
    <div className='rounded bg-white mb-3'>
      <div onClick={() => navigate(`/learning/${course.title}`, { state: { course: course } })} className='nav-link pointer'>
        <div>
          <img src={featurePics} alt="" className="img-fluid w-100" />
        </div>
        <div className="p-2 fs_xsm">
          <p className="fw-semibold mb-1">{course.title}</p>
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
      <div className='px-1'>
        <button
        disabled={hasItem}
        onClick={()=> addToCart()}
         className='btn w-100 btn-danger'>Add to Cart <span><BiSolidCart /></span></button>
      </div>
    </div>
  )
}

export default LearningCourse