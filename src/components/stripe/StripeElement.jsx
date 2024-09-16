import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from './StripeCheckout';

const stripePromise = loadStripe('pk_test_51PYY5yRodgHysfaEHt7CKS3VNz8Tea51ig2ddwinDuMqCMCJfA6ZdsEhgtXNGX3teAbUas0BGrqApaTHvlhPjxfC00CbrCwGco');

const StripeElement = ({ token, amount }) => {
  

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
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckout
        token={token}
        amount={amount}
      />
    </Elements>
  )
};

export default StripeElement;