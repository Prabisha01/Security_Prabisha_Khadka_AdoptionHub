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
    <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm">
      <div
        className="bg-white rounded-lg shadow-lg flex border border-black"
        style={{ width: "1102px", height: "711px", borderRadius: "25px" }}
      >
        <div className="w-2/2 p-4">
          <img
            src="assets/images/login.png"
            alt="Adopt Me"
            className="h-full w-full object-cover rounded-l-lg"
            style={{ borderRadius: "40px" }}
          />
        </div>
        <div className="w-1/2 p-6 relative">
          <button
            onClick={onClose}
            className="absolute"
            style={{
              top: "29px",
              right: "27px",
              fontSize: "3.2rem",
              color: "black",
            }}
          >
            &times;
          </button>
          <div className="mb-5 absolute" style={{ top: "80px", left: "10px" }}>
            <img
              src="assets/logo/logo.png"
              alt="AdoptionHub"
              className="w-48 h-20 bg-white p-2"
              style={{ width: "193px", height: "95px" }}
            />
          </div>
          <h2
            className="text-2xl font-bold text-gray-800 mb-4"
            style={{
              fontFamily: "Poppins",
              fontSize: "30px",
              fontWeight: "bold",
              marginTop: "175px",
            }}
          >
            Welcome to <span className="text-orange-500">Adoption</span>
            <span style={{ color: "#004AAD" }}>Hub</span>{" "}
            <span style={{ color: "#004AAD" }}>!!</span>
          </h2>
          <form>
            <div className="mb-4">
              <div className="relative">
                <span
                  className="absolute top-1/2 transform -translate-y-1/2 left-8"
                  style={{ top: "55%" }}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-950"
                  />
                </span>
                <input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 py-2 mt-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    color: "black",
                    width: "431px",
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </div>
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>
            <div className="mb-4">
              <div className="relative">
                <span
                  className="absolute top-1/2 transform -translate-y-1/2 left-8"
                  style={{ top: "55%" }}
                >
                  <FontAwesomeIcon icon={faLock} className="text-gray-950" />
                </span>
                <input
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full pl-16 py-2 mt-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                  style={{
                    color: "black",
                    width: "431px",
                    height: "62px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </div>
              {passwordError && <p className="text-danger">{passwordError}</p>}
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
                className="inline-block align-baseline font-bold text-sm text-black hover:text-[#004AAD] hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <div className="flex flex-col items-start gap-3">
              <button
                className="bg-[#FF8534] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-black border"
                type="button"
                onClick={loginNow}
                style={{
                  width: "431px",
                  height: "62px",
                  borderRadius: "10px",
                  fontSize: "22px",
                  fontWeight: "800",
                  transition: "background-color 500ms ease, border 500ms ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#FF7148";
                  e.target.style.border = "2px solid black";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#FF8534";
                  e.target.style.border = "none";
                }}
              >
                Login
              </button>
              <p
                className="inline-block align-baseline font-bold text-sm text-black"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Not a member?
                <Link
                  onClick={onOpenSignup}
                  className="text-blue-800 hover:underline"
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
