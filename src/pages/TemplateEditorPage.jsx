import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const TemplateEditorPage = () => {
  const { templateId } = useParams();
  const [editedText, setEditedText] = useState(''); // Состояние для хранения отредактированного текста
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Состояние для хранения цвета фона

  // Функция для сохранения изменений
  const handleSaveChanges = () => {
    // Здесь можно добавить логику сохранения изменений на сервере или в локальном хранилище
    alert('Изменения сохранены!');
  };

  // Функция для просмотра отредактированного шаблона
  const handlePreviewTemplate = () => {
    // Создаем HTML-код шаблона с использованием отредактированного текста и цвета фона
    const templateHTML = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${templateId}</title>
          <style>
              /* Стили для страницы */
              body {
                  font-family: Arial, sans-serif;
                  background-color: ${backgroundColor};
              }
              .container {
                  max-width: 800px;
                  margin: 0 auto;
                  padding: 20px;
              }
              h1 {
                  color: #333;
              }
              /* Дополнительные стили для шаблона */
              .special {
                  color: ${templateId === 'nailmasters' ? '#ff69b4' : '#4caf50'};
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Добро пожаловать ${templateId === 'nailmasters' ? 'к мастеру по ногтям' : 'к флористу'}!</h1>
              <p>Здесь вы можете найти информацию о наших услугах и контактные данные.</p>
              <p>Текст для редактирования может быть добавлен сюда:</p>
              <p class="special">Специальная информация для ${templateId === 'nailmasters' ? 'мастера по ногтям' : 'флориста'}.</p>
              <p>${editedText}</p>
          </div>
      </body>
      </html>
    `;
    
    // Открываем новое окно или вкладку с отредактированным шаблоном
    const newWindow = window.open();
    newWindow.document.write(templateHTML);
  };

  return (
    <div>
      <h1>Редактирование шаблона {templateId}</h1>
      <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
      <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
      <button onClick={handleSaveChanges}>Сохранить изменения</button>
      <button onClick={handlePreviewTemplate}>Просмотреть отредактированный шаблон</button>
    </div>
  );
};

export default TemplateEditorPage;
