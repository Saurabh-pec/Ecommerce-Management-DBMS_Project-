import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import './Product.css';
import { ProductContext } from "./context/productContext";

const Product = () => {
  const userId = sessionStorage.getItem("userId");
  const { products, setCartItems } = useContext(ProductContext);
  const [search, setSearch] = useState("");

  const filterProducts = products.filter((item)=>{
    return(
      item.name.toLowerCase().includes(search.toLowerCase())||
      item.price.toString().includes(search)
    );
  })

  const handleCart = (productId) => {
    axios
      .get(`http://localhost:5000/Carts?userId=${userId}`)
      .then((res) => {
        const userCart = res.data;
       
        if (userCart.length > 0) {
          let updatedCart;
          const productIdPresent = userCart[0].cartItems.find(item => item.productId === productId);
         
          if (productIdPresent) {
            updatedCart = {
              ...userCart[0],
              cartItems: userCart[0].cartItems.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            updatedCart = {
              ...userCart[0],
              cartItems: [...userCart[0].cartItems, { productId, quantity: 1 }],
            };
          }
         
          axios
            .put(`http://localhost:5000/Carts/${userCart[0].id}`, updatedCart)
            .then(() => {
              console.log("Cart updated");
              setCartItems(updatedCart.cartItems); // Set cart items after successful update
            })
            .catch((err) => {
              console.log(err);
            });
 
        } else {
          const data = {
            userId,
            cartItems: [{ productId, quantity: 1 }],
          };
          axios
            .post("http://localhost:5000/Carts", data)
            .then(() => {
              console.log("Cart created");
              setCartItems(data.cartItems); // Set cart items after successful creation
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Dashboard</h1>
      <div
        style={{
          display: "flex",
          justifySelf: "flex-start",
          paddingTop: "20px",
          paddingLeft: "70px",
        }}
      >
        <span style={{ marginRight: "10px" }}>Search: </span>
        <input
          type="text"
          placeholder="search......."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <br/>
      <br/>
      <div className="products-container">
        {(search === ""?products:filterProducts).map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} className="product-image" />
            <div className="product-details">
              <div>ID: {product.id}</div>
              <div>NAME: {product.name}</div>
              <div>PRICE: {product.price}</div>
            </div>
            <div className="product-actions">
              <button>
                <Link to={`/productDetails/${product.id}`} style={{ textDecoration: 'none', color: '#000' }}>View Details</Link>
              </button>
              <button onClick={() => handleCart(product.id)} style={{ backgroundColor: 'orange' }}>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Product;
