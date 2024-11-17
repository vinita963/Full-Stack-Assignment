import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPasswordClick = () => {
    navigate('/resetpassword');
  };


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/forgotpassword", { email });
      setMessage(response.data);
    } catch (error) {
      setMessage("Error: Unable to send reset link");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <div className="auth-buttons">
        <button className="auth-button reset-button" onClick={handleResetPasswordClick}>Send Reset Link</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;