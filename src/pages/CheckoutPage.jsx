import React from 'react'
import NavBar from '../components/layout/NavBar'
import CartsItem from '../components/carts/CartsItem'
import payPal from "../assets/dash-icons/paypal 1.svg"
import payStack from "../assets/dash-icons/Paystack 1.svg"
import { BsCreditCard, BsPaypal } from 'react-icons/bs'
import visaCard from "../assets/dash-icons/visa-icon.svg"
import masterCard from "../assets/dash-icons/master-card.svg"
import { Link } from 'react-router-dom'

const CheckoutPage = () => {

    const on = false
    return (
        <div style={{ backgroundColor: "hsla(0, 0%, 95%, 1)" }}>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="py-5">
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
                                <CartsItem on={on} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-center" style={{ backgroundColor: "hsla(359, 54%, 44%, 0.12)" }}>
                        <div className="container ps-5">
                            <div className="col-md-8">
                                <h3 className='border-bottom border-black pb-4'>Summary</h3>
                                <div className="fs_sm border-bottom border-black ">
                                    <div className="d-flex mb-3 justify-content-between">
                                        <p>Course Price</p>
                                        <p className="fw-bold"> $400</p>
                                    </div>
                                    <div className="d-flex mb-3 justify-content-between">
                                        <p>Discount</p>
                                        <p className="fw-bold"> $400</p>
                                    </div>
                                    <div className="d-flex mb-3 justify-content-between">
                                        <p>Course Date</p>
                                        <p className="fw-bold">Thu, 8 Feb 2024 - 10:00</p>
                                    </div>
                                </div>
                                <div className='fw-bold my-4 d-flex justify-content-between'>
                                    <p>Discount</p>
                                    <p className="fw-bold"> $400</p>
                                </div>
                                <div className="rounded bg-white p-4">
                                    <div className="fs_sm">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="TsAndCs" />
                                            <label className="form-check-label" htmlFor="TsAndCs">
                                                By clicking this, I agree to Garazi <Link className='prime_brown fw-bold' to={""}>Terms &
                                                    Conditions and Privacy Policy</Link>
                                            </label>
                                        </div>
                                    </div>
                                    <button className='btn brown_bg mt-4 text-white w-100'>Pay for my  Booking</button>
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