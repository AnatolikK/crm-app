import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TemplateSelector = () => {
  const navigate = useNavigate();
  const { alias } = useParams();

  const handleSelectTemplate = (template) => {
    navigate(`/${alias}/${template}`);
  };

  return (
    <div>
      <h2>Выберите шаблон для сайта: {alias}</h2>
      <button onClick={() => handleSelectTemplate('template1')}>Template 1</button>
      <button onClick={() => handleSelectTemplate('template2')}>Template 2</button>
    </div>
  );
};

export default TemplateSelector;
