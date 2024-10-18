import { useContext, useEffect, useState } from 'react';
import NavBar from '../components/layout/NavBar';
import CartsItem from '../components/carts/CartsItem';
import { ResourceContext } from '../context/ResourceContext';
import LearningCourse from '../components/Learning/LearningCourse';
import CourseCarousel from '../components/general/CourseCarousel';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import { cartsTotalFunction } from '../components/utils/getApi';
import Nav from '../components/onlineprograms/Nav';
import axios from 'axios';
import { BASE_URL } from '../components/utils/base';
import toast from 'react-hot-toast';

const Carts = () => {
    const navigate = useNavigate();
    const { userCredentials } = useContext(UserContext);

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
        const carts = localStorage.getItem("carts") 
            ? JSON.parse(localStorage.getItem("carts"))[0] 
            : null;
        setFromLocal(carts);
    }, []);

    const deleteFunc = async (cart, setIsSubmitting) => {
        setIsSubmitting(true);
        try {
            if (userCredentials) {
                await axios.post(`${BASE_URL}cart/removeCart/${cart.cartsId}`, {}, {
                    headers: { Authorization: `Bearer ${userCredentials.token}` },
                });
                setGetAllCarts((prev) => ({ ...prev, isDataNeeded: true }));
            } else {
                const newCartData = fromLocal.data.filter((item) => item.id !== cart.id);
                if (newCartData.length > 0) {
                    localStorage.setItem("carts", JSON.stringify([{ user: "guest", data: newCartData }]));
                } else {
                    localStorage.removeItem("carts");
                }
                setFromLocal({ user: "guest", data: newCartData });
            }
        } catch (error) {
            console.error(error);
            setError(error.message || 'Error deleting item');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (fromLocal?.user === "guest" && userCredentials) {
            const addToCart = async (course) => {
                try {
                    const details = {
                        user_id: userCredentials?.user.id,
                        course_id: course.id,
                    };
                    const response = await axios.post(`${BASE_URL}cart/addCart`, details, {
                        headers: { Authorization: `Bearer ${userCredentials.token}` },
                    });

                    toast.success(response.data.message);
                    setGetAllCarts((prev) => ({
                        ...prev,
                        data: [...(prev.data || []), response.data.cart],
                        isDataNeeded: true,
                    }));
                } catch (error) {
                    console.error('Error adding to cart:', error);
                }
            };

            fromLocal?.data.forEach(addToCart);
            localStorage.removeItem('carts');
            setFromLocal(null);
        }

        if (userCredentials) {
            setGetAllCarts((prev) => ({ ...prev, isDataNeeded: true }));
        }
    }, [userCredentials]);

    useEffect(() => {
        if (userCredentials) {
            cartsTotalFunction(token, user?.id, setError, setCurrentTotal);
        }
    }, [getAllCarts]);

    const cartList = userCredentials === null 
        ? fromLocal?.data.map((cart) => (
            <CartsItem key={cart.cartsId} cart={cart} on={on} deleteFunc={deleteFunc} />
        )) 
        : getAllCarts?.data?.map((cart) => (
            <CartsItem key={cart.cartsId} cart={cart} on={on} deleteFunc={deleteFunc} />
        ));

    return (
        <div style={{ backgroundColor: "hsla(0, 0%, 95%, 1)" }}>
            {userCredentials ? <NavBar /> : <Nav />}
            <div className="brown_bg p-3 p-md-5 text-white">
                <div className="text-center">
                    <h2 className="my-5">Registered Courses</h2>
                </div>
            </div>

            <div className="mt-5 border-top pb-5">
                <div className="container">
                    {(fromLocal?.data?.length > 0 || getAllCarts?.data?.length > 0) ? (
                        <div className="row py-4 mb-5">
                            <div className="col-md-8">
                                <div className="border-bottom pb-3">
                                    <h5>Shopping Cart</h5>
                                    <p>Showing {userCredentials ? getAllCarts.data?.length : fromLocal.data?.length} products</p>
                                </div>
                                {cartList}
                                {error && <p className="text-danger">{error}</p>}
                            </div>

                            <div className="col-md-4">
                                <div className="border border-black p-4">
                                    <h4>Order Summary</h4>
                                    {userCredentials ? getAllCarts.data?.map((cart) => (
                                        <div key={cart.cartsId} className="d-flex mb-3 justify-between">
                                            <p>{cart.title}:</p>
                                            <p>${cart.price}</p>
                                        </div>
                                    )) : fromLocal.data?.map((cart) => (
                                        <div key={cart.cartsId} className="d-flex mb-3 justify-between">
                                            <p>{cart.title}:</p>
                                            <p>${cart.price}</p>
                                        </div>
                                    ))}

                                    <div className="border-top py-3">
                                        <div className="d-flex mb-3 text-black fw-bold justify-between">
                                            <p>Total Price</p>
                                            <p>${userCredentials ? currentTotal : fromLocal.data?.reduce((acc, cart) => acc + parseInt(cart.price), 0)}</p>
                                        </div>

                                        <button 
                                            onClick={() => navigate('/checkout', { state: { cartCourses: getAllCarts?.data, currentTotal } })} 
                                            className="col-12 btn bg-black rounded-full py-2 text-white"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="fs-4 fw-bold text-center py-5">Cart is empty</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Carts;
