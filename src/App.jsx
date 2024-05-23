import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PersonalDashboard from './pages/PersonalDashboard';
import AnalyticsPage from './pages/AnalyticsPage';
import ClientsPage from './pages/ClientListPage';
import ProductsPage from './pages/ProductsPage';
import clients from './components/ClientDashboard/clientsData';
import OrdersPage from './pages/OrdersPage';
import ConstructorPage from './pages/ConstructorPage';
import TemplateSelector from './components/Constructor/TemplateSelector';
import Template1 from './components/Template/Template1';
import Template2 from './components/Template/Template2';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<PersonalDashboard />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/clients" element={<ClientsPage clients={clients} />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/constructor" element={<ConstructorPage />} />
        <Route path="/:alias/editor" element={<TemplateSelector />} />
        <Route path="/:alias/template1" element={<Template1 />} />
        <Route path="/:alias/template2" element={<Template2 />} />
        
      </Routes>
    </Router>
  );
};

export default App;
