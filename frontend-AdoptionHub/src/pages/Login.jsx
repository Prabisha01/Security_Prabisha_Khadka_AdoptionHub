import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { loginUserApi } from "../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const LoginModal = ({ isOpen, onClose, onOpenSignup }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);

  const validate = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    }

    if (email.trim() !== "" && !email.includes("@")) {
      setEmailError("Invalid email");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const loginNow = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const loginData = {
      email: email,
      password: password,
      captcha: captcha,
    };
    loginUserApi(loginData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
          if (res.data.message.includes("captcha")) {
            setShowCaptcha(true);
          } else {
            setCaptcha(null);
          }
        } else {
          toast.success(res.data.message);
          const jsonDecode = JSON.stringify(res.data.userData);
          localStorage.setItem("user", jsonDecode);
          localStorage.setItem("token", res.data.token);
          onClose();
          navigate("/");
          if (res.data.userData.isAdmin === false) {
            navigate("/");
          } else {
            navigate("/admin-dashboard");
            window.location.reload();
          }
        }
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg p-8 border border-gray-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 text-xl md:text-2xl"
        >
          &times;
        </button>
        <div className="text-center mb-6">
          <img
            src="assets/logo/logo.png"
            alt="AdoptionHub"
            className="w-28 md:w-36 mx-auto"
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to <span className="text-orange-500">Adoption</span>
          <span style={{ color: "#004AAD" }}>Hub</span>
        </h2>
        <form>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute top-1/2 transform -translate-y-1/2 left-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
              </span>
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 py-2 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
          </div>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute top-1/2 transform -translate-y-1/2 left-4">
                <FontAwesomeIcon icon={faLock} className="text-gray-500" />
              </span>
              <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full pl-12 py-2 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
          </div>
          {showCaptcha && (
            <div className="mb-4">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={(value) => setCaptcha(value)}
                onExpired={() => setCaptcha(null)}
              />
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <a
              href="/passwordForget"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="bg-gradient-to-r from-orange-400 to-orange-500 w-full text-white font-bold py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
              type="button"
              onClick={loginNow}
            >
              Login
            </button>
            <p className="text-sm text-gray-600 mt-4">
              Not a member?{" "}
              <Link
                onClick={onOpenSignup}
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
