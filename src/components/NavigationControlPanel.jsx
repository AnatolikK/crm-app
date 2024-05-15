import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavigationControlPanel.css'; // Импортируем файл стилей

const NavigationControlPanel = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');

  // Обработчик события для изменения текущей страницы и стиля ссылки при клике
  const handleLinkClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <header className="navigation-header">
      <div className="navigation-header-left">
        <Link to="/" className="exit-link">Выход</Link>
      </div>
      <div className="navigation-header-center">
        <Link to="/constructor" onClick={() => handleLinkClick('Dashboard')} className={currentPage === 'Dashboard' ? 'active' : ''}>Конструктор</Link>
        <Link to="/orders" onClick={() => handleLinkClick('Orders')} className={currentPage === 'Orders' ? 'active' : ''}>Заказы</Link>
        <Link to="/products" onClick={() => handleLinkClick('Products')} className={currentPage === 'Products' ? 'active' : ''}>Товары</Link>
        <Link to="/analytics" onClick={() => handleLinkClick('Analytics')} className={currentPage === 'Analytics' ? 'active' : ''}>Аналитика</Link>
        <Link to="/clients" onClick={() => handleLinkClick('Clients')} className={currentPage === 'Clients' ? 'active' : ''}>Клиенты</Link>
      </div>
      <div className="navigation-header-right">
        <Link to="/profile">Личный кабинет</Link>
      </div>
    </header>
  );
};

export default NavigationControlPanel;
