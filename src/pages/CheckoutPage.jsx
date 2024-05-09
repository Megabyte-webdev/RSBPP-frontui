import NavBar from '../components/layout/NavBar'
import CartsItem from '../components/carts/CartsItem'
import { BsCreditCard, BsPaypal } from 'react-icons/bs'
import visaCard from "../assets/dash-icons/visa-icon.svg"
import masterCard from "../assets/dash-icons/master-card.svg"
import { Link, useLocation } from 'react-router-dom';
import { IoCheckboxSharp } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useContext, useEffect, useState } from 'react'
import { cartsTotalFunction } from '../components/utils/getApi'
import { UserContext } from '../context/AuthContext'
import PaystackPlatform from '../components/payment/PaystackPlatform'
import { Spinner } from 'react-bootstrap'

const CheckoutPage = () => {
    const [accept, setAccept] = useState(false)
    const { state } = useLocation()

    const { userCredentials } = useContext(UserContext);

    const [error, setError] = useState('');

    const [currentTotal, setCurrentTotal] = useState(null);



    const token = userCredentials.token;
    const userId = userCredentials?.user.id;
    const toggleAccept = () => {
        setAccept(prev => !prev)
    }
    useEffect(() => {
        cartsTotalFunction(token, userId, setError, setCurrentTotal)
    }, [])

    // console.log(currentTotal)
    // console.log(state)
    const on = false
    return (
        <div style={{ backgroundColor: "hsla(0, 0%, 95%, 1)", minHeight: "100vh" }}>
            <NavBar />
            <div className="">
                <div className="d-md-flex">
                    <div className="col-md-6">
                        <div className="p-md-5 px-3">
                            <h4>CHECKOUT</h4>
                            <h5>Billing address</h5>
                            <div className="col-md-7 mb-3">
                                <label htmlFor="inputState" className="form-label fw-bold">Country</label>
                                <select id="inputState" className="form-select">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <p>Rotterdam business school is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.</p>
                            <div className='my-4'>
                                <h5>Payment Method</h5>
                                <div className="col border p-1">
                                    <div className="form-check col d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="paymentMethod" value="" id="flexCheckChecked" />
                                        <label className="form-check-label w-100 ms-3" htmlFor="flexCheckChecked">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex">
                                                    <span className='me-2'><BsCreditCard /></span>
                                                    <span className='fw_sm fw-bold'>Credit / Debit Card</span>
                                                </div>
                                                <div className="d-flex">
                                                    <div className='me-2'>
                                                        <img src={visaCard} alt="" className="" />
                                                    </div>
                                                    <div>
                                                        <img src={masterCard} alt="" className="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className="col border p-1 mt-1">
                                    <div className="form-check col d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="paymentMethod" value="" id="paystack" />
                                        <label className="form-check-label ms-3" htmlFor="paystack">
                                            <BsPaypal />
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className='my-4'>
                                <h5>Order Deals</h5>
                                {state.cartCourses?.map((cart) => (
                                    <CartsItem key={cart.id} cart={cart} on={on} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-center" style={{ backgroundColor: "hsla(359, 54%, 44%, 0.12)" }}>
                        <div className="p-md-5 px-3 d-flex justify-content-center">
                            <div className="col-md-8">
                                <h3 className='border-bottom border-black pb-4'>Summary</h3>
                                <div className="fs_sm border-bottom border-black ">
                                    {state.cartCourses?.map((cart) => (
                                        <div key={cart.id} className="d-flex mb-3 justify-content-between">
                                            <p>{cart.title}</p>
                                            <p className="fw-bold"> ${cart.price}</p>
                                        </div>
                                    ))}
                                    {/* <div className="d-flex mb-3 justify-content-between">
                                        <p>Course Date</p>
                                        <p className="fw-bold">Thu, 8 Feb 2024 - 10:00</p>
                                    </div> */}
                                </div>
                                <div className='fw-bold my-4 d-flex justify-content-between'>
                                    <p>Total</p>
                                    {/* {!currentTotal && (
                                        <p className="fw-bold"> <Spinner size='sm' /></p>
                                    )}
                                    {currentTotal && (
                                        <p className="fw-bold"> ${currentTotal}.00</p>
                                    )} */}
                                        <p className="fw-bold"> ${state.currentTotal}.00</p>
                                </div>
                                <div className="rounded bg-white p-4">
                                    <div className="fs_sm d-flex">
                                        <div className="form-check d-flex prime_brown">
                                            <button
                                                onClick={() => toggleAccept()}
                                                className='border-0 prime_brown inherit_bg'>
                                                {accept ? (
                                                    <IoCheckboxSharp size={25} />
                                                ) : (
                                                    <MdOutlineCheckBoxOutlineBlank size={25} />
                                                )}
                                            </button>
                                            <div className="">
                                                By clicking this, I agree to Garazi <Link className='prime_brown fw-bold' to={""}>Terms &
                                                    Conditions and Privacy Policy</Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <button className='btn brown_bg mt-4 text-white w-100'>Pay for my  Booking</button> */}
                                    <PaystackPlatform userCredentials={userCredentials} allDetails={state} accept={accept} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage