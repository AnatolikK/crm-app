// RegisterPage.jsx

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    // Обработка регистрации
    console.log('Выполняется регистрация...');
    // Установка флага регистрации в true
    setRegistered(true);
  };

  return (
    <div className="register-page">
      <h2>Регистрация</h2>
      <div className="register-form">
        <input type="email" placeholder="Email" className="register-input" />
        <input type="password" placeholder="Password" className="register-input" />
        <input type="password" placeholder="Confirm Password" className="register-input" />
        {/* Используем onClick вместо onSubmit */}
        <button onClick={handleRegister} className="register-button">Зарегистрироваться</button>
      </div>
      {/* Перенаправление на PersonalDashboard при успешной регистрации */}
      {registered && <Navigate to="/profile" />}
    </div>
  );
};

export default RegisterPage;
