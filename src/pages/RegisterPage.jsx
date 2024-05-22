import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const [registered, setRegistered] = useState(false);
  const [login, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/admin/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });

      const data = await response.json();

      if (response.ok && data.status === 'OK') {
        setRegistered(true);
        localStorage.setItem('token', data.token);
      } else {
        setError(data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setError('Ошибка регистрации. Попробуйте снова позже.');
    }
  };

  if (registered) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="register-page">
      <h2>Регистрация</h2>
      <div className="register-form">
        <input
          type="text"
          placeholder="Логин"
          className="register-input"
          value={login}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister} className="register-button">Зарегистрироваться</button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default RegisterPage;
