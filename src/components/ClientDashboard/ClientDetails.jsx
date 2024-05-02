import React from 'react';

const ClientDetails = ({ client }) => {
  return (
    <div>
      <h3>{client.name}</h3>
      <p><strong>Email:</strong> {client.email}</p>
      <p><strong>Телефон:</strong> {client.phone}</p>
      <button className="client-details-button">Подробнее</button> {/* Добавляем класс кнопке */}
    </div>
  );
};

export default ClientDetails;
