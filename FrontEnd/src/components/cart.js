import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./context/productContext";

import "./Cart.css";

const Cart = () => {

  const{
    cartItems,
    getProductName,
    getProductPrice,
    handleDecrement,
    handleIncrement,
    handleDelete,
    totalPrice,
    getImage,
    handleOrder
  } = useContext(ProductContext);
  

  return (
    <div className="cart-container">

      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <div className="product-info">
            <div className="product-name">
              NAME: {getProductName(item.productId)}
            </div>

            <div className="product-img">
              <img src={getImage(item.productId)} alt="Product" />
            </div>

            <div className="product-price">
              PRICE: {getProductPrice(item.productId, item.quantity)}
            </div>
          </div>
          <div className="quantity-control">
            <button
              className="button"
              style={{ fontSize: "0.8em", padding: "3px 5px" }} 
              onClick={() => handleIncrement(item.productId)}
            >
              +
            </button>
            <div className="quantity">{item.quantity}</div>
            <button
              className="button"
              style={{ fontSize: "0.8em", padding: "3px 5px" }} 
              onClick={() => handleDecrement(item.productId)}
            >
              -
            </button>

            <button 
            className="button"
            style={{marginLeft:"12px", backgroundColor:"red"}}
            onClick={()=>handleDelete(item.productId)}
            >
             <div>Cancel</div>
            </button>
          </div>
        </div>
      ))}
      <div style={{ fontWeight: 'bold', marginTop: '20px', color: 'black' }}>
              <b>Total Price:</b> {totalPrice}
      </div>

      <button
      style={{marginTop:'50px'}}
      className='button'
      onClick={handleOrder}
      >
        Order
      </button>


    </div>
  );
};

export default Cart;
