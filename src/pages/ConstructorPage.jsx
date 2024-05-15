// ConstructorPage.jsx
import React from 'react';
import TemplateSelector from '../components/Constructor/TemplateSelector'; // Импортируем компонент выбора шаблона

const ConstructorPage = () => {
  return (
    <div>
      <h1>Страница конструктора</h1>
      <TemplateSelector /> {/* Добавляем компонент выбора шаблона */}
    </div>
  );
};

export default ConstructorPage;
