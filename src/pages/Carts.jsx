import { useContext, useEffect, useState } from 'react';
import NavBar from '../components/layout/NavBar';
import CartsItem from '../components/carts/CartsItem';
import { ResourceContext } from '../context/ResourceContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import { cartsTotalFunction } from '../components/utils/getApi';
import Nav from '../components/onlineprograms/Nav';
// import axios from 'axios';
import { BASE_URL } from '../components/utils/base';
// import toast from 'react-hot-toast';

const Carts = () => {
    const navigate = useNavigate();
    const { userCredentials } = useContext(UserContext);
    const {
        cartStore,
        setCartStore,
        getAllCarts,
        setGetAllCarts
    } = useContext(ResourceContext);

    const [error, setError] = useState('');
    const [currentTotal, setCurrentTotal] = useState('');
    const token = userCredentials?.token;
    // const carts = JSON.parse(localStorage.getItem("carts") && localStorage.getItem("carts")) || null;

    const deleteFromCart = async (cart, setIsSubmitting) => {
        setIsSubmitting(true);

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            if (userCredentials) {
                setGetAllCarts((prev) => ({ ...prev, isDataNeeded: false }));
                const response = await fetch(`${BASE_URL}cart/removeCart/${cart.cartsId}`, params);

                if (response.ok) {
                    await response.json();
                    setGetAllCarts((prev) => ({ ...prev, isDataNeeded: true }));
                }
            } else {
                const updatedCartData = cartStore.data.filter((item) => item.id !== cart.id);
                if (updatedCartData.length > 0) {
                    localStorage.setItem("carts", JSON.stringify([{ user: "guest", data: updatedCartData }]));
                    setCartStore({ user: "guest", data: updatedCartData });
                } else {
                    localStorage.removeItem("carts");
                    setCartStore({ user: "guest", data: [] });
                }
            }
        } catch (error) {
            console.error(error);
            setError(error?.response?.data?.message || error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // const addToCart = async (details) => {
    //     try {
    //         const response = await axios.post(`${BASE_URL}cart/addCart`, details, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });
    //         toast.success(response.data.message);
    //         setGetAllCarts((prev) => ({ ...prev, isDataNeeded: true }));
    //     } catch (error) {
    //         console.error(error);
    //         toast.error(error?.response?.data?.message || error.message);
    //     }
    // };

    useEffect(() => {
        if (userCredentials) {
            cartsTotalFunction(token, userCredentials.user.id, setError, setCurrentTotal, (newCart) => {
                setCartStore(newCart);
            });
        }
    }, [getAllCarts]);

    useEffect(() => {
        if (userCredentials === null) {
            const localCarts = JSON.parse(localStorage.getItem("carts")) || [];
            setCartStore({ user: "guest", data: localCarts[0]?.data || [] });
        }
    }, [userCredentials]);

    const cartList = cartStore?.data?.length > 0 ? (
        cartStore.data.map((cart) => (
            <CartsItem key={cart.cartsId} cart={cart} on={true} deleteFunc={deleteFromCart} />
        ))
    ) : (
        <p className="text-center">No items in your cart.</p>
    );

    return (
        <div className="carts-container">
            {userCredentials ? <NavBar /> : <Nav />}
            <div className="brown_bg p-3 p-md-5 text-white">
                <h2 className="my-5 text-center">Registered Courses</h2>
            </div>

            <div className="mt-5 border-top pb-5">
                <div className="container">
                    {cartStore?.data?.length > 0 ? (
                        <div className="row py-4 mb-5">
                            <div className="col-md-8">
                                <div className="border-bottom pb-3">
                                    <h5>Shopping Cart</h5>
                                    <p>Showing {cartStore.data.length} products you added</p>
                                </div>
                                {cartList}
                                {error && <div className="error-message">{error}</div>}
                            </div>
                            <div className="col-md-4">
                                <div className="border border-black p-4">
                                    <h4>Order Summary</h4>
                                    <div>
                                        {cartStore.data.map((cart) => (
                                            <div key={cart.cartsId} className="d-flex mb-3 justify-between">
                                                <p>{cart.title}:</p>
                                                <p>${cart.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-top py-3 ash_text">
                                        <div className="d-flex mb-3 text-black fw-bold justify-between">
                                            <p>Total Price</p>
                                            <p>
                                                ${userCredentials ? currentTotal :
                                                    cartStore.data.reduce((acc, cart) => acc + parseFloat(cart.price), 0)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>userCredentials ?navigate('/checkout', {state: { cartCourses: cartStore?.data, currentTotal }}) : navigate('/registration') }
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
                    <div className="row">
                        <h3 className='my-4'>SIMILAR COURSE</h3>
                        <div className='flex flex-wrap gap-5 m-2'>
                            {/* Online programmes */}
                            <div className='bg-gray-100 flex flex-col gap-y-2 w-[300px] min-h-[200px] border border-gray-600 pb-2'>
                                <p className='bg-red-900 text-white text-xl flex items-center justify-center p-4'>Online programmes</p>
                                <p className='p-2 text-sm'>Engage with forward-thinking community and access our flexible online education from anywhere in the world.</p>
                                <button onClick={() => { navigate('/online-programmes'); scrollTo(0, 0) }} className='w-max mx-2 mb-2 mt-auto py-2 px-3 bg-gray-800 rounded-md font-semibold text-white text-sm'>View Courses</button>
                            </div>
                            {/* DigiKnowH */}
                            <div className='bg-gray-100 flex flex-col gap-y-2 w-[300px] min-h-[200px] border border-gray-600 pb-2'>
                                <p className='bg-red-900 text-white text-xl flex items-center justify-center p-4'>DigiKnowH</p>
                                <p className='p-2 text-sm'>The Digital Skills Learning programme is tailored for people who are curious and open to learning about digital technologies, tools, and practices.</p>
                                <button onClick={() => { navigate('/digiknowh'); scrollTo(0, 0) }} className='w-max mx-2 mb-2 mt-auto py-2 px-3 bg-gray-800 rounded-md font-semibold text-white text-sm'>View Courses</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carts;
