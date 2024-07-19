import React from 'react';

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Payment Cancelled</h2>
        <p className="text-gray-700 mb-6">Your payment was cancelled. Please try again or contact support if you need assistance.</p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
