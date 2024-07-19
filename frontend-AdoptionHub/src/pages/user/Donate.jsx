import React from 'react';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom'; // Correct hook for navigation

const Donate = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    // Redirect to home page or another page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[1102px] h-[711px] relative">
        <button
          title="Close Modal"
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 w-16 h-16 flex items-center justify-center text-2xl"
        >
          <FontAwesomeIcon icon={faClose} size="lg" />
        </button>
        <h2 className="text-3xl font-bold text-center mb-4">
          We <span className="text-orange-500">appreciate</span> your love for Pet
        </h2>
        <p className="text-center text-gray-700 mb-8">Because Your Pet Deserves the Best</p>
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-bold text-xl">Rakesh Sharma</p>
            <p className="text-lg">Rs. 20,000</p>
          </div>
          <div>
            <p className="font-bold text-xl">Raju Sharma</p>
            <p className="text-lg">Rs. 13,000</p>
          </div>
          <div>
            <p className="font-bold text-xl">Rumi Sharma</p>
            <p className="text-lg">Rs. 12,000</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 text-center mt-8">
          <div>
            <p className="font-bold text-lg">Radhe Sharma</p>
            <p className="text-md">Rs. 10,000</p>
          </div>
          <div>
            <p className="font-bold text-lg">Radhe Sharma</p>
            <p className="text-md">Rs. 10,000</p>
          </div>
          <div>
            <p className="font-bold text-lg">Radhe Sharma</p>
            <p className="text-md">Rs. 10,000</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 text-center mt-8">
          <div>
            <p className="text-md">Radhe Sharma</p>
            <p className="text-md">Rs. 5,000</p>
          </div>
          <div>
            <p className="text-md">Radhe Sharma</p>
            <p className="text-md">Rs. 5,000</p>
          </div>
          <div>
            <p className="text-md">Radhe Sharma</p>
            <p className="text-md">Rs. 5,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
