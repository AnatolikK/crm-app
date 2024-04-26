// LoginPage.jsx

import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Обработка входа
    console.log('Выполняется вход...');
    // Установка флага входа в true
    setLoggedIn(true);
  };

  return (
    <div className="login-page">
      <h2>Вход</h2>
      <div className="login-form">
        <input type="email" placeholder="Email" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        {/* Используем onClick вместо onSubmit */}
        <button onClick={handleLogin} className="login-button">Войти</button>
      </div>
      {/* Ссылка для перехода на страницу регистрации */}
      <Link to="/register" className="register-link">Регистрация</Link>
      {/* Перенаправление на PersonalDashboard при входе */}
      {loggedIn && <Navigate to="/profile" />}
    </div>
  );
};

export default LoginPage;
