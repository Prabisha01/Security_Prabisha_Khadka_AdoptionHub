import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../apis/Api";

const LoginModal = ({ isOpen, onClose, onOpenSignup }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailerror, setEmailError] = useState("");
  const [passworderror, setPasswordError] = useState("");

  const Validate = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
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
    return isValid;
  };

  const loginNow = (e) => {
    e.preventDefault();
    const isValid = Validate();
    if (!isValid) return;

    const loginData = new FormData();
    loginData.append("email", email);
    loginData.append("password", password);
    loginUserApi(loginData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.userData);
          const jsonDecode = JSON.stringify(res.data.userData);
          localStorage.setItem("user", jsonDecode);
          const userr = res.data.userData;
          onClose();
          navigate("/");
          if (userr.isAdmin === false) {
            navigate("/");
            return;
          } else {
            navigate("/admin-dashboard");
            window.location.reload();
            return;
          }
        }
      })
      .catch((err) => {
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
            className="h-full w-[600px] object-cover rounded-l-lg"
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
            Welcome to <span className="text-orange-500">AdoptionHub</span> !!
          </h2>
          <form>
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
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                />
              </div>
              {passworderror && <p className="text-danger">{passworderror}</p>}
            </div>
            <div className="flex items-center justify-between mb-4">
              <a
                href="#"
                className="inline-block align-baseline font-bold text-sm text-black hover:text-orange-800"
              >
                Forgot Password?
              </a>
            </div>
            <div className="flex flex-col items-start gap-3">
              <button
                className="bg-orange-500 w-full hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={loginNow}
              >
                Login
              </button>
              <p
                href="#"
                className="inline-block align-baseline font-bold text-sm text-black"
              >
                Not a member?
                <Link
                  onClick={onOpenSignup}
                  className="text-blue-800 underline"
                >
                  {" "}
                  Sign Up{" "}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
