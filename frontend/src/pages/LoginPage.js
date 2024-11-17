
// frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    navigate('/forgotpassword');
  };


  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // Validate form data
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    // Simulate login process
    console.log("Login form submitted with email:", email);
    // Here, you would submit the form data to the backend for login
  };

  return (
    <div className="login-page">
      <h2>Log In to Your Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="auth-buttons">
      <button className="auth button forgotpassword" onClick={handleForgotPasswordClick}>Forgot your password? Click here</button>
      </div>
    </div>
  );
}

export default LoginPage;




