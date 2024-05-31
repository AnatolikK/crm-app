import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../ApiConfig';

const Template2 = () => {
  const { alias } = useParams();
  const [styles, setStyles] = useState({ backgroundColor: '#ffffff', font: 'Arial' });

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

  return (
    <div
      className="template"
      style={{ backgroundColor: styles.backgroundColor, fontFamily: styles.font }}
    >
      <h1>Шаблон сайта: {alias}</h1>
      {/* Контент сайта */}
    </div>
  );
};

export default Template2;
