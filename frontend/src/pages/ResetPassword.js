import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams(); // Retrieve token from URL parameters

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/auth/resetpassword/${token}`, { newPassword });
      setMessage(response.data);
    } catch (error) {
      setMessage("Error: Unable to reset password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
