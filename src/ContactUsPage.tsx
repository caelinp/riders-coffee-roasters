import React, { useState } from 'react';
import './ContactUsPage.css';
import productImage1 from './img/product1.jpg'
import productImage2 from './img/product2.jpg'
import productImage3 from './img/product3.jpg'

interface Product {
  name: string;
  price: number;
  roast: string;
  ground: boolean;
  quantity: number;
  image: string;
}

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState<{
    email: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
    products: Product[];
    isSubmitDisabled: boolean;
    areQuantitiesZero: boolean;
  }>({
    email: '',
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
    products: [
      { name: "Surf's Up Roast", price: 19.99, roast: 'Medium', ground: false, quantity: 0, image: productImage1},
      { name: 'Midnight Rider Roast', price: 23.99, roast: 'Medium', ground: false, quantity: 0, image: productImage2},
      { name: 'Chill Slopes Roast', price: 16.99, roast: 'Medium', ground: false, quantity: 0, image: productImage3}
      // Add more sample products as needed
    ],
    isSubmitDisabled: true,
    areQuantitiesZero: true,
  });

  const updateFormAndCheckSubmitStatus = (newFormData: typeof formData) => {
    setFormData(newFormData);

    const areRequiredFieldsEmpty =
      newFormData.email === '' ||
      newFormData.firstName === '' ||
      newFormData.lastName === '' ||
      newFormData.streetAddress === '' ||
      newFormData.city === '' ||
      newFormData.province === '' ||
      newFormData.country === '' ||
      newFormData.postalCode === '';

    const areQuantitiesZero = newFormData.products.every(product => product.quantity === 0);

    const isSubmitDisabled = areRequiredFieldsEmpty || !areQuantitiesZero;

    return { areQuantitiesZero, isSubmitDisabled };
  };

  const handleProductChange = (index: number, field: keyof Product, value: string | boolean | number) => {
    const updatedProducts = formData.products.map((product, i) => {
      if (i === index) {
        return { ...product, [field]: value };
      }
      return product;
    });

    const { areQuantitiesZero, isSubmitDisabled } = updateFormAndCheckSubmitStatus({
      ...formData,
      products: updatedProducts,
    });

    setFormData({ ...formData, products: updatedProducts, isSubmitDisabled, areQuantitiesZero });
  };

  const decreaseQuantity = (index: number) => {
    const updatedProducts = [...formData.products];
    if (updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity--;

      const { areQuantitiesZero, isSubmitDisabled } = updateFormAndCheckSubmitStatus({
        ...formData,
        products: updatedProducts,
      });

      setFormData({
        ...formData,
        products: updatedProducts,
        isSubmitDisabled,
        areQuantitiesZero,
      });
    }
  };

  const increaseQuantity = (index: number) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index].quantity++;

    const { areQuantitiesZero, isSubmitDisabled } = updateFormAndCheckSubmitStatus({
      ...formData,
      products: updatedProducts,
    });

    setFormData({
      ...formData,
      products: updatedProducts,
      isSubmitDisabled,
      areQuantitiesZero,
    });
  };

  const calculateTotal = () => {
    return formData.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  };

  return (
    <div className="contact-us-page">
      <div className="contact-us-content">
        <h1>Contact Us</h1>
        <div className="sub-section">
          <h2>Delivery Policy</h2>
          <p>We deliver to customers in Greater Vancouver every Friday.</p>
          <p>Contact us at delivery@ridercoffee.com for more information.</p>
        </div>
        <div className="sub-section">
          <h2>Business Inquiries</h2>
          <p>For business inquiries, please contact us at business@ridercoffee.com.</p>
          <p>We're excited to work with you!</p>
        </div>
        <div className="sub-section">
          <h2>Order Now</h2>
          <form>
            <div className="form-field">
              <label>Email *</label>
              <input type="email" required />
            </div>
            <div className="form-field">
              <label>First Name *</label>
              <input type="text" required />
            </div>
            <div className="form-field">
              <label>Last Name *</label>
              <input type="text" required />
            </div>
            <div className="form-field">
              <label>Street Address *</label>
              <input type="text" required />
            </div>
            <div className="form-field">
              <label>City *</label>
              <input type="text" required />
            </div>
            <div className="form-field">
              <label>Province/State *</label>
              <input type="text" required />
            </div>
            <div className="form-field">
              <label>Country *</label>
              <input type="text" required />
            </div>
            <div className="form-field">
              <label>Postal Code *</label>
              <input type="text" required />
            </div>
          </form>
          <table className="product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Roast</th>
                <th>Ground</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {formData.products.map((product, index) => (
                <tr key={index}>
                  <td className="product-cell">
                    <div className="product-image-container">
                      <img src={product.image} alt={product.name} className="product-image" />
                    </div>
                    <div className="product-info">
                      <p>{product.name}</p>
                      <p className="product-price">${product.price.toFixed(2)}</p>
                    </div>
                  </td>
                  <td>
                    <select
                      value={product.roast}
                      onChange={(e) => handleProductChange(index, 'roast', e.target.value)}
                    >
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="Dark">Dark</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={product.ground}
                      onChange={(e) => handleProductChange(index, 'ground', e.target.checked)}
                    />
                  </td>
                  <td className="quantity-cell">
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <input
                      type="number"
                      min="0"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
                    />
                    <button onClick={() => increaseQuantity(index)}>+</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-label">Total: ${calculateTotal().toFixed(2)}</p>
          <button disabled={formData.isSubmitDisabled}>Submit Order</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
