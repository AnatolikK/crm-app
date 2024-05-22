import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import '../styles/ConstructorPage.css'; // Подключаем файл стилей для страницы конструктора

const ConstructorPage = () => {
  const location = useLocation();
  const [aliases, setAliases] = useState([]);
  const [newAlias, setNewAlias] = useState(''); // Состояние для хранения имени нового сайта
  const [error, setError] = useState('');

  // Функция для выполнения GET запроса к API для получения списка созданных сайтов у пользователя
  const fetchAliases = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/website/aliases', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (response.ok && data.status === 'OK') {
        setAliases(data.aliases);
      } else {
        setError(data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка при получении списка сайтов:', error);
      setError('Ошибка при получении списка сайтов. Попробуйте снова позже.');
    }
  };

  // Функция для выполнения POST запроса к API для создания нового сайта
  const createWebsite = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/website/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ alias: newAlias }) // Используем введенное имя нового сайта
      });

      const data = await response.json();

      if (response.ok && data.status === 'OK') {
        setNewAlias(''); // Сбрасываем поле ввода
        fetchAliases(); // Обновляем список сайтов после успешного создания нового сайта
      } else {
        setError(data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка при создании нового сайта:', error);
      setError('Ошибка при создании нового сайта. Попробуйте снова позже.');
    }
  };

  useEffect(() => {
    fetchAliases(); // Получаем список созданных сайтов при загрузке страницы
  }, []);

  return (
    <div className="constructor-page">
      <h2>Страница конструктора</h2>
      <div className="constructor-content">
        {aliases.length > 0 ? (
          <div>
            <h3>Список созданных сайтов:</h3>
            <ul>
              {aliases.map((alias, index) => (
                <li key={index}>{alias}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>У вас пока нет созданных сайтов</p>
        )}
        <input
          type="text"
          value={newAlias}
          onChange={(e) => setNewAlias(e.target.value)}
          placeholder="Введите имя нового сайта"
        />
        <button onClick={createWebsite}>Создать новый сайт</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <Link to={`/${localStorage.getItem('login')}/main`} className="back-link">Назад</Link>
    </div>
  );
};

export default ConstructorPage;
