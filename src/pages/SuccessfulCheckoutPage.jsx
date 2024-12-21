import React from 'react'
import NavBar from '../components/layout/NavBar'
import { TbChecklist } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import approvalIcon from "../assets/approval-icon.svg"
import { ResourceContext } from '../context/ResourceContext';
import { UserContext } from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../components/utils/base';

const SuccessfulCheckoutPage = () => {
    const { state } = useLocation()
    const [paymentDetail, setPaymentDetail] = useState([]);
    const [paymentReference, setPaymentReference] = useState("");
    const [totalPrice, setTotalPrice] = useState("");

    const { userCredentials } = useContext(UserContext);

    useEffect(() => {
     axios.post(`${BASE_URL}payment/stripe-payment-confirm`, {amount: ""}, {
        headers: {
            'Authorization': `Bearer ${userCredentials.token}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
      setPaymentDetail(response.data.paymentDetail)
      setPaymentReference(response.data.reference)
      setTotalPrice(response.data.totalPrice)
    })
    .catch((error) => {
        console.log(error);
    });
  }, []);

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
                                <p>Thank you for choosing to study with us! Your Reservation is Confirmed. If there anything you need, please do not hesitate to reach out to your host!</p>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <div>
                                    <span>
                                        <TbChecklist className='prime_brown' size={40} />
                                    </span>
                                </div>
                                <p className='fw-bold ash_text'>Transaction id : {paymentReference}</p>
                            </div>
                            <div className='d-flex'>
                                <Link className='nav-link pb-2 border-bottom border-3 border-dark fw-bold' to={"/courses"}>Go to courses</Link>
                            </div>
                        </div>
                        <div className="col-md-6 my-3">
                            <div className="light_brown d-flex align-items-center justify-content-between p-4">
                                <div>
                                    <h1>${totalPrice}.00</h1>
                                    <p>Payment Successful</p>
                                </div>
                                <div className='col-2 me-4'>
                                    <img src={approvalIcon} alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="col-md-8">
                                    <h5 className='border-bottom border-dark p-3'>Transaction details</h5>
                                    {paymentDetail?.map((each) => (
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
                                        <p className=''>{totalPrice}</p>
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