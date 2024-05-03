import React from 'react';

const ClientDetails = ({ client, onClose }) => {
  return (
    <div>
      <h3>{client.name}</h3>
      <p><strong>Email:</strong> {client.email}</p>
      <p><strong>Телефон:</strong> {client.phone}</p>
      <button className="client-details-button" onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default ClientDetails;
