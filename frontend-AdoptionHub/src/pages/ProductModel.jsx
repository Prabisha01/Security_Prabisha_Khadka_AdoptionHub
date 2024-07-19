import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ProductModal = ({ isOpen, onClose, product, addToCart }) => {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm "
      id="my-modal"
    >
      <div className="relative bg-white rounded-lg shadow-lg border border-black w-full max-w-[1102px] h-[711px] mx-4 p-6" style={{ borderRadius: '25px' }}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute"
          style={{ top: '29px', right: '27px', fontSize: '1.5rem', color: 'black' }}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className="flex flex-col md:flex-row items-center mt-4">
          <div className="flex justify-center items-center w-full md:w-1/2">
            <img
              src={product.productImageUrl}
              alt={product.productName}
              className="rounded-lg"
              style={{ width: '347px', height: '392px' }}
            />
          </div>
          <div className="text-lg w-full md:w-1/2 md:pl-10 mt-6 md:mt-0">
            <h2 className="text-left font-bold text-gray-800 mb-2" style={{ fontSize: '25px' }}>
              {product.productName}
            </h2>
            <p className="text-left text-gray-800 mb-4" style={{ fontSize: '25px' }}>
              Price: {product.productPrice} Rs
            </p>
            <p className="text-left text-gray-800 mb-4" style={{ fontSize: '25px' }}>
              {product.productDescription}
            </p>
            <button
              onClick={() => addToCart(product._id)}
              className="bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              style={{ width: '431px', height: '62px', borderRadius: '10px', fontSize: '20px', transition: 'all 500ms ease-in-out' }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#FF7148";
                e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                e.target.style.border = "2px solid black";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#FF8534";
                e.target.style.boxShadow = "none";
                e.target.style.border = "none";
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
