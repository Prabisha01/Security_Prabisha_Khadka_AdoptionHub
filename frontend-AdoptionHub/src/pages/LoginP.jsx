import React, { useState } from "react";
import { loginUserApi } from "../apis/Api";
import mainImage from '../images/landingpage.png';
import { toast } from "react-toastify";
import {Link, useNavigate } from 'react-router-dom'; 
import UpNavbar from "../components/UpNavbar";
const Login = () => {
  const navigate = useNavigate();
  const containerStyle = {
    position: 'relative',
    minHeight: '200vh', 
  };

  const mainImageStyle = {
    position: 'absolute',
    top: '135px',
    left: '0',
    width: '1470px',
    height: '782px',
  };
  const navbarStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    backgroundColor: 'white', // White background for the header
    zIndex: '1000', // Ensure the navbar stays on top
  };




  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    const data = {
      email: email,
      password: password,
    };

    // making API Call
    // const response  = loginUserApi(data)
    // console.log(response.data)
    // if(response.data.success == false){
    //     toast.error(response.data.message)
    // } else if (response.data.success == true){
    //     toast.success(response.data.message)
    // } else {
    //     toast.error("Server Error")
    // }

    loginUserApi(data)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          // set token and user data in local storage
           // set user data
           const jsonDecode = JSON.stringify(res.data.userData);
           localStorage.setItem("user", jsonDecode);
      
          navigate('/products');

          if (res.data.userData.isAdmin){
            navigate('/admin/dashboard')
          }else{
            navigate('/products')
          }
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <div style={containerStyle}>
      <div style={navbarStyle}>
        <UpNavbar />
      </div>
      <img src={mainImage} alt="Main" style={mainImageStyle} />
    <div style={{ position: "fixed", top: "80px", right: "20px", borderRadius: "8px" }}>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "4px", }}>
            <h1 style={{ color: "green", fontSize: "2em", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>
              Welcome to NursyEase
            </h1>

            <form style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ color: "#333", marginBottom: "5px" }}>Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                style={{ padding: "10px", marginBottom: "15px", width: "100%", borderRadius: "4px", border: "1px solid #ccc" }} />
              <label style={{ color: "#333", marginBottom: "5px" }}>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                style={{ padding: "10px", marginBottom: "20px", width: "100%", borderRadius: "4px", border: "1px solid #ccc" }} />
              <button
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1em",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </form>
            <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
              New Customer?{" "}
              <a href="/signup" style={{ color: "#333", textDecoration: "none" }}>
                Create an account
              </a>
            </p>
            <p style={{ textAlign: "center", marginTop: "10px", color: "green" }}>
              <Link to ="/passwordForget" style={{ color: "green", textDecoration: "none" }}>
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
        </div>
  );
};

export default Login;
