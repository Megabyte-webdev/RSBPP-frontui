import { useContext, useEffect, useState } from 'react'
import NavBar from '../components/layout/NavBar'
import CartsItem from '../components/carts/CartsItem';
import { ResourceContext } from '../context/ResourceContext';
import LearningCourse from '../components/Learning/LearningCourse';
import CourseCarousel from '../components/general/CourseCarousel';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import { cartsTotalFunction } from '../components/utils/getApi';
import StripeElement from '../components/stripe/StripeElement';
import Payment from "../components/stripe/clone/Payment";
import Nav from '../components/onlineprograms/Nav';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../components/utils/base';
import toast from 'react-hot-toast';


const Carts = () => {
    const navigate = useNavigate();
    const { userCredentials } = useContext(UserContext);

    const [fromLocal, setFromLocal] = useState((localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts"))[0] : null));
    const [comingFrom, setComingFrom] = useState(localStorage.getItem("comingFrom") ? localStorage.getItem("comingFrom") : null)

    if (comingFrom !== null) {
        localStorage.removeItem("comingFrom");
    }
    // console.log(comingFrom)    

    const {
        errorMesage,
        getAllCourses,
        setGetAllCourses,
        getAllCarts,
        setGetAllCarts,
    } = useContext(ResourceContext)

    const [error, setError] = useState('');

    const [currentTotal, setCurrentTotal] = useState('');

    const on = true
    const token = userCredentials?.token || TOKEN;
    const user = userCredentials?.user;
    useEffect(() => {
        setFromLocal(localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts"))[0] : null)
    }, [window.localStorage])
    useEffect(() => {
        if (fromLocal && fromLocal.user === "guest" && userCredentials !== null) {
            fromLocal.data.forEach((course) => {
                const addToCart = (details) => {

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
                            localStorage.removeItem('carts')
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };

                let details = {
                    user_id: userCredentials?.user.id,
                    course_id: course.id
                }
                addToCart(details);
            })
        }
        if (userCredentials !== null) {
            setGetAllCarts((prev) => {
                return {
                    ...prev, isDataNeeded: true
                }
            })
        }

    }, [])

    useEffect(() => {
        if (userCredentials) {
            cartsTotalFunction(token, user?.id, setError, setCurrentTotal)
        }
    }, [getAllCarts])

    useEffect(() => {
        if (userCredentials) {
            setGetAllCourses((prev) => {
                return {
                    ...prev, isDataNeeded: true
                }
            })
        }
    }, [])

    useEffect(() => {
        if (userCredentials) {
            setGetAllCarts((prev) => {
                return {
                    ...prev, isDataNeeded: true
                }
            })
        }
    }, [])
    const cartList = userCredentials === null ? fromLocal?.data.map((cart) => {
        return (
            <CartsItem key={cart.cartsId} cart={cart} on={on} />
        )
    }) : getAllCarts?.data?.map((cart) => {
        return (
            <CartsItem key={cart.cartsId} cart={cart} on={on} />
        )
    });

    const listUsers = getAllCourses.data?.map((course) => {
        return (
            <LearningCourse key={course.id} cartList={userCredentials === null ? fromLocal : getAllCarts.data} course={course} />
        )
    })
    return (
        <div style={{ backgroundColor: "hsla(0, 0%, 95%, 1)" }}>
            {((comingFrom && comingFrom === null) || userCredentials !== null) ? (<NavBar />) : (<Nav />)}
            <div className="brown_bg p-3 p-md-5 text-white">
                <div className="d-flex justify-center align-items-center">
                </div>
                <div className="text-center ">
                    <h2 className="my-5">
                        Registered Courses
                    </h2>
                </div>
            </div>

            {
                <div className="mt-5 border-top pb-5">
                    <div className="container">
                        {(fromLocal?.data.length > 0 || getAllCarts?.data?.length > 0) ? (
                            <div className="row py-4 mb-5">
                                <div className="col-md-8">
                                    <div>
                                        <div className="border-bottom pb-3">
                                            <h5>Shopping Cart</h5>
                                            <p>Showing {getAllCarts.data?.length || fromLocal.data?.length} products you added</p>
                                        </div>
                                        {cartList}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <div className="border border-black p-4">
                                            <h4>Order Summary</h4>
                                            <div>
                                                {userCredentials
                                                    ?
                                                    getAllCarts.data?.map((cart) => (
                                                        <div key={cart.cartsId} className="d-flex mb-3 justify-between">
                                                            <p>{cart.title}:</p>
                                                            <p>${cart.price}</p>
                                                        </div>
                                                    ))
                                                    : fromLocal.data?.map((cart) => (
                                                        <div key={cart.cartsId} className="d-flex mb-3 justify-between">
                                                            <p>{cart.title}:</p>
                                                            <p>${cart.price}</p>
                                                        </div>
                                                    ))}

                                            </div>
                                            <div className="border-top py-3 ash_text">
                                                {/* <div className="d-flex mb-3 justify-between">
                                            <p>Total Price (item)</p>
                                            <p>{currentTotal}</p>
                                        </div>
                                        <div className="d-flex mb-3 justify-between">
                                            <p>Shipping Tax & Fee</p>
                                            <p>$24</p>
                                        </div> */}
                                                <div className="d-flex mb-3 text-black fw-bold justify-between">
                                                    <p>Total Price</p>
                                                    <p>${userCredentials ? currentTotal : (fromLocal.data?.reduce((acc, cart) => acc + parseInt(cart.price), 0))}</p>

                                                </div>
                                                <div className='mt-4'>
                                                    {
                                                        userCredentials
                                                            ? <button onClick={() => navigate('/checkout' , { state: { cartCourses: getAllCarts?.data, currentTotal: currentTotal } })} className='col-12 btn bg-black rounded-full py-2 text-white'>Checkout</button>
                                                            : <button onClick={() => (navigate('/registration'))} className='col-12 btn bg-black rounded-full py-2 text-white'>Checkout</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className='fs-4 fw-bold text-center py-5'>Cart is empty</p>
                        )}
                        {/* <StripeElement
                            token={token}
                            user={user}
                        /> */}
                        {/* <Payment /> */}
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
            }
        </div>
    )
}

export default Carts