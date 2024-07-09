import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordApi } from "../apis/Api";
import wall from "../images/wall.jpg";
import Navbar from "../components/Navbar";
import UpNavbar from "../components/UpNavbar";

const NewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const bgImage = {
    backgroundImage: `url(${wall})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "81vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // const token = new URLSearchParams(window.location.search).get("token");
      console.log(token, "forgot pass");
      const data = {
        password: password,
      };
      const response = await resetPasswordApi(token, data);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
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
              Change Your Password
            </h1>

            <form style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ color: "#333", marginBottom: "5px" }}>
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your new password"
                style={{
                  padding: "10px",
                  marginBottom: "20px",
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <label style={{ color: "#333", marginBottom: "5px" }}>
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Re-Enter your new password"
                style={{
                  padding: "10px",
                  marginBottom: "20px",
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
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
                Submit
              </button>
            </form>
            <p
              style={{ textAlign: "center", marginTop: "20px", color: "#666" }}
            >
              Know the Password?{" "}
              <a
                href="/login"
                style={{ color: "#333", textDecoration: "none" }}
              >
                Back to Login
              </a>
            </p>
          </div>
        </div>
      </>
    </>
  );
};

export default NewPassword;
