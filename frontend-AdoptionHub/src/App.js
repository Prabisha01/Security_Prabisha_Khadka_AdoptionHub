import { Footer } from "flowbite-react";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AdminPanel from "./pages/admin/AdminPanel";
import Adopt from "./pages/Adopt";
import Faq from "./pages/Faq";
import LandingPage from "./pages/LandingPage";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import TermsAndConditions from "./pages/Terms";
import Profile from "./pages/user/Profile";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
      <ToastContainer />
      {user?.isAdmin ? null : <Navbar />}

      <Routes>
        <Route path="/admin-dashboard" element={<AdminPanel />} />

        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms-and-condition" element={<TermsAndConditions />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details" element={<ProductDetails />} />
      </Routes>
      {user?.isAdmin ? null : <Footer />}
    </Router>
  );
}

export default App;
