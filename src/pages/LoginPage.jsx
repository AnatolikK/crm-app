// import React, { useState } from 'react';
// import { Link, Navigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [error, setError] = useState(null);

//   const handleLogin = async () => {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
  
//     try {
//       // Отправляем запрос на сервер для входа
//       const response = await fetch('http://localhost:8082/api/admin/sign-in', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });
  
//       if (response.ok) {
//         // Вход выполнен успешно
//         setLoggedIn(true);
//       } else {
//         // Обработка ошибки входа
//         const data = await response.json();
//         if (data && data.message) {
//           setError(data.message);
//         } else {
//           setError('Произошла ошибка при входе');
//         }
//       }
//     } catch (error) {
//       console.error('Ошибка при входе:', error);
//       setError('Произошла ошибка при входе');
//     }
//   };
  


//   return (
//     <div className="login-page">
//       <h2>Вход</h2>
//       <div className="login-form">
//         <input type="email" id="email" placeholder="Email" className="login-input" />
//         <input type="password" id="password" placeholder="Password" className="login-input" />
//         {/* Отображение ошибки, если есть */}
//         {error && <p>{error}</p>}
//         <button onClick={handleLogin} className="login-button">Войти</button>
//       </div>
//       {/* Ссылка для перехода на страницу регистрации */}
//       <Link to="/register" className="register-link">Регистрация</Link>
//       {/* Перенаправление на PersonalDashboard при входе */}
//       {loggedIn && <Navigate to="/profile" />}
//     </div>
//   );
// };

// export default LoginPage;


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