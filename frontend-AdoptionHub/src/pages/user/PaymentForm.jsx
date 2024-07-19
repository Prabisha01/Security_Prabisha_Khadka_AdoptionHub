import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { addFundApi } from "../../apis/Api";
import { toast } from "react-toastify";

const PaymentForm = ({ onClose, amount }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("user", user?._id);
    data.append("amount", amount);
    addFundApi(data)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-[1102px] h-[711px] relative border border-black">
        <div className="w-1/2 flex flex-col px-8 justify-start bg-gray-100 relative">
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            size="2x"
            className="text-gray-700 cursor-pointer hover:text-gray-900 absolute top-4 left-4"
            onClick={onClose}
          />
          <div className="mt-14">
            <h1 className="text-3xl font-semibold text-gray-700">Pay</h1>
            <h1 className="text-5xl font-bold text-gray-800">{amount}</h1>
          </div>
          <div></div>
        </div>
        <form className="w-1/2 p-8">
          <div className="text-3xl font-semibold mb-8 text-center">
            Pay with Card
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg h-16"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Card Information
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 1234 1234 1234"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg h-16"
            />
            <div className="flex justify-between gap-3 mt-4">
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
                className="w-1/2 p-2.5 border border-gray-300 rounded-lg h-16"
              />
              <input
                type="text"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCVC(e.target.value)}
                required
                className="w-1/2 p-2.5 border border-gray-300 rounded-lg h-16"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name on card
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg h-16"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg h-16"
            >
              <option value="">Select a country</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded h-16"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
