import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'
import { BASE_URL } from '../../utils/base';

const stripePromiseKey = 'pk_test_51PYY5yRodgHysfaEHt7CKS3VNz8Tea51ig2ddwinDuMqCMCJfA6ZdsEhgtXNGX3teAbUas0BGrqApaTHvlhPjxfC00CbrCwGco';
// const testClient = "sk_test_51PYY5yRodgHysfaEHCjCj2eBnWvQD5cH4xMyFNsaETLDtzE7R8poHQj9mENK6pat6HCucmSl4M7Z0O44alpcodyg00mpJdDKv4"

function Payment(props) {
  //   const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState("sk_test_51PYY5yRodgHysfaEHCjCj2eBnWvQD5cH4xMyFNsaETLDtzE7R8poHQj9mENK6pat6HCucmSl4M7Z0O44alpcodyg00mpJdDKv4");
  const [ stripePromise, setStripePromise ] = useState(null);

  useEffect(() => {
    setStripePromise(loadStripe(stripePromiseKey));
    // fetch(`${BASE_URL}payment/confirm-payment`).then(async (r) => {
    //   const { publishableKey } = await r.json();
    //   setStripePromise(loadStripe(publishableKey));
    // });
  }, []);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    console.log("worked")
    // fetch(`${BASE_URL}payment/confirm-payment`)
    //   .then((res) => res.json())
    //   .then(({clientSecret}) => setClientSecret(clientSecret));
    // setClientSecret(testClient)
  }, []);
  const appearance = {
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
  };
  console.log(stripePromise)
  console.log(clientSecret)
  return (
    <>
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance}}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;