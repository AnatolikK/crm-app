import React from 'react';

const TemplateSelector = ({ onSelectTemplate }) => {
  return (
    <div>
      <button onClick={() => onSelectTemplate('template1')}>Template 1</button>
      <button onClick={() => onSelectTemplate('template2')}>Template 2</button>
    </div>
  );
};

export default TemplateSelector;
