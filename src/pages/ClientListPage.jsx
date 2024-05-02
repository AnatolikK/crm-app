import React, { useState } from 'react';
import NavigationControlPanel from '../components/NavigationControlPanel'; // Импортируем компонент навигационной панели
import clients from '../components/ClientDashboard/clientsData'; // Импортируем массив клиентов
import ClientDetails from '../components/ClientDashboard/ClientDetails';
import '../styles/ClientListPage.css'; // Импортируем файл стилей для страницы списка клиентов

const ClientList = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const renderClientRow = (client) => (
    <tr key={client.id} onClick={() => handleClientClick(client)}>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
    </tr>
  );

  return (
    <div>
      {/* Включаем навигационную панель */}
      <NavigationControlPanel />
      <h2>Список клиентов</h2>
      <input type="text" placeholder="Поиск..." />
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Почта</th>
            <th>Телефон</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(renderClientRow)}
        </tbody>
      </table>
      {selectedClient && <ClientDetails client={selectedClient} />}
      {/* Кнопка "Подробнее" */}
      <button className="detail-button" onClick={() => console.log("Подробнее")}>Подробнее</button>
      {/* Pagination component here */}
    </div>
  );
};

export default ClientList;
