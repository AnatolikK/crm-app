import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditorPanel from './EditorPanel';
import { API_BASE_URL } from '../ApiConfig';

const ConstructorTemplate = () => {
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

  const handleSaveStyles = async (styleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/website/set-style`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(styleData)
      });

      const data = await response.json();

      if (response.ok && data.status === 'OK') {
        setStyles({
          backgroundColor: styleData.background_color,
          font: styleData.font,
        });
      }
    } catch (error) {
      console.error('Ошибка при сохранении стилей сайта:', error);
    }
  };

  return (
    <div
      className="template"
      style={{ backgroundColor: styles.backgroundColor, fontFamily: styles.font }}
    >
      <h1>Конструктор сайта: {alias}</h1>
      <EditorPanel alias={alias} onSave={handleSaveStyles} />
    </div>
  );
};

export default ConstructorTemplate;
