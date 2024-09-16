import React from 'react'
import NavBar from '../components/layout/NavBar'
import { TbChecklist } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import approvalIcon from "../assets/approval-icon.svg"

const SuccessfulCheckoutPage = () => {
    const { state } = useLocation()
    console.log(state)

    


    const date = new Date().toLocaleString()
    return (
        <div>
            <div style={{ backgroundColor: "hsla(0, 0%, 95%, 1)", minHeight: "100vh" }}>
                <NavBar />
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-6 my-3">
                            <div className="col-md-10 mb-3">
                                <h3>Payments Confirmation Successfully !</h3>
                                <p>Thank you for choosing to study with us! Your Reservation is Confirmed. If there's anything you need, please don't hesitate to reach out to your host!</p>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <div>
                                    <span>
                                        <TbChecklist className='prime_brown' size={40} />
                                    </span>
                                </div>
                                <p className='fw-bold ash_text'>Transaction id : {state.info?.reference}</p>
                            </div>
                            <div className='d-flex'>
                                <Link className='nav-link pb-2 border-bottom border-3 border-dark fw-bold' to={"/courses"}>Go to courses</Link>
                            </div>
                        </div>
                        <div className="col-md-6 my-3">
                            <div className="light_brown d-flex align-items-center justify-content-between p-4">
                                <div>
                                    <h1>₦{state.allDetails?.currentTotal}.00</h1>
                                    <p>Payment Successful</p>
                                </div>
                                <div className='col-2 me-4'>
                                    <img src={approvalIcon} alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="col-md-8">
                                    <h5 className='border-bottom border-dark p-3'>Transaction details</h5>
                                    {state.allDetails?.cartCourses.map((each) => (
                                        <div key={each.cartsId} className="d-flex mb-3  justify-content-between">
                                            <p>{each.title}</p>
                                            <p className='fw-bold'>${each.price}</p>
                                        </div>
                                    ))}
                                    <div className="d-flex border-bottom border-2 border-dark mb-4 pb-3 justify-content-between">
                                        <p>Course Date</p>
                                        <p className='fw-bold'>{date}</p>
                                    </div>
                                    <div className="d-flex fs-5 fw-bold justify-content-between">
                                        <p>Total</p>
                                        <p className=''>{state.allDetails?.currentTotal}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessfulCheckoutPage