import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';

import CheckoutForm from "./CheckoutForm";
import CompletePage from "./CompletePage";
import "./App.css";
import axios from 'axios';
import { BASE_URL } from '../../utils/base';


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51PYY5yRodgHysfaEHt7CKS3VNz8Tea51ig2ddwinDuMqCMCJfA6ZdsEhgtXNGX3teAbUas0BGrqApaTHvlhPjxfC00CbrCwGco");

export default function StripeApp() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.post(`${BASE_URL}payment/stripe-payment-intent`, {amount: state.amount}, {
        headers: {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
      setClientSecret(response.data.clientSecret)
      setDpmCheckerLink(`https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${response.data.id}`)
      console.log("hello stripe");
      console.log(clientSecret);
      console.log(dpmCheckerLink);
    })
    .catch((error) => {
        console.log(error);
        // if (error.response) {
        //     setErrorMessage(error.response.data.message);
        // } else {
        //     setErrorMessage(error.message);
        // }
    });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
      <div className="App">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <Routes>
              <Route path="/stripe/payment/now/checkout" element={<CheckoutForm dpmCheckerLink={dpmCheckerLink}/>} />
              <Route path="/stripe/payment/now/complete" element={<CompletePage />} />
            </Routes>
          </Elements>
        )}
      </div>
  );
}