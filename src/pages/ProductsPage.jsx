import React, { useState, useEffect } from 'react';
import NavigationControlPanel from '../components/NavigationControlPanel';
import ProductDetails from '../components/Product/ProductDetails';
import AddProductForm from '../components/Product/AddProductForm';
import '../styles/ProductsPage.css';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../components/ApiConfig';

const ProductPage = () => {
  const { alias } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userAliases, setUserAliases] = useState([]);
  const [aliasesLoaded, setAliasesLoaded] = useState(false);
  const [error, setError] = useState('');

  const fetchUserAliases = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/website/aliases`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (response.ok && data.status === 'OK') {
        setUserAliases(data.aliases);
        setAliasesLoaded(true);
      } else {
        setError(data.error || 'Неизвестная ошибка');
        setAliasesLoaded(true);
      }
    } catch (error) {
      console.error('Ошибка при получении списка alias:', error);
      setError('Ошибка при получении списка alias. Попробуйте снова позже.');
      setAliasesLoaded(true);
    }
  };

  const fetchProducts = async (alias) => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/get-by-alias/${alias}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (response.ok && data.status === 'OK') {
        setProducts(data.products);
      } else {
        console.error('Ошибка при получении списка товаров:', data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка при получении списка товаров:', error);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ alias, product_info: newProduct })
      });

      const data = await response.json();

      if (response.ok && data.status === 'OK') {
        setProducts([...products, newProduct]);
        handleCloseAddForm();
      } else {
        console.error('Ошибка при добавлении товара:', data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка при добавлении товара:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderProductRow = (product) => (
    <tr key={product.id} onClick={() => handleProductClick(product)}>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
    </tr>
  );

  useEffect(() => {
    fetchUserAliases();
  }, []);

  useEffect(() => {
    if (aliasesLoaded) {
      if (userAliases.includes(alias)) {
        fetchProducts(alias);
      } else {
        setError('У вас нет доступа к этому сайту.');
      }
    }
  }, [aliasesLoaded, alias, userAliases]);

  return (
    <div>
      <NavigationControlPanel />
      <div className="product-list-container">
        <h2>Список товаров для {alias}</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="product-details-button" onClick={handleShowAddForm}>Добавить товар</button>
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(renderProductRow)}
          </tbody>
        </table>
        {selectedProduct && (
          <div className="modal-wrapper" onClick={handleCloseProductDetails}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={handleCloseProductDetails}>&times;</span>
              <ProductDetails product={selectedProduct} />
            </div>
          </div>
        )}
        {showAddForm && (
          <div className="modal-wrapper" onClick={handleCloseAddForm}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={handleCloseAddForm}>&times;</span>
              <AddProductForm onAddProduct={handleAddProduct} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
