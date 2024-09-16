import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';

// Load Stripe with your public key
const stripePromise = loadStripe('pk_test_51PYY5yRodgHysfaEHt7CKS3VNz8Tea51ig2ddwinDuMqCMCJfA6ZdsEhgtXNGX3teAbUas0BGrqApaTHvlhPjxfC00CbrCwGco');

const StripePayment = ({user, amount}) => {
  const [clientSecret, setClientSecret] = useState('');

  // useEffect(() => {
  //   // Fetch the client secret as soon as the component mounts
  //   fetch('/api/create-payment-intent', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ amount: amount }), // Replace with dynamic amount
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  // const options = {
  //   clientSecret,
  // };

  const options = {
    mode: 'payment',
    amount: amount,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance : {
      theme: 'night',
      variables: {
        fontFamily: 'Sohne, system-ui, sans-serif',
        fontWeightNormal: '500',
        borderRadius: '8px',
        colorBackground: '#0A2540',
        colorPrimary: '#EFC078',
        accessibleColorOnColorPrimary: '#1A1B25',
        colorText: 'white',
        colorTextSecondary: 'white',
        colorTextPlaceholder: '#ABB2BF',
        tabIconColor: 'white',
        logoColor: 'dark'
      },
      rules: {
        '.Input': {
          backgroundColor: '#212D63',
          border: '1px solid var(--colorPrimary)'
        }
      }
    }
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <StripeCheckoutForm user={user} amount={amount} />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
