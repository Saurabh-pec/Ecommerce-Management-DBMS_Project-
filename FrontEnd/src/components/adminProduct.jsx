import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import "./adminProduct.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/Products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/Products/${id}`)
      .then(() => {
        alert("Product Deleted");
        // Refresh products after deletion
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
  <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Dashboard</h1>
  <div className="products-container">
    {products.map((product) => (
      <div key={product.id} className="product-card">
        <img src={product.img} alt={product.name} className="product-image" />
        <div className="product-details">
          <div>ID: {product.id}</div>
          <div>NAME: {product.name}</div>
          <div>PRICE: {product.price}</div>
        </div>
        <div className="product-actions">
          <button className="button detailsButton" style={{ backgroundColor: '#007bff', width: '100%', padding: '10px' }}>
            <Link
              to={`/productDetails/${product.id}`}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              View Details
            </Link>
          </button>
          <button className="button editButton" style={{ backgroundColor: '#28a745', width: '100%', padding: '10px' }}>
            <Link
              to={`/editProduct/${product.id}`}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Edit
            </Link>
          </button>
          <button className="button delete-button" style={{ backgroundColor: '#dc3545', width: '100%', padding: '10px' }} onClick={() => handleDelete(product.id)}>
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  
  );
};

export default Product;
