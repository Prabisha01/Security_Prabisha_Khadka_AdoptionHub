import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserApi } from "../apis/Api";

const RegisterModal = ({ isOpen, onClose, onOpenLogin }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [fnameerror, setFullnameError] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const [cpassworderror, setCpasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  const handleTermsChange = (e) => {
    setTerms(e.target.checked);
    if (e.target.checked) {
      setTermsError("");
    }
  };

  const Validate = () => {
    let isValid = true;
    setFullnameError("");
    setEmailError("");
    setPasswordError("");
    setCpasswordError("");
    if (fullName.trim() === "") {
      setFullnameError("Name is Required");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("Email is Required");
      isValid = false;
    }
    if (email.trim() !== "" && !email.includes("@")) {
      setEmailError("Invalid Email");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is Required");
      isValid = false;
    }
    if (confirmPassword.trim() === "") {
      setCpasswordError("Password doesnot match");
      isValid = false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setCpasswordError("Password doesnot match");
      isValid = false;
    }
    if (!terms) {
      setTermsError("Please agree to terms and conditions");
      isValid = false;
    }
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = Validate();
    if (!isValid) return;
    const data = new FormData();
    data.append("fullName", fullName);
    data.append("email", email);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);

    createUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          setIsLoading(false);
          toast.error(res.data.message);
        } else {
          onClose();
          onOpenLogin();
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg flex">
        <div className="w-1/2">
          <img
            src="assets/images/login.png"
            alt="Adopt Me"
            className="h-full w-[700px] object-cover rounded-l-lg"
          />
        </div>
        <div className="w-1/2 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 text-xl"
          >
            &times;
          </button>
          <img src="assets/logo/logo.png" alt="" className="mb-5" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Create an Account
          </h2>
          <form>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon icon={faUser} className="text-gray-950" />
                </span>
                <input
                  placeholder="Full Name"
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                />
              </div>
              {fnameerror && <p className="text-danger">{fnameerror}</p>}
            </div>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-950"
                  />
                </span>
                <input
                  placeholder="Email Address"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                />
              </div>
              {emailerror && <p className="text-danger">{emailerror}</p>}
            </div>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} className="text-gray-950" />
                </span>
                <input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                />
              </div>
              {passworderror && <p className="text-danger">{passworderror}</p>}
            </div>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} className="text-gray-950" />
                </span>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                />
              </div>
              {cpassworderror && (
                <p className="text-danger">{cpassworderror}</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-3">
              <button
                className="bg-orange-500 w-full hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleRegister}
              >
                Sign Up
              </button>
              <div className="col-span-3 mt-4">
                <input
                  onChange={handleTermsChange}
                  className="cursor-pointer"
                  type="checkbox"
                  id="terms"
                />
                <label htmlFor="terms" className="ml-2 cursor-pointer">
                  I agree to the terms and conditions.
                </label>
                {termsError && <p className="text-danger">{termsError}</p>}
              </div>
              <p className="inline-block align-baseline font-bold text-sm text-black">
                Already a member?
                <Link onClick={onOpenLogin} className="text-blue-800 underline">
                  {" "}
                  Login{" "}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterModal;
