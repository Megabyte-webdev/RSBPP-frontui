import { useContext, useEffect, useState } from 'react'
import NavBar from '../components/layout/NavBar'
import CartsItem from '../components/carts/CartsItem';
import { ResourceContext } from '../context/ResourceContext';
import LearningCourse from '../components/Learning/LearningCourse';
import CourseCarousel from '../components/general/CourseCarousel';
import { useNavigate } from 'react-router-dom';

const Carts = () => {
    const navigate = useNavigate();

    const {
        getAllCourses,
        setGetAllCourses } = useContext(ResourceContext)

const on = true

    useEffect(() => {
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        }) 
    }, [])

    const listUsers = getAllCourses.data?.map((course) => {
        return (
            <LearningCourse key={course.id} course={course} />
        )
    })
    return (
        <div style={{ backgroundColor: "hsla(0, 0%, 95%, 1)" }}>
            <NavBar />
            <div className="brown_bg p-3 p-md-5 text-white">
                <div className="d-flex justify-content-center align-items-center">
                </div>
                <div className="text-center ">
                    <h2 className="my-5">
                        SHOPPING CART
                    </h2>
                </div>
            </div>
            <div className="mt-5 border-top pb-5">
                <div className="container">
                    <div className="row py-4 mb-5">
                        <div className="col-md-8">
                            <div className="">
                                <div className="border-bottom pb-3">
                                    <h5>Shopping Chart</h5>
                                    <p>Showing 3 products you added</p>
                                </div>
                                {/* <div className="border-bottom py-3 ">
                                    <div className="form-check col d-flex align-items-center">
                                        <input className="form-check-input" type="checkbox" name="paymentMethod" value="" id="paystack" />
                                        <label className="form-check-label ms-3" htmlFor="paystack">
                                            <div className='d-flex align-items-center'>
                                                <div className='col-md-3'>
                                                    <img src={img} alt="" className="img-fluid w-50" />
                                                </div>
                                                <div className="">
                                                    <p className="ash_text fw-semibold fs_sm">MAN FASHION</p>
                                                    <p className="fw-bolder ">Python Programming - From Basics to Advanced level</p>
                                                    <p className="fw-bolder ">$292</p>
                                                </div>
                                                <div className="d-flex">
                                                    <button onClick={reduceItemfunc}>
                                                        <CgMathMinus />
                                                    </button>
                                                    <span className='mx-2'>{addItem}</span>
                                                    <button onClick={addItemfunc}>
                                                        <IoMdAdd />
                                                    </button>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div> */}
                                <CartsItem on={on} />
                                <CartsItem on={on} />
                                <CartsItem on={on} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <div className="border border-black p-4">
                                    <h4>Order Summary</h4>
                                    <div>
                                        <div className="d-flex mb-3 justify-content-between">
                                            <p>Striped T-Shirt</p>
                                            <p>$24</p>
                                        </div>
                                        <div className="d-flex mb-3 justify-content-between">
                                            <p>Black Longsleve T-Shirt</p>
                                            <p>$32</p>
                                        </div>
                                        <div className="d-flex mb-3 justify-content-between">
                                            <p>Striped Blue Windbreaker...</p>
                                            <p>$54</p>
                                        </div>
                                    </div>
                                    <div className="border-top py-3 ash_text">
                                        <div className="d-flex mb-3 justify-content-between">
                                            <p>Total Price (item)</p>
                                            <p>$114</p>
                                        </div>
                                        <div className="d-flex mb-3 justify-content-between">
                                            <p>Shipping Tax & Fee</p>
                                            <p>$10</p>
                                        </div>
                                        <div className="d-flex mb-3 text-black fw-bold justify-content-between">
                                            <p>Shipping Tax & Fee</p>
                                            <p>$124</p>
                                        </div>
                                        <div className='mt-4'>
                                            <button
                                            onClick={()=> navigate("/checkout")}
                                             className='col-12 btn bg-black rounded-pill py-2 text-white'>Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h3 className='my-4'>SIMILAR COURSE</h3>
                    {getAllCourses.data && (
                            <CourseCarousel>
                                {listUsers}
                            </CourseCarousel>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carts