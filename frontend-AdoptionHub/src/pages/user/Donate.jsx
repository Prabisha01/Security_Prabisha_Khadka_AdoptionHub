import React, { useEffect } from "react";
import { allFundingsApi } from "../../apis/Api";

const DonorPage = ({ onClose }) => {
  const getTopDonors = () => {
    // Call the API to get the top donors
    allFundingsApi().then((res) => {
      console.log(res?.data?.topDonors);
    });
  };
  useEffect(() => {
    getTopDonors();
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl"
        >
          &#x2715;
        </button>
        <h1 className="text-4xl font-bold text-center mb-2">
          We <span className="text-orange-500">appreciate</span> your love for
          Pet
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Because Your Pet Deserves the Best
        </p>
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-2xl font-bold">Rakesh Sharma</h2>
            <p className="text-xl font-semibold">Rs. 20,000</p>
            <div className="mt-4">
              <p>Radhe Sharma</p>
              <p>Rs. 10,000</p>
            </div>
            <div className="mt-4">
              <p>Radhe Sharma</p>
              <p>Rs. 5,000</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Raju Sharma</h2>
            <p className="text-xl font-semibold">Rs. 13,000</p>
            <div className="mt-4">
              <p>Radhe Sharma</p>
              <p>Rs. 10,000</p>
            </div>
            <div className="mt-4">
              <p>Radhe Sharma</p>
              <p>Rs. 5,000</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Rumi Sharma</h2>
            <p className="text-xl font-semibold">Rs. 12,000</p>
            <div className="mt-4">
              <p>Radhe Sharma</p>
              <p>Rs. 10,000</p>
            </div>
            <div className="mt-4">
              <p>Radhe Sharma</p>
              <p>Rs. 5,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorPage;