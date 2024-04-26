import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavigationControlPanel.css'; // Импортируем файл стилей

const NavigationControlPanel = () => {
  return (
    <header className="navigation-header">
      <div className="navigation-header-left">
        <Link to="/" className="exit-link">Выход</Link>
      </div>
      <div className="navigation-header-center">
        <Link to="/dashboard">Конструктор</Link>
        <Link to="/orders">Заказы</Link>
        <Link to="/products">Товары</Link>
        <Link to="/analytics">Аналитика</Link>
        <Link to="/clients">Клиенты</Link>
      </div>
      <div className="navigation-header-right">
        <Link to="/profile">Личный кабинет</Link>
      </div>
    </header>
  );
};

export default NavigationControlPanel;
