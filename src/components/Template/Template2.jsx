import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerSignInForm from '../Template/CustomerSignInForm';
import CustomerSignUpForm from '../Template/CustomerSignUpForm';
import ProductList from '../Template/ProductList'; // Импортируем новый компонент
import { API_BASE_URL } from '../ApiConfig';

const Template2 = () => {
  const { alias } = useParams();
  const [styles, setStyles] = useState({ backgroundColor: '#ffffff', font: 'Arial' });
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [customerLoggedIn, setCustomerLoggedIn] = useState(false);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/website/get-style/${alias}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();

        if (response.ok && data.status === 'OK') {
          setStyles({
            backgroundColor: data.background_color,
            font: data.font,
          });
        }
      } catch (error) {
        console.error('Ошибка при получении стилей сайта:', error);
      }
    };

    fetchStyles();
  }, [alias]);

  const handleSignInSuccess = () => {
    setCustomerLoggedIn(true);
    setShowSignIn(false);
  };

  const handleSignUpSuccess = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  return (
    <div
      className="template"
      style={{ backgroundColor: styles.backgroundColor, fontFamily: styles.font }}
    >
      <h1>Шаблон сайта: {alias}</h1>
      {!customerLoggedIn && (
        <div>
          <button onClick={() => setShowSignIn(true)}>Войти</button>
          <button onClick={() => setShowSignUp(true)}>Регистрация</button>
        </div>
      )}
      {showSignIn && (
        <CustomerSignInForm alias={alias} onSuccess={handleSignInSuccess} />
      )}
      {showSignUp && (
        <CustomerSignUpForm alias={alias} onSuccess={handleSignUpSuccess} />
      )}
      {/* Выводим список товаров */}
      <ProductList alias={alias} />
    </div>
  );
};

export default Template2;
