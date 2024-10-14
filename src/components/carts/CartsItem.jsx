/* eslint-disable react/prop-types */
import { useState } from 'react'
import img from "../../assets/feature-courses.png"
import { Spinner } from 'react-bootstrap'
// import toast from 'react-hot-toast'
// import { CgMathMinus, CgTimelapse } from "react-icons/cg";
// import { IoMdAdd } from 'react-icons/io';

const CartsItem = ({ on, cart, deleteFunc }) => {
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    return (
        <div className="border-bottom py-3">
            <div className="form-check col d-flex align-items-center">
                <input className="form-check-input red_radio" type="radio" name="paymentMethod" value="" id={`paymentId${cart.id}`} />
                <label className="form-check-label w-100 ms-3" htmlFor={`paymentId${cart.id}`}>
                    <div className='flex flex-col md:flex-row md:items-center justify-between'>
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
                                    onClick={() => deleteFunc(cart, setIsSubmitting)}
                                    className='btn bg-danger text-light rounded-4'><span>Remove</span>{isSubmitting && (<span className='ms-2'><Spinner size='sm' /></span>)}</button>
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