import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#004AAD] text-white pt-10">
      <div className="mx-5 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>adoptionhub@gmail.com</span>
        </div>
        <div className="text-center">
          <nav className="space-x-4 mb-4">
            <Link to={"/faq"} className="hover:underline">
              FAQ
            </Link>
            <Link to={"/terms-and-condition"} className="hover:underline">
              Term and Condition
            </Link>
            <Link to={"/about"} className="hover:underline">
              About
            </Link>
          </nav>
          <p>
            AdoptionHub is a platform to connect pet with family and rehome the
            needy furry friends.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faPhone} />
          <span>+977 9813080652 / Dillibazar Kathmandu</span>
        </div>
      </div>
      <div className="bg-[#004AAD] h-16 flex justify-between mt-8 overflow-hidden">
        <span className="w-2/4 relative bottom-[-25px] rounded-r-full bg-[#f24c00]"></span>
        <span className="w-1/3 container relative bottom-[-15px] flex items-start justify-center h-16 space-x-4">
          <img
            src="assets/images/facebook.png"
            alt="fb"
            className="h-12 w-12"
          />
          <img src="assets/images/linked.png" alt="fb" className="h-12 w-12" />
          <img src="assets/images/insta.png" alt="fb" className="h-12 w-12" />
          <img src="assets/images/twitter.png" alt="fb" className="h-12 w-12" />
        </span>
        <span className="w-2/4 relative bottom-[-25px] rounded-l-full bg-[#f24c00]"></span>
      </div>
    </footer>
  );
};

export default Footer;
