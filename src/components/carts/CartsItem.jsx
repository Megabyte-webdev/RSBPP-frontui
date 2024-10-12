import { useContext, useState } from 'react'
import img from "../../assets/feature-courses.png"
import { BASE_URL } from '../utils/base'
// import axios from 'axios'
import { UserContext } from '../../context/AuthContext'
import { ResourceContext } from '../../context/ResourceContext'
import { Spinner } from 'react-bootstrap'
// import toast from 'react-hot-toast'
// import { CgMathMinus, CgTimelapse } from "react-icons/cg";
// import { IoMdAdd } from 'react-icons/io';

const CartsItem = ({ on, cart }) => {
    const { userCredentials } = useContext(UserContext)
    const { setGetAllCarts } = useContext(ResourceContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    // const deleteFunc = (() => {
    //     setIsSubmitting(true)
    //     //update fleet resource to false
    //     setGetAllCarts((prev) => {
    //         return {
    //             ...prev, isDataNeeded: false
    //         }
    //     })
    //     axios.post(`${BASE_URL}cart/removeCart/${cart.cartsId}`, {
    //         headers: {
    //             'Authorization': `Bearer ${userCredentials.token}`
    //         }
    //     })
    //         .then(response => {
    //             console.log(response)
    //             //update fleet resource to true again to get new list after successful delet only
    //             setGetAllCarts((prev) => {
    //                 return {
    //                     ...prev, isDataNeeded: true
    //                 }
    //             })
    //             setIsSubmitting(false)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             if (error.response) {
    //               setErrorMessage(error.response.data.message);
    //               toast(error.response.data.message)
    //             setIsSubmitting(false)
    //             } else {
    //                 toast(error.message)
    //               setErrorMessage(error.message);
    //             setIsSubmitting(false)
    //             }
    //         })
    // })
    const deleteFunc = async () => {
        setGetAllCarts((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${userCredentials.token}`
            },
        }
        try {
            setLoading(true)
            const response = await fetch(`${BASE_URL}cart/removeCart/${cart.cartsId}`, params);
            if (response.ok) {
                await response.json();
                // console.log(response)
                setGetAllCarts((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                setLoading(false)

            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            if (error.response) {
                setErrorMessage(error.response.data.message);
                console.log(error.response);
            } else {
                setErrorMessage(error.message);
                console.log(error.message);
            }
        }
    }

    return (
        <div className="border-bottom py-3">
            <div className="form-check col d-flex align-items-center">
                <input className="form-check-input red_radio" type="radio" name="paymentMethod" value="" id={`paymentId${cart.id}`} />
                <label className="form-check-label w-100 ms-3" htmlFor={`paymentId${cart.id}`}>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='col-md-2 col-3'>
                            <img src={img} alt="" className="img-fluid" />
                        </div>
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            <div className="mx-2">
                                <p className="ash_text fw-semibold fs_sm">{cart?.title}</p>
                                <p className="fw-bolder ">{cart?.description}</p>
                                <p className="fw-bolder ">{cart?.price}</p>
                            </div>

                        </div>
                        {on && (
                            <div>
                                <button disabled={isSubmitting}
                                    onClick={() => deleteFunc()}
                                    className='btn bg-danger text-light rounded-4'><span>Remove</span>{loading && (<span className='ms-2'><Spinner size='sm' /></span>)}</button>
                            </div>
                        )}
                        {/* {on &&(
                    <div className="d-flex">
                        <button onClick={reduceItemfunc}>
                            <CgMathMinus />
                        </button>
                        <span className='mx-2'>{addItem}</span>
                        <button onClick={addItemfunc}>
                            <IoMdAdd />
                        </button>
                    </div>
                    )} */}
                    </div>
                </label>
            </div>
        </div>
    )
}

export default CartsItem