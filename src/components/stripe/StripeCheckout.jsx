"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, APP_URL } from '../utils/base';


const StripeCheckout = ({ token, amount, }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [formReady, setFormReady] = useState(false); // New state to track form readiness

  useEffect(() => {
    axios.post(`${BASE_URL}payment/stripe-payment-intent`, {amount: amount}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
      setClientSecret(response.data.clientSecret)
    })
    .catch((error) => {
        console.log(error);
        if (error.response) {
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage(error.message);
        }
    });
  }, [amount, token]);

  useEffect(() => {
    if (elements && clientSecret) {
      const paymentElement = elements.getElement(PaymentElement);
      if (paymentElement) {
        paymentElement.on("ready", () => setFormReady(true));
      }
    }
  }, [elements, clientSecret]);


  const handlePaymentSuccess = async () => {
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    setErrorMessage("")

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      setLoading(false)
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    // const res = await fetch('/create-intent', {
    //   method: 'POST',
    // });

    // const {client_secret: clientSecret} = await res.json();
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${APP_URL}success`,
      },
    }
  );
    if (result.error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(result.error.message);
      setLoading(false)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
       if (result.paymentIntent.status === 'succeeded') {
        handlePaymentSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {formReady && stripe && elements && clientSecret && (
        <button
          className="btn btn-outline-info mt-4"
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing....." : "Pay"}
        </button>
      )}
      {/* Show error message to your customers */}
      {errorMessage && <div className='text-danger'>{errorMessage}</div>}
    </form>
  );
};

export default StripeCheckout