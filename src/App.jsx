import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PersonalDashboard from './pages/PersonalDashboard';
import AnalyticsPage from './pages/AnalyticsPage';
import ClientsPage from './pages/ClientListPage'; // Подставьте ваш компонент страницы с клиентами
import ProductsPage from './pages/ProductsPage'; // Подставьте ваш компонент страницы с товарами
import clients from './components/ClientDashboard/clientsData'; // Импортируем массив клиентов
import OrdersPage from './pages/OrdersPage';
import ConstructorPage from './pages/ConstructorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Перенаправление */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<PersonalDashboard />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        {/* Передайте массив clients в компонент ClientsPage */}
        <Route path="/clients" element={<ClientsPage clients={clients} />} />
        {/* Добавляем маршрут для страницы с товарами */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage/>}/>
        <Route path="/:userName/constructor" element={<ConstructorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
