import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#F24E1E]">Payment Successful!</h2>
        <p className="text-gray-700 mb-6">Thank you for your purchase. Your payment has been successfully processed.</p>
        <button
          className="px-4 py-2 text-white rounded bg-[#FF8534] hover:bg-[#F24E1E]focus:outline-none"
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
