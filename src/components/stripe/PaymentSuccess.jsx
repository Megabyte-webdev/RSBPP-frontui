import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7 12a5 5 0 100-10 5 5 0 000 10zm12 12a5 5 0 100-10 5 5 0 000 10z"
            ></path>
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your payment. Your transaction was successful.
        </p>

        <div className="mt-6">
          <a
            href="/"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Back to Home
          </a>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>
            Need help?{" "}
            <a href="/support" className="text-blue-500 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
