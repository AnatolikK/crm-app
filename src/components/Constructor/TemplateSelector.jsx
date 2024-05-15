import React from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateSelector = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId) => {
    // Перенаправляем пользователя на страницу редактора выбранного шаблона
    navigate(`/editor/${templateId}`);
  };

  return (
    <div>
      <h2>Выберите шаблон страницы:</h2>
      <ul>
        <li>
          <button onClick={() => handleTemplateSelect('nailmasters')}>
            Мастер по ногтям
          </button>
        </li>
        <li>
          <button onClick={() => handleTemplateSelect('florist')}>
            Флорист
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TemplateSelector;
