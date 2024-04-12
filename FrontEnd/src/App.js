import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Login from './components/Login';
import ProductDetails from './components/ProductDetails';
import Registeration from './components/Registeration';
import AdminProduct from './components/adminProduct';
import Cart from './components/cart';
import { ProductProvider } from './components/context/productContext'; 

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <div className="App">
          
          <Navigation />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/product" element={<Product />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/editProduct/:id" element={<EditProduct />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/registeration" element={<Registeration />} />
            <Route path="/adminProduct" element={<AdminProduct />}/>

            <Route path='/cartItems' element={<Cart />}/>
          </Routes>
        </div>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
