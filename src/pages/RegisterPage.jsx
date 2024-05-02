// import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';

// const RegisterPage = () => {
//   const [registered, setRegistered] = useState(false);
//   const [error, setError] = useState(null);

//   const handleRegister = async () => {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     try {
//         // Отправляем запрос на сервер для регистрации
//         const response = await fetch('http://localhost:8082/api/admin/sign-up', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username, password, confirmPassword })
//         });

//         if (response.ok) {
//             // Регистрация выполнена успешно
//             setRegistered(true);
//         } else {
//             // Обработка ошибки регистрации
//             const data = await response.json();
//             setError(data.message);
//         }
//     } catch (error) {
//         console.error('Ошибка при регистрации:', error);
//     }
// };

//   return (
//     <div className="register-page">
//       <h2>Регистрация</h2>
//       <div className="register-form">
//         <input type="email" id="email" placeholder="Email" className="register-input" />
//         <input type="password" id="password" placeholder="Password" className="register-input" />
//         <input type="password" id="confirmPassword" placeholder="Confirm Password" className="register-input" />
//         {/* Отображение ошибки, если есть */}
//         {error && <p>{error}</p>}
//         <button onClick={handleRegister} className="register-button">Зарегистрироваться</button>
//       </div>
//       {/* Перенаправление на PersonalDashboard при успешной регистрации */}
//       {registered && <Navigate to="/profile" />}
//     </div>
//   );
// };

// export default RegisterPage;


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