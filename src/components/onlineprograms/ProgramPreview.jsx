/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/AuthContext'; // Import the context
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import './program.css';
import { BASE_URL } from '../utils/base';
import { Spinner } from 'react-bootstrap';
import { ResourceContext } from '../../context/ResourceContext';

const ProgramPreview = ({ details }) => {
    const navigate = useNavigate();
    const { userCredentials } = useContext(UserContext); // Get user credentials from context
    const [loading, setLoading] = useState(false); // Loading state
    const fromLocal = localStorage.getItem("carts")
        ? JSON.parse(localStorage.getItem("carts"))[0]
        : null;

    const { setGetAllCarts, setCartStore, getAllCarts } = useContext(ResourceContext);

    async function HandleAddToCart() {
        setLoading(true); // Start loading

        if (userCredentials) {
            console.log("User adding to cart");
            let item = {
                user_id: userCredentials?.user.id,
                course_id: details.id
            };
            try {
                const response = await axios.post(`${BASE_URL}cart/addCart`, item, {
                    headers: {
                        'Authorization': `Bearer ${userCredentials?.token}`,
                    },
                });

                if (response) {
                    console.log('Cart response:', response); // Debugging API response
                    setGetAllCarts((prev) => ({
                        ...prev,
                        isDataNeeded: true,
                    }));
                    console.log(getAllCarts)
                    toast.success(response?.data?.message || 'Course added to cart');
                    navigate('/carts'); // Navigate to carts page
                }
            } catch (error) {
                console.error('Error adding to cart:', error); // Log errors
                toast.error(error?.response
                    ? JSON.stringify(error?.response.data?.message)
                    : 'An error occurred'
                );
            } finally {
                setLoading(false); // Stop loading
            }
        } else {
            console.log("User not signed in, adding to local storage"); // Debugging guest cart addition

            if (
                fromLocal === null ||
                (fromLocal && !fromLocal.data.find((item) => item.title === details.title))
            ) {
                const updatedCart = fromLocal
                    ? { user: "guest", data: [...fromLocal.data, details] }
                    : { user: "guest", data: [details] };

                localStorage.setItem("carts", JSON.stringify([updatedCart]));
                setCartStore({ data: [details] });

                scrollTo(0, 0); // Scroll to top
                navigate('/carts'); // Navigate to carts page
                toast.success('Course added to cart successfully');
            } else {
                toast.error('Course already exists in cart');
            }
            setLoading(false); // Stop loading
        }
    }

    return (
        <div className='font-[Ripple-Bold] font-bold flex flex-col md:flex-row md:justify-between gap-4 p-[4%] lg:px-[5%] my-5'>
            {/* Left side */}
            <div className='flex-1 w-full md:w-3/4'>
                <p className='text-sm text-[#888] mb-3 font-medium'>{details?.description}</p>
                <div
                    className='course-objective fs_sm'
                    dangerouslySetInnerHTML={{ __html: details?.objective }}
                ></div>
                <div
                    className='course-outline'
                    dangerouslySetInnerHTML={{ __html: details?.outlines }}
                ></div>
            </div>
            {/* Right side */}
            <div className='w-full md:w-1/3 flex flex-col items-end'>
                <p
                    className={`w-full md:w-[90%] text-sm text-black border border-gray-700 px-3 py-4 underline cursor-pointer ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={loading ? null : HandleAddToCart}
                >
                    {loading ? (
                        <span>Adding to cart <Spinner animation="border" size="sm" className='ml-2' /></span>
                    ) : (
                        <span>Add To Cart</span>
                    )}
                </p>
                <p className='w-full md:w-[90%] text-sm text-black border border-gray-700 px-3 py-4'>
                    ${details?.price}
                </p>
            </div>
        </div>
    );
};

export default ProgramPreview;
