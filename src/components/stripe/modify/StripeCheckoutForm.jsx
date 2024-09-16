import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { BASE_URL } from '../../utils/base';

const StripeCheckoutForm = ({token, amount}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState('');
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("data stripe")

  // Fetch the client secret as soon as the component mounts
  useEffect(() => {
    fetch(`${BASE_URL}payment/stripe-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: amount }), // Replace with dynamic amount
    })
      .then((res) => res.json())
      .then(data => {
        console.log("data stripe")
        console.log(data)
        setClientSecret(data.clientSecret)
      });
  }, );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL where the user will be redirected after successful payment
        return_url: 'http://localhost:3000/checkout/success',
      },
    });

    if (result.error) {
      setPaymentError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setPaymentSuccess('Payment succeeded!');
      }
    }
  };

  return (
    <div>
      {clientSecret && (
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button type="submit" disabled={!stripe || loading}>
            {loading ? "Processing....." : "Pay"}
          </button>
        </form>
      )}
      {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}
      {paymentSuccess && <div style={{ color: 'green' }}>{paymentSuccess}</div>}
    </div>
  );
};

export default StripeCheckoutForm;
