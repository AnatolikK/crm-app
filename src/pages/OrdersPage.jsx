import React, { useState } from 'react';
import "../styles/OrdersPage.css";
import NavigationControlPanel from '../components/NavigationControlPanel';
import OrderProductsTable from '../components/Orders/OrderProductsTable';
import OrderClientData from '../components/Orders/OrderClientData';

const OrdersPage = () => {
  const [showClosedOrders, setShowClosedOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const toggleShowClosedOrders = () => {
    setShowClosedOrders(!showClosedOrders);
  };

  const orders = [
    { 
      id: 1, 
      client: 'Иванов', 
      amount: '$100', 
      date: '01.04.2024', 
      status: 'active', 
      products: [
        { id: 1, name: 'Ноутбук', price: '$1000', quantity: 1 },
        { id: 2, name: 'Мышка', price: '$20', quantity: 2 }
      ], 
      clientData: {
        fullName: 'Иванов Иван Иванович',
        email: 'ivanov@example.com',
        paymentMethod: 'Кредитная карта',
        delivery: 'Курьерская доставка',
        phone: '+1234567890',
        comment: 'Безопасная упаковка необходима'
      } 
    },
    { 
      id: 2, 
      client: 'Петров', 
      amount: '$150', 
      date: '02.04.2024', 
      status: 'closed', 
      products: [
        { id: 3, name: 'Фотоаппарат', price: '$800', quantity: 1 },
        { id: 4, name: 'Фотоальбом', price: '$15', quantity: 3 }
      ], 
      clientData: {
        fullName: 'Петров Петр Петрович',
        email: 'petrov@example.com',
        paymentMethod: 'Наличные',
        delivery: 'Почтовая доставка',
        phone: '+0987654321',
        comment: 'Подарочная упаковка не нужна'
      } 
    },
    // Добавьте остальные заказы по аналогии
  ];

  const filteredOrders = showClosedOrders ? orders.filter(order => order.status === 'closed') : orders.filter(order => order.status === 'active');

  const handleOrderDetailsClick = (order) => {
    setSelectedOrder(order);
  };

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => total + parseInt(product.price.replace('$', ''), 10) * product.quantity, 0);
  };

  const calculateTotalQuantity = (products) => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <div>
      <NavigationControlPanel />
      <div className="orders-page">
        <h2>Заказы</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Заказ (№)</th>
              <th>Клиент</th>
              <th>Сумма</th>
              <th>Оформлен</th>
              <th>
                <button onClick={toggleShowClosedOrders}>
                  {showClosedOrders ? 'Показать активные заказы' : 'Показать закрытые заказы'}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client}</td>
                <td>{calculateTotalPrice(order.products)}</td>
                <td>{order.date}</td>
                <td>
                  <button onClick={() => handleOrderDetailsClick(order)}>Подробнее</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
      <div className="modal-wrapper" onClick={() => setSelectedOrder(null)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={() => setSelectedOrder(null)}>&times;</span>
          <h2>Заказ номер: {selectedOrder.id}</h2>
          <OrderProductsTable products={selectedOrder.products} />
          <p>Итого: ${calculateTotalPrice(selectedOrder.products)}</p>
          <p>Всего товаров: {calculateTotalQuantity(selectedOrder.products)}</p>
          <p>Оформлен: {selectedOrder.date}</p>
          <OrderClientData clientData={selectedOrder.clientData} />
        </div>
      </div>
      )}

    </div>
  );
};

export default OrdersPage;
