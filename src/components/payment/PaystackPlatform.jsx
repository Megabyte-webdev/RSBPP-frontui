import React from 'react'
import { usePaystackPayment } from 'react-paystack';

const PaystackPlatform = ({ currentTotal, accept }) => {

    const config = {
        reference: (new Date()).getTime().toString(),
        email: "climaxbiz.com",
        amount: `${currentTotal}00`, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_9c9a3dc9660f86e2334c823d746b9bf29b59a13e',
    };

    // you can call this function anything
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const initializePayment = usePaystackPayment(config);

    return (
        <div>
            <button
            disabled={!accept}
                className='btn brown_bg mt-4 text-white w-100'
                onClick={() => {
                    initializePayment(onSuccess, onClose)
                }}>{accept? "Pay for Booking" : "Agree to proceed"}</button>
        </div>
    )
}

export default PaystackPlatform