// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Подключаем стили

const Header = () => {
    const handleLoginClick = () => {
        window.location.href = '/login'; // Переходим на страницу входа по URL
    };

  return (
    <header className="header">
        <div className="logo">
            <Link to="/">CRM App</Link>
        </div>
        <nav className="nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
        <div className="login-container">
            {/* Вызываем функцию handleLoginClick при клике на кнопку "Войти" */}
            <button className="login-button" onClick={handleLoginClick}>Войти</button>
        </div>
    </header>
  );
};

export default Header;
