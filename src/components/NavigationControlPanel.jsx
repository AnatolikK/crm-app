import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavigationControlPanel.css'; // Импортируем файл стилей

const NavigationControlPanel = () => {
  const location = useLocation();

  return (
    <header className="navigation-header">
      <div className="navigation-header-left">
        <Link to="/" className="exit-link">Выход</Link>
      </div>
      <div className="navigation-header-center">
        {/* Добавляем имя пользователя к ссылке на страницу конструктора */}
        <Link to={`/constructor`} className={location.pathname.includes('/constructor') ? 'active' : ''}>Конструктор</Link>
        <Link to="/orders" className={location.pathname.includes('/orders') ? 'active' : ''}>Заказы</Link>
        <Link to="/products" className={location.pathname.includes('/products') ? 'active' : ''}>Товары</Link>
        <Link to="/analytics" className={location.pathname.includes('/analytics') ? 'active' : ''}>Аналитика</Link>
        <Link to="/clients" className={location.pathname.includes('/clients') ? 'active' : ''}>Клиенты</Link>
      </div>
      <div className="navigation-header-right">
        <Link to="/profile">Личный кабинет</Link>
      </div>
    </header>
  );
};

export default NavigationControlPanel;
