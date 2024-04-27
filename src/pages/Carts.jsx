import { useContext, useEffect, useState } from 'react'
import NavBar from '../components/layout/NavBar'
import CartsItem from '../components/carts/CartsItem';
import { ResourceContext } from '../context/ResourceContext';
import LearningCourse from '../components/Learning/LearningCourse';
import CourseCarousel from '../components/general/CourseCarousel';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import { cartsTotalFunction } from '../components/utils/getApi';

const Carts = () => {
    const navigate = useNavigate();
    const { userCredentials } = useContext(UserContext);

    const {
        getAllCourses,
        setGetAllCourses,
        getAllCarts,
        setGetAllCarts,
    } = useContext(ResourceContext)

    const [errorMesage, setErrorMessage] = useState('');

    const [currentTotal, setCurrentTotal] = useState('');

    const on = true
    const token = userCredentials.token;

    useEffect(() => {
        cartsTotalFunction(token, setErrorMessage, setCurrentTotal)
    }, [])

    useEffect(() => {
        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    useEffect(() => {
        setGetAllCarts((prev) => {
            return {
                ...prev, isDataNeeded: true
            }
        })
    }, [])

    const cartList = getAllCarts.data?.map((cart) => {
        return (
            <CartsItem key={cart.id} cart={cart} on={on} />
        )
    })

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
            {!getAllCarts.data && (
                <div style={{ height: "80vh", padding: "3rem"}}> Loading data......</div>
            )}
            {getAllCarts.data && (
                <div className="mt-5 border-top pb-5">
                    <div className="container">
                        <div className="row py-4 mb-5">
                            <div className="col-md-8">
                                <div className="">
                                    <div className="border-bottom pb-3">
                                        <h5>Shopping Chart</h5>
                                        <p>Showing {getAllCarts.data?.length} products you added</p>
                                    </div>
                                    {cartList}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <div className="border border-black p-4">
                                        <h4>Order Summary</h4>
                                        <div>
                                            {getAllCarts.data?.map((cart) => (
                                                <div key={cart.id} className="d-flex mb-3 justify-content-between">
                                                    <p>{cart.code}</p>
                                                    <p>{cart.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-top py-3 ash_text">
                                            {/* <div className="d-flex mb-3 justify-content-between">
                                            <p>Total Price (item)</p>
                                            <p>{currentTotal}</p>
                                        </div>
                                        <div className="d-flex mb-3 justify-content-between">
                                            <p>Shipping Tax & Fee</p>
                                            <p>$24</p>
                                        </div> */}
                                            <div className="d-flex mb-3 text-black fw-bold justify-content-between">
                                                <p>Total Price</p>
                                                <p>{currentTotal}</p>

                                            </div>
                                            <div className='mt-4'>
                                                <button
                                                    onClick={() => navigate("/checkout")}
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
            )}
        </div>
    )
}

export default Carts