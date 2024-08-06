import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footers from "./components/Footers";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AdminPanel from "./pages/admin/AdminPanel";
import Adopt from "./pages/Adopt";
import AllEvents from "./pages/AllEvents";
import Faq from "./pages/Faq";
import LandingPage from "./pages/LandingPage";
import LoginModal from "./pages/Login";
import NewPassword from "./pages/NewPassword";
import PasswordForgot from "./pages/PasswordForgot";
import UpdatedPasswords from "./pages/PasswordNew";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import TermsAndConditions from "./pages/Terms";
import MyCart from "./pages/user/MyCart";
import MyOrders from "./pages/user/MyOrders";
import MyPetRequests from "./pages/user/MyPetRequest";
import PaymentPage from "./pages/user/PaymentPage";
import Profile from "./pages/user/Profile";
import WhyDonate from "./pages/WhyDonate";
import Donate from "./pages/user/Donate";
import VaccinatedPet from "./pages/user/VaccinatedPet";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
      <ToastContainer />
      {user?.isAdmin ? null : <Navbar />}

      <Routes>
        <Route path="/admin-dashboard" element={<AdminPanel />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/my-cart" element={<MyCart />} />
        <Route path="/terms-and-condition" element={<TermsAndConditions />} />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<AllEvents />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/pet-req/:id" element={<MyPetRequests />} />
        <Route path="/my-orders/:id" element={<MyOrders />} />
        <Route path="/reset_password/:token" element={<NewPassword />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentCancel />} />
        <Route path="/products" element={<Products />} />
        <Route path="/vaccinated" element={<VaccinatedPet />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/changePassword/:id" element={<UpdatedPasswords />} />
        <Route path="/passwordForget" element={<PasswordForgot />} />
        <Route path="/why-donate" element={<WhyDonate />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
      {user?.isAdmin ? null : <Footers />}
    </Router>
  );
}

export default App;