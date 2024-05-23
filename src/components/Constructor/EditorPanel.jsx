import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EditorPanel.css';

const EditorPanel = ({ selectedComponent, onChangeContent, onChangeColor, onChangeSize, onChangeFontSize, onSave, alias }) => {
  const navigate = useNavigate();

  const handleSave = () => {
    if (typeof onSave === 'function') {
      onSave();
    }
  };

  const handleNavigate = () => {
    navigate(`/${alias}`);
  };

  const handleWidthChange = (e) => {
    onChangeSize(e.target.value, selectedComponent.height);
  };

  const handleHeightChange = (e) => {
    onChangeSize(selectedComponent.width, e.target.value);
  };

  const handleFontSizeChange = (e) => {
    onChangeFontSize(e.target.value);
  };

  return (
    <div className="editor-panel">
      <h3>Редактирование компонента</h3>
      <label>
        Содержимое:
        <input
          type="text"
          value={selectedComponent.content}
          onChange={(e) => onChangeContent(e.target.value)}
        />
      </label>
      <label>
        Цвет фона:
        <input
          type="color"
          value={selectedComponent.backgroundColor}
          onChange={(e) => onChangeColor(e.target.value)}
        />
      </label>
      <label>
        Ширина:
        <input
          type="text"
          value={selectedComponent.width}
          onChange={handleWidthChange}
        />
      </label>
      <label>
        Высота:
        <input
          type="text"
          value={selectedComponent.height}
          onChange={handleHeightChange}
        />
      </label>
      <label>
        Размер текста:
        <input
          type="text"
          value={selectedComponent.fontSize}
          onChange={handleFontSizeChange}
        />
      </label>
      <div className="editor-panel-buttons">
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={handleNavigate}>Перейти</button>
      </div>
    </div>
  );
};

export default EditorPanel;
