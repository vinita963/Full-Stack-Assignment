
// frontend/src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="homepage">
      <header className="header">
        <h1>Welcome to the Book Exchange Platform</h1>
        <p>Your destination to list, search, and exchange books with others.</p>
        <div className="auth-buttons">
          <button className="auth-button login-button" onClick={handleLoginClick}>Login</button>
          <button className="auth-button register-button" onClick={handleRegisterClick}>Register</button>
        </div>
      </header>

      <section className="featured-books">
        <h2>Featured Books</h2>
        <div className="book-list">
          <div className="book-item">Book 1</div>
          <div className="book-item">Book 2</div>
          <div className="book-item">Book 3</div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <p>Discover how easy it is to exchange books on our platform:</p>
        <ol>
          <li>List the books you want to share or exchange.</li>
          <li>Browse books offered by other members.</li>
          <li>Connect and arrange exchanges.</li>
        </ol>
      </section>
    </div>
  );
}

export default HomePage;


