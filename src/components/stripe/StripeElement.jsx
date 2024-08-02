import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripeCheckout from './StripeCheckout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

export default function App() {
  const options = {
    // passing the client secret obtained from the server
    // clientSecret: ""
    mode: 'payment',
  amount: 1099,
  currency: 'usd',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckout />
    </Elements>
  );
};