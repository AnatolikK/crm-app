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
  const [products, setProducts] = useState(loadProductsFromLocalStorage); 
  const [searchTerm, setSearchTerm] = useState('');

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
    newProduct.price = `${newProduct.price} ₽`;
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
    handleCloseAddForm();
  };

  const saveProductsToLocalStorage = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
