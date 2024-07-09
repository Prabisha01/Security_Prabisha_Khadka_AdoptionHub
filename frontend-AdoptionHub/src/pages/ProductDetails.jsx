import React from "react";

const ProductDetails = ({ isOpen, onClose, onOpenModal }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
        <div className="bg-white rounded-lg shadow-lg border-2 border-black flex flex-row justify-center">
          <div className="w-1/2 py-16 flex justify-around place-items-center">
            <img
              src="assets/images/product.png"
              alt="Adopt Me"
              className="h-56 object-cover rounded-l-lg"
            />
          </div>
          <div className="w-2/3 p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-700 text-xl"
            >
              &times;
            </button>
            <div className="flex flex-col  h-full justify-evenly gap-2">
              <h1>Category : Cat</h1>
              <h1>Whiskas</h1>
              <h1>1646 Rs</h1>
              <h1>
                The product is made for cat and it is highly beneficial for the
                overall growth of the pet.
              </h1>
              <button className="bg-orange-500 w-full hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
