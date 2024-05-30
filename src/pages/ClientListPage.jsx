import React, { useState } from 'react';
import NavigationControlPanel from '../components/NavigationControlPanel';
import clients from '../components/ClientDashboard/clientsData';
import ClientDetails from '../components/ClientDashboard/ClientDetails';
import '../styles/ClientListPage.css';

const ClientList = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const handleCloseClientDetails = () => {
    setSelectedClient(null);
  };

  const renderClientRow = (client) => (
    <tr key={client.id} onClick={() => handleClientClick(client)}>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
    </tr>
  );

  // Фильтрация клиентов по поисковому запросу
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  return (
    <div>
      <NavigationControlPanel />
      <div className="client-list-container">
        <h2>Список клиентов</h2>
        <input 
          type="text" 
          placeholder="Поиск..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="client-table">
          <thead>
            <tr>
              <th>Клиент</th>
              <th>Почта</th>
              <th>Телефон</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(renderClientRow)}
          </tbody>
        </table>
        {selectedClient && (
          <div className="modal-wrapper" onClick={handleCloseClientDetails}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={handleCloseClientDetails}>&times;</span>
              <ClientDetails client={selectedClient} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientList;
