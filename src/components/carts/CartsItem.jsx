import { useState } from 'react'
import img from "../../assets/feature-courses.png"
// import { CgMathMinus, CgTimelapse } from "react-icons/cg";
// import { IoMdAdd } from 'react-icons/io';

const CartsItem = ({ on, cart }) => {

    const [addItem, setAddItem] = useState(1)

    const addItemfunc = () => {
        setAddItem((prev) => prev + 1)
    }

    const reduceItemfunc = () => {
        setAddItem((prev) => prev - 1)
    }
    return (
        <div className="border-bottom py-3">
            <div className="form-check col d-flex align-items-center">
                <input className="form-check-input" type="checkbox" name="paymentMethod" value="" id="paystack" />
                <label className="form-check-label w-100 ms-3" htmlFor="paystack">
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
                            <div>
                                <button className='btn bg-danger text-light rounded-4'>Remove</button>
                            </div>
                        </div>
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