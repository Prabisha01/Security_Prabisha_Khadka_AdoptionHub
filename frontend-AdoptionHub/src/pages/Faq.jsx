import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    "Where does the money of the donation go ?",
    "Where does the money of the donation go ?",
    "Where does the money of the donation go ?",
    "Where does the money of the donation go ?",
    "Where does the money of the donation go ?",
    "Where does the money of the donation go ?",
    "Where does the money of the donation go ?",
    "Where does the money of the donation go ?",
    "Where does the money of the donation go ?",
  ];

  const toggleFaq = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <img
        src="assets/images/faq.png"
        alt="Background"
        className="w-full h-64"
      />
      <div className="bg-white mt-[-145px] p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => toggleFaq(index)}
              className={`flex justify-between w-full p-2 border rounded bg-gray-100 hover:bg-gray-200 focus:outline-none ${
                openIndex === index ? "text-blue-500" : "text-black"
              }`}
            >
              <span>{faq}</span>
              <span>
                {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-2 bg-white border-l-2 border-b-2 border-r-2 border-gray-200 rounded-b">
                <p>
                  The money of the donation goes in the betterment of the pet.
                  They get better care, materials and food. The money of the
                  donation goes in the betterment of the pet. They get better
                  care, materials and food. The money of the donation goes in
                  the betterment of the pet. They get better care, materials and
                  food.The money of the donation goes in the betterment of the
                  pet. They get better care, materials and food. The money of
                  the donation goes in the betterment of the pet. They get
                  better care, materials and food. The money of the donation
                  goes in the betterment of the pet. They get better care,
                  materials and food.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
