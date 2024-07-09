import React, { useState }  from "react";
import wall from "../images/wall.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import UpNavbar from "../components/UpNavbar";
import { forgotPasswordApi } from "../apis/Api";

const PasswordForgot = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
  
  
    const bgImage = {
      backgroundImage: `url(${wall})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await forgotPasswordApi({ email });
        console.log(response.data); // Handle the response as needed
  
        // Check the response for success or failure
        if (response.data.success == true) {
          // Show success message or navigate to another page
          toast.success(response.data.message);
          // You can also navigate to the login page or another page
          navigate('/home');
        } else {
          // Show an error message
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        // Handle error, show an error message, etc.
      }
    };
  
    return (
      <>
        <div>
          <UpNavbar />
        </div>
        <div>
          <Navbar />
        </div>
        <>
          <div style={bgImage}></div>
          <div
            style={{
              position: "fixed",
              top: "80px",
              right: "20px",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "4px",
              }}
            >
          
              <h1
              style={{
                  color: "green",
                  fontSize: "2em",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                 Forgot Your Password
              </h1>
  
              <form style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ color: "#333", marginBottom: "5px" }}>
                  Enter the Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    padding: "10px",
                    marginBottom: "15px",
                    width: "100%",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
                
                <button
                type ="submit"
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
                  Send the link
                </button>
              </form>
              <p
                style={{ textAlign: "center", marginTop: "20px", color: "#666" }}
              >
                Remembered the Password?{" "}
                <a
                  href="/login"
                  style={{ color: "green", textDecoration: "none" }}
                >
                  Back to login
                </a>
              </p>
            </div>
          </div>
        </>
      </>
    );
  };
  
export default PasswordForgot