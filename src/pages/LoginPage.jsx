import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/admin/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });

      const data = await response.json();

      if (response.ok && data.status === 'OK') {
        setLoggedIn(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('login', login); // Сохраняем имя пользователя в localStorage
      } else {
        setError(data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      setError('Ошибка входа. Попробуйте снова позже.');
    }
  };

  if (loggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="login-page">
      <h2>Вход</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="Логин"
          className="login-input"
          value={login}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="login-button">Войти</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <Link to="/register" className="register-link">Регистрация</Link>
    </div>
  );
};

export default LoginPage;
