import React, { useState, useEffect } from 'react';
import './AllProductsPage.css';
import { Link } from 'react-router-dom';

import productImage1 from './img/product1.jpg'; // Use the same image for all products
import productImage2 from './img/product2.jpg'; // Use the same image for all products
import productImage3 from './img/product3.jpg'; // Use the same image for all products

const images: string[] = [productImage1, productImage2, productImage3];

const AllProductsPage = () => {
  // Sample product data
  const products = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: `$19.99`,
    imageUrl: images[index % images.length],
  }));

  // State for the search input
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="all-products-page">
      <div className="all-products-content">
        <div className="search-header-container">
        <h1 className="all-products-header">All Products</h1>
        <div className="search-container">
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Search All Products"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        </div>
        <div className="products-container">
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <Link
                to={`/rider-coffee-roaster/sample-product`}
                key={product.id}
                className="product-link"
              >
                <div className="product-card">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image-gridview"
                  />
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{product.price}</p>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
              </Link>
            ))}
          </div>
          <div className="black-bar-bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
