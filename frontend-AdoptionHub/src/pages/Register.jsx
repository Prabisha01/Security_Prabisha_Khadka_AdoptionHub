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
      setCpasswordError("Password does not match");
      isValid = false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setCpasswordError("Password does not match");
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
    <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg flex border border-black" style={{ width: '1102px', height: '711px', borderRadius: '25px' }}>
        <div className="w-1/2 p-4">
          <img
            src="assets/images/login.png"
            alt="Adopt Me"
            className="h-full w-full object-cover rounded-l-lg"
            style={{ borderRadius: '40px' }}
          />
        </div>
        <div className="w-1/2 p-6 relative flex flex-col justify-center">
          <button
            onClick={onClose}
            className="absolute"
            style={{ top: '29px', right: '27px', fontSize: '3.2rem', color: 'black' }}
          >
            &times;
          </button>
          <div className="absolute" style={{ top: '40px', left: '10px' }}>
            <img src="assets/logo/logo.png" alt="AdoptionHub" className="w-48 h-20" style={{ width: '193px', height: '80px' }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-24" style={{ fontFamily: 'Poppins', fontSize: '30px', fontWeight: 'bold' }}>
            Create an Account
          </h2>
          <form className="flex flex-col items-center">
            <div className="mb-2 w-full">
              <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-8" style={{ top: '55%' }}>
                  <FontAwesomeIcon icon={faUser} className="text-gray-950" />
                </span>
                <input
                  placeholder="Full Name"
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-16 py-2 mt-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{ color: 'black', width: '431px', height: '62px', borderRadius: '10px', fontSize: '16px' }}
                />
              </div>
              {fnameerror && <p className="text-danger">{fnameerror}</p>}
            </div>
            <div className="mb-2 w-full">
              <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-8" style={{ top: '55%' }}>
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-950" />
                </span>
                <input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 py-2 mt-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{ color: 'black', width: '431px', height: '62px', borderRadius: '10px', fontSize: '16px' }}
                />
              </div>
              {emailerror && <p className="text-danger">{emailerror}</p>}
            </div>
            <div className="mb-2 w-full">
              <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-8" style={{ top: '55%' }}>
                  <FontAwesomeIcon icon={faLock} className="text-gray-950" />
                </span>
                <input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 py-2 mt-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{ color: 'black', width: '431px', height: '62px', borderRadius: '10px', fontSize: '16px' }}
                />
              </div>
              {passworderror && <p className="text-danger">{passworderror}</p>}
            </div>
            <div className="mb-4 w-full">
              <div className="relative">
                <span className="absolute top-1/2 transform -translate-y-1/2 left-8" style={{ top: '55%' }}>
                  <FontAwesomeIcon icon={faLock} className="text-gray-950" />
                </span>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-16 py-2 mt-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{ color: 'black', width: '431px', height: '62px', borderRadius: '10px', fontSize: '16px' }}
                />
              </div>
              {cpassworderror && <p className="text-danger">{cpassworderror}</p>}
            </div>
            <div className="flex flex-col  w-full" style={{ paddingLeft: '0px', marginBottom: '16px' }}>
              <button
                className="bg-[#FF8534] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleRegister}
                style={{ width: '431px', height: '62px', borderRadius: '10px', fontSize: '22px', fontWeight: '800', marginBottom: '16px', border: 'none', transition: 'background-color 500ms ease, border 500ms ease' }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#FF7148";
                  e.target.style.border = "2px solid black";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#FF8534";
                  e.target.style.border = "none";
                }}
              >
                Sign Up
              </button>
              <div className="flex items-start w-full mb-2">
                <input
                  onChange={handleTermsChange}
                  className="cursor-pointer"
                  type="checkbox"
                  id="terms"
                />
                <label htmlFor="terms" className="ml-2 cursor-pointer">
                  I agree to the <a href="/terms-and-condition" className="text-blue-800 hover:underline">terms and conditions</a>.
                </label>
                {termsError && <p className="text-danger">{termsError}</p>}
              </div>
              <p
                className="inline-block align-baseline font-bold text-sm text-black"
                style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '400' }}
              >
                Already a member?
                <Link onClick={onOpenLogin} className="text-blue-800 hover:underline">
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
