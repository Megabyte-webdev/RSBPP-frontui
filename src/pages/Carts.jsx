import { useContext, useEffect, useState } from 'react';
import NavBar from '../components/layout/NavBar';
import CartsItem from '../components/carts/CartsItem';
import { ResourceContext } from '../context/ResourceContext';
import LearningCourse from '../components/Learning/LearningCourse';
import CourseCarousel from '../components/general/CourseCarousel';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import { cartsTotalFunction } from '../components/utils/getApi';
// import StripeElement from '../components/stripe/StripeElement';
// import Payment from "../components/stripe/clone/Payment";
import Nav from '../components/onlineprograms/Nav';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../components/utils/base';
import toast from 'react-hot-toast';

const Carts = () => {
    const navigate = useNavigate();
    const { userCredentials } = useContext(UserContext);

    const comingFrom = localStorage.getItem("comingFrom") ? JSON.parse(localStorage.getItem("comingFrom")) : null;

    if (comingFrom !== null) {
        localStorage.removeItem("comingFrom");
        console.log(comingFrom);
    }

    const {
        fromLocal,
        setFromLocal,
        getAllCourses,
        setGetAllCourses,
        getAllCarts,
        setGetAllCarts,
    } = useContext(ResourceContext);

    const [error, setError] = useState('');
    const [currentTotal, setCurrentTotal] = useState('');
    const on = true;
    const token = userCredentials?.token || TOKEN;
    const user = userCredentials?.user;

    useEffect(() => {
        // Load initial cart state from local storage
        const carts = localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts"))[0] : null;
        setFromLocal(carts);
    }, []);

    const deleteFunc = async (cart, setIsSubmitting) => {
        setIsSubmitting(true);
        if (userCredentials) {
            // User is logged in; perform API request to remove from server
            setGetAllCarts((prev) => ({
                ...prev,
                isDataNeeded: false,
            }));
    
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${userCredentials.token}`,
                },
            };
            try {
                const response = await fetch(`${BASE_URL}cart/removeCart/${cart.cartsId}`, params);
                if (response.ok) {
                    await response.json();
                    setGetAllCarts((prev) => ({
                        ...prev,
                        isDataNeeded: true,
                    }));
                }
            } catch (error) {
                console.error(error);
                setError(error?.response?.data?.message || error?.message || error);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // User is a guest; remove from local storage
            try {
                setIsSubmitting(true);
                console.log(cart)
                console.log("delete from storage");
                const newCartData = fromLocal.data.filter((item) => item.id !== cart.id);
                
                // Update the local storage
                if (newCartData.length > 0) {
                    localStorage.setItem("carts", JSON.stringify([{ user: "guest", data: newCartData }]));
                } else {
                    localStorage.removeItem("carts");
                }
    
                // Update state to reflect the removal
                setFromLocal({ user: "guest", data: newCartData });
            } catch (error) {
                console.error(error);
                setError(error?.response?.data?.message || error?.message || error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };


    useEffect(() => {
        if (fromLocal?.user === "guest" && userCredentials !== null) {
            fromLocal?.data.forEach((course) => {
                const addToCart = (details) => {
                    axios.post(`${BASE_URL}cart/addCart`, details, {
                        headers: {
                            'Authorization': `Bearer ${userCredentials.token}`,
                        },
                    })
                    .then(response => {
                        console.log(response);
                        toast.success(response.data.message);
                        setGetAllCarts((prev) => {
                            return {
                                ...prev, isDataNeeded: true
                            }
                        });
                        localStorage.removeItem('carts');
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
            });
        }
        if (userCredentials !== null) {
            setGetAllCarts((prev) => {
                return {
                    ...prev, isDataNeeded: true
                }
            });
        }

    }, []);

    useEffect(() => {
        if (userCredentials) {
            cartsTotalFunction(token, user?.id, setError, setCurrentTotal);
        }
    }, [getAllCarts]);

    // useEffect(() => {
    //         setGetAllCourses((prev) => {
    //             return {
    //                 ...prev, isDataNeeded: true
    //             }
    //         });
    //     console.log(getAllCourses)
    // }, []);

    useEffect(() => {
        if (userCredentials) {
            setGetAllCarts((prev) => {
                return {
                    ...prev, isDataNeeded: true
                }
            });
        }
    }, []);

// Define cart list based on user state
    const cartList = userCredentials === null ? 
        fromLocal?.data.map((cart) => (
            <CartsItem key={cart.cartsId} cart={cart} on={on} deleteFunc={deleteFunc} />
        )) : 
        getAllCarts?.data?.map((cart) => (
            <CartsItem key={cart.cartsId} cart={cart} on={on} deleteFunc={deleteFunc} />
        ));


    // const listUsers = getAllCourses.data?.map((course) => {
    //     return (
    //         <LearningCourse key={course.id} userCredentials={userCredentials && userCredentials} cartList={ getAllCarts?.data || fromLocal?.data} course={course} />
    //     )
    // });

    return (
        <div style={{ backgroundColor: "hsla(0, 0%, 95%, 1)" }}>
            {userCredentials !== null ? <NavBar /> : <Nav />}
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
                                            <p>Showing {userCredentials !== null ? getAllCarts.data?.length : fromLocal.data?.length} products you added</p>
                                        </div>
                                        {cartList}
                                        {error}
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
                                                <div className="d-flex mb-3 text-black fw-bold justify-between">
                                                    <p>Total Price</p>
                                                    <p>${userCredentials !== null ? currentTotal : (fromLocal.data?.reduce((acc, cart) => parseInt(acc) + parseInt(cart.price), 0))}</p>

                                                </div>
                                                <div className='mt-4'>
                                                    {
                                                        userCredentials
                                                            ? <button onClick={() => navigate('/checkout', { state: { cartCourses: getAllCarts?.data, currentTotal: currentTotal } })} className='col-12 btn bg-black rounded-full py-2 text-white'>Checkout</button>
                                                            : <button onClick={() => { navigate('/registration'); localStorage.setItem("comingFrom", JSON.stringify({ user: "guest" })) }} className='col-12 btn bg-black rounded-full py-2 text-white'>Checkout</button>
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
                            {/* {getAllCourses.data && (
                                <CourseCarousel>
                                    {listUsers}
                                </CourseCarousel>
                            )} */}
                            <div className='flex flex-wrap gap-5'>
                                {/* left */}
                                <div className='bg-gray-300 flex flex-col gap-y-2 w-[300px] min-h-[200px] border border-gray-600'>
                                    <p className='bg-red-900 text-white text-xl flex items-center justify-center p-2'>Online programmes</p>
                                    <p className='p-2 text-sm'>Check out our online programmes and enjoy your moment.</p>
                                    <button className='w-[80%] mx-auto mt-auto p-3 bg-gray-800 font-semibold text-white text-sm'>Click View Courses</button>
                                </div>
                                {/* right */}
                                <div className='bg-gray-300 flex flex-col gap-y-2 w-[300px] min-h-[200px] border border-gray-600'>
                                    <p className='bg-red-900 text-white text-xl flex items-center justify-center p-2'>DigiKnowH</p>
                                    <p className='p-2 text-sm'>Check out our online programmes and enjoy your moment.</p>
                                    <button className='w-[80%] mx-auto mt-auto p-3 bg-gray-800 font-semibold text-white text-sm'>Click View Courses</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Carts;
