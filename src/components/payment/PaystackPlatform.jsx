import React, { useContext, useState } from 'react'
import { PaystackButton, usePaystackPayment } from 'react-paystack';
import { BASE_URL } from '../utils/base';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ResourceContext } from '../../context/ResourceContext';
import { useNavigate } from 'react-router-dom';

const PaystackPlatform = ({ accept, userCredentials, allDetails }) => {
    const { setGetAllCourses, setGetAllCarts, setGetEnrolledCourses } = useContext(ResourceContext);
    const navigate = useNavigate();
    // const courseIds = cartCourses?.map(({ courseId }) => courseId);

    // console.log(cartCourses[0].courseId)
    // const [details, setDetails] = useState({
    //     reference: "",
    //     course_id: cartCourses[0].courseId,
    //     student_id: userCredentials.user.id
    // })
    const config = {
        reference: (new Date()).getTime().toString(),
        email: "climaxbiz@mail.com",
        amount: `${allDetails?.currentTotal}00`, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_7ce279d181176a0c0af488855daf72c19ca5ff8e',
    };
    // console.log(cartCourses)

    const handlePayment = (info) => {

        setGetAllCourses((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        setGetEnrolledCourses((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        setGetAllCarts((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        const details = {
            reference: info.reference,
            // course_id: allDetails?.cartCourses[0].courseId,
            student_id: userCredentials.user.id
        }
        console.log(details)
        axios.post(`${BASE_URL}payment/pay`, details, {
            headers: {
                Authorization: `Bearer ${userCredentials?.token}`,
            },
        })
            .then((response) => {
                console.log(response)
                setGetAllCourses((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                setGetAllCarts((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                setGetEnrolledCourses((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                navigate('/success', { state: { allDetails: allDetails, info: info } })
                toast.success("successful payment");
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    // setErrorMsg(error.response.data.message)
                } else {
                    console.log(error.message)
                    // setErrorMsg(error.message)
                }
                setGetEnrolledCourses((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
            });
    }

    // you can call this function anything
    const handlePaystackSuccessAction = (info) => {
        // Implementation for whatever you want to do with reference and after success call.
        handlePayment(info)
        console.log(info)
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const componentProps = {
        ...config,
        text: accept ? "Pay for Booking" : "Agree to proceed",
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

    return (
        <div>
            {accept ? (
                <PaystackButton disabled={!accept} className='btn brown_bg mt-4 text-white w-100' {...componentProps} />
            ) : (
                <button
                    disabled={true}
                    className='btn brown_bg mt-4 text-white w-100'
                > Agree to proceed</button>
            )}
            {/* <button
                 disabled={!accept}
                 className='btn brown_bg mt-4 text-white w-100'
                //  onClick={() => {
                //      initializePayment(onSuccess, onClose)
                 }}>{accept ? "Pay for Booking" : "Agree to proceed"}</button> */}
        </div>
    )
}

export default PaystackPlatform