import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../components/ApiConfig';
import "../styles/OrdersPage.css";
import NavigationControlPanel from '../components/NavigationControlPanel';
import OrderProductsTable from '../components/Orders/OrderProductsTable';
import OrderClientData from '../components/Orders/OrderClientData';

const OrdersPage = () => {
  const [showClosedOrders, setShowClosedOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [alias, setAlias] = useState('');

  useEffect(() => {
    const fetchAlias = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/website/aliases`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();

        if (response.ok && data.status === 'OK' && data.aliases.length > 0) {
          setAlias(data.aliases[0]); // Используем первый alias из списка
        } else {
          console.error('Ошибка при получении сайтов:', data.error);
        }
      } catch (error) {
        console.error('Ошибка при получении сайтов:', error);
      }
    };

    fetchAlias();
  }, []);

  useEffect(() => {
    if (!alias) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/order/get-by-alias/${alias}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();

        if (response.ok && data.status === 'OK') {
          const ordersWithClientData = await Promise.all(data.orders.map(async (order) => {
            const clientData = await fetchClientData(order.customer_id);
            return {
              id: order.id,
              client: clientData.email, // Предполагаем, что клиентское имя - это email
              amount: calculateTotalPrice(order.order_items),
              date: order.date_time,
              status: 'active',
              products: order.order_items.map(item => ({
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.count
              })),
              clientData
            };
          }));
          setOrders(ordersWithClientData);
        } else {
          console.error('Ошибка при получении заказов:', data.error);
        }
      } catch (error) {
        console.error('Ошибка при получении заказов:', error);
      }
    };

    const fetchClientData = async (customerId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/customer/profile/${customerId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();

        if (response.ok && data.status === 'OK') {
          return {
            fullName: data.customer.fullName,
            email: data.customer.email,
            paymentMethod: data.customer.paymentMethod,
            delivery: data.customer.delivery,
            phone: data.customer.phone,
            comment: data.customer.comment
          };
        } else {
          console.error('Ошибка при получении данных клиента:', data.error);
          return {};
        }
      } catch (error) {
        console.error('Ошибка при получении данных клиента:', error);
        return {};
      }
    };

    fetchOrders();
  }, [alias]);

  const toggleShowClosedOrders = () => {
    setShowClosedOrders(!showClosedOrders);
  };

  const filteredOrders = showClosedOrders ? orders.filter(order => order.status === 'closed') : orders.filter(order => order.status === 'active');

  const handleOrderDetailsClick = (order) => {
    setSelectedOrder(order);
  };

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => total + parseFloat(product.price) * product.quantity, 0);
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
                <td>{calculateTotalPrice(order.products).toFixed(2)}</td>
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
            <p>Итого: ${calculateTotalPrice(selectedOrder.products).toFixed(2)}</p>
            <p>Всего товаров: {calculateTotalQuantity(selectedOrder.products)}</p>
            <p>Оформлен: {selectedOrder.date}</p>
            <OrderClientData clientData={selectedOrder.clientData} orderDate={selectedOrder.date} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
