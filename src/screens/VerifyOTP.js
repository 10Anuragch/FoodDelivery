
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("signupEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return alert("Enter OTP");

    const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });

    const json = await response.json();
    if (json.success) {
      alert("Email verified! You can now login.");
      localStorage.removeItem("signupEmail");
      navigate("/login");
    } else alert(json.error || "OTP verification failed");
  };

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg")', backgroundSize: "cover", height: "100vh" }}>
      <Navbar />
      <div className="container">
        <form className="w-50 m-auto mt-5 border bg-dark border-success rounded p-4" onSubmit={handleSubmit}>
          <h4 className="text-center text-white">Verify Your Email</h4>
          <div className="m-3">
            <label>OTP</label>
            <input type="text" className="form-control" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP sent to email" required />
          </div>
          <div className="d-flex m-3 justify-content-center">
            <button type="submit" className="btn btn-success">Verify</button>
          </div>
        </form>
      </div>
      <Footer />  
    </div>
  );
}
