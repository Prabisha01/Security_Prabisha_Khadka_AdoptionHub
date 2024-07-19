import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DonateMoney = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [error, setError] = useState("");

  const validateAmount = (input) => {
    const num = Number(input);
    if (!num || num < 1) {
      setError("Please enter a valid amount.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAmountChange = (value) => {
    if (validateAmount(value)) {
      setAmount(value);
      setSelectedAmount(value);
    }
  };

  const handleProceedToPayment = () => {
    // Ensure that an amount is either selected or validly entered
    if (selectedAmount || validateAmount(amount)) {
      setIsPaymentOpen(true);
    }
  };

  const closePaymentForm = () => {
    setIsPaymentOpen(false);
  };

  if (!isOpen) return null;

  if (!isPaymentOpen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white shadow-md rounded-lg p-8 w-[1102px] h-[711px] relative flex border border-black">
          <button
            title="Close Modal"
            onClick={onClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 w-16 h-16 flex items-center justify-center text-2xl"
            style={{ right: '27px', top: '29px', fontSize: '1.7rem', color: 'black', position: 'absolute' }}
          >
            <FontAwesomeIcon icon={faClose} size="lg" />
          </button>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-center p-10 mb-4">
              <img
                src="assets/images/cat.png"
                alt="Cute kitten"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-700 text-center mb-6">
              Life can be difficult sometimes, but remembering we're all in this
              together can help us feel more connected to those around us.
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Secure Donate
            </h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {["35000", "20000", "10000", "3500", "2500", "1000"].map(
                (value, index) => (
                  <button
                    key={index}
                    onClick={() => handleAmountChange(value)}
                    className={`py-4 px-4 rounded ${
                      selectedAmount === value
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {value.length > 4 ? `${value / 1000} K` : value}
                  </button>
                )
              )}
            </div>
            <input
              type="text"
              placeholder="Other"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 mb-4 border rounded h-16"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <textarea
              placeholder="Add Comment"
              className="w-full p-2 mb-4 border rounded h-40"
              rows="4"
            ></textarea>
            <button
              onClick={handleProceedToPayment}
              className="w-full bg-orange-500 text-white py-2 rounded h-16"
              style={{ transition: 'background-color 500ms ease, border 500ms ease' }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#FF7148";
                e.target.style.border = "2px solid black";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#FF8534";
                e.target.style.border = "none";
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <PaymentForm amount={amount} onClose={closePaymentForm} />;
  }
};

export default DonateMoney;
