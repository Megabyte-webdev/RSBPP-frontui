import { useContext, useState } from 'react'
import img from "../../assets/feature-courses.png"
import { BASE_URL } from '../utils/base'
import axios from 'axios'
import { UserContext } from '../../context/AuthContext'
import { ResourceContext } from '../../context/ResourceContext'
// import { CgMathMinus, CgTimelapse } from "react-icons/cg";
// import { IoMdAdd } from 'react-icons/io';

const CartsItem = ({ on, cart }) => {
    const { userCredentials } = useContext(UserContext)
    const { setGetAllCarts } = useContext(ResourceContext)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const deleteFleet = (() => {
        setIsSubmitting(true)
        //update fleet resource to false
        setGetAllCarts((prev) => {
            return {
                ...prev, isDataNeeded: false
            }
        })
        axios.delete(`${BASE_URL}cart/removeCart/${cart.id}`, {
            headers: {
                'Authorization': `Bearer ${userCredentials.token}`
            }
        })
            .then(response => {
                console.log(response)
                //update fleet resource to true again to get new list after successful delet only
                setGetAllCarts((prev) => {
                    return {
                        ...prev, isDataNeeded: true
                    }
                })
                setIsSubmitting(false)
            })
            .catch(error => console.log(error))
        setIsSubmitting(false)
    })
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
                                    onClick={() => deleteFleet()}
                                    className='btn bg-danger text-light rounded-4'>Remove</button>
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