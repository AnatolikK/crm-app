// ProductPage.js
import React, { useState } from 'react';
import NavigationControlPanel from '../components/NavigationControlPanel';
import productsData from '../components/Product/productsData'; 
import ProductDetails from '../components/Product/ProductDetails'; 
import AddProductForm from '../components/Product/AddProductForm'; 
import '../styles/ProductsPage.css'; 

const loadProductsFromLocalStorage = () => {
  const storedProducts = localStorage.getItem('products');
  return storedProducts ? JSON.parse(storedProducts) : productsData;
};

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [showAddForm, setShowAddForm] = useState(false); 
  const [products, setProducts] = useState(loadProductsFromLocalStorage); // Используем функцию для загрузки из localStorage

  // Функция для сохранения массива товаров в localStorage
  const saveProductsToLocalStorage = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
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

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts); // Сохраняем обновленный массив в localStorage
  };

  const renderProductRow = (product) => (
    <tr key={product.id} onClick={() => handleProductClick(product)}>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
    </tr>
  );

  return (
    <div>
      <NavigationControlPanel />
      <div className="product-list-container">
        <h2>Список товаров</h2>
        <button onClick={handleShowAddForm}>Добавить товар</button>
        <table className="product-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {products.map(renderProductRow)}
          </tbody>
        </table>
        {selectedProduct && <ProductDetails product={selectedProduct} onClose={handleCloseProductDetails} />}
        {showAddForm && <AddProductForm onAddProduct={handleAddProduct} onClose={handleCloseAddForm} />}
      </div>
    </div>
  );
};

export default ProductPage;
