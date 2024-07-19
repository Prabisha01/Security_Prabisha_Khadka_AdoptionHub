import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrderApi } from "../../apis/Api";

function PaymentPage() {
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { cartItems, total, user } = location.state || {};
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const products = cartItems.map((item) => {
    return item.products._id;
  });

console.log(products)
  const validateCardNumber = (number) => {
    const regex = new RegExp("^[0-9]{16}$");
    return regex.test(number.replace(/\s+/g, ""));
  };

  const validateExpiryDate = (date) => {
    const regex = new RegExp("^(0[1-9]|1[0-2])/?([0-9]{2})$");
    return regex.test(date);
  };

  const validateCVV = (cvv) => {
    const regex = new RegExp("^[0-9]{3,4}$");
    return regex.test(cvv);
  };

  const validateName = (name) => {
    return name.trim().length > 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateCardNumber(paymentInfo.cardNumber)) {
      newErrors.cardNumber = "Invalid card number";
    }
    if (!validateExpiryDate(paymentInfo.expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date";
    }
    if (!validateCVV(paymentInfo.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }
    if (!validateName(paymentInfo.cardholderName)) {
      newErrors.cardholderName = "Name cannot be empty";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Payment Info: ", paymentInfo);

      const data = new FormData();
      data.append("cardNumber", paymentInfo.cardNumber);
      data.append("expiryDate", paymentInfo.expiryDate);
      data.append("cvv", paymentInfo.cvv);
      data.append("cardholderName", paymentInfo.cardholderName);
      data.append("price", total);
      //   print cartItems

      const productsInfo = cartItems.map((item) => ({
        product: item.products._id,
        quantity: item.quantity,
      }));
      data.append("products", JSON.stringify(productsInfo));
      data.append("user", user._id);

      createOrderApi(data)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/success");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Server Error");
        });
    }
  };

  if (!cartItems) {
    return <div>No items in the cart.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-52 mt-42 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-xs italic">{errors.cardNumber}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-xs italic">{errors.expiryDate}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.cvv && (
              <p className="text-red-500 text-xs italic">{errors.cvv}</p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="cardholderName"
            className="block text-sm font-medium text-gray-700"
          >
            Cardholder Name
          </label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            value={paymentInfo.cardholderName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.cardholderName && (
            <p className="text-red-500 text-xs italic">
              {errors.cardholderName}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center mt-6">
          <strong>Total: ${total.toFixed(2)}</strong>
          <button
            onClick={handleSubmit}
            type="submit"
            className="px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#FF8534] hover:bg-[#F24E1E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentPage;
