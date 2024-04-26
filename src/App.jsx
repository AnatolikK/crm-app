import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import LoginPage from './pages/LoginPage'; // Импортируем компонент LoginPage
import RegisterPage from './pages/RegisterPage'; // Импортируем RegisterPage
import PersonalDashboard from './pages/PersonalDashboard'; // Импортируем PersonalDashboard

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Перенаправление */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<LoginPage />} /> {/* Добавляем маршрут для страницы входа */}
        <Route path="/register" element={<RegisterPage />} /> {/* Добавляем маршрут для страницы регистрации */}
        <Route path="/profile" element={<PersonalDashboard />} /> {/* Добавляем маршрут для страницы личного кабинета */}
      </Routes>
    </Router>
  );
};

export default App;
