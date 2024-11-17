
// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import BookListPage from './pages/BookListPage.js';
import ProfilePage from './pages/ProfilePage.js';
import ForgotPassword from "./pages/ForgotPassword.js";
import ResetPassword from "./pages/ResetPassword.js";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/books" element={<BookListPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App; 









