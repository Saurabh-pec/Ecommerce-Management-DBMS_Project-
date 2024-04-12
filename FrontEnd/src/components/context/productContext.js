import axios from "axios";
import { createContext, useEffect, useState } from "react";
 
export const ProductContext = createContext();
 
export const ProductProvider = ({ children }) => {
  const userId = sessionStorage.getItem("userId");
  const [totalCart, setTotalCart] = useState(0);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState();
  const [userCart, setUserCart] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
 
  useEffect(() => {
    axios
      .get("http://localhost:5000/Products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
 
    axios
      .get(`http://localhost:5000/Carts?userId=${userId}`)
      .then((res) => {
        setUserCart(res.data);
        setCartId(res.data[0].id);
        setCartItems(res.data[0].cartItems);
      })
      .catch((err) => console.log(err));
  }, []);
 
  useEffect(() => {
    axios.get(`http://localhost:5000/Carts?userId=${userId}`).then((res) => {
      setUserCart(res.data);
      setCartId(res.data[0].id);
      setCartItems(res.data[0].cartItems);
    });
 
    let total = 0;
    cartItems.map((item) => {
      total += item.quantity;
    });
    setTotalCart(total);
 
    if (cartItems.length > 0) {
      let total = 0;
      cartItems.map((item) => {
        total += getProductPrice(item.productId, item.quantity);
      });
      setTotalPrice(total);
    }
  }, [cartItems]);

  
  const getImage = (id) => {
    const product = products.find((item) => item.id === id);
    return product ? product.img : "Product Not Found";
}

 
  const getProductName = (id) => {
    const product = products.find((item) => item.id === id);
    return product ? product.name : "Product Not Found";
  };
 
  const getProductPrice = (id, quantity) => {
    const product = products.find((item) => item.id === id);
    return product ? product.price * quantity : "Product Not Found";
  };
 
  const handleIncrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    console.log(updatedCartItems);
   
    setCartItems(updatedCartItems);
    updateCart(updatedCartItems);
  };
 
  const handleDecrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    console.log(updatedCartItems);
    setCartItems(updatedCartItems);
    updateCart(updatedCartItems);
  };
 
  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.productId !== id);
    setCartItems(updatedCartItems);
    updateCart(updatedCartItems);
  };
 
  const updateCart = (updatedCartItems) => {
    const updated = { id: cartId, userId, cartItems: updatedCartItems };
    console.log(updated);
    axios
      .put(`http://localhost:5000/Carts/${cartId}`, updated)
      .then(() => console.log("Cart updated"))
      .catch((err) => console.log(err));
  };
 
  const handleOrder = () => {
    const order = Object.assign({}, userCart[0])
    delete order.id;
    order['cartId'] = cartId;
 
    console.log(order);
    axios
      .post("http://localhost:5000/Orders", order)
      .then(() => {
        console.log("Order Created");
 
        axios
          .delete(`http://localhost:5000/Carts/${cartId}`)
          .then(() => {
            console.log("cart deleted");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
      setCartId(null)
      setCartItems(null)
      setUserCart([])
  }
 
  return (
    <ProductContext.Provider
      value={{
        user,
        setUser,
        products,
        setProducts,
        cartItems,
        setCartItems,
        getProductName,
        getProductPrice,
        handleIncrement,
        handleDecrement,
        handleDelete,
        totalCart,
        totalPrice,
        handleOrder,
        getImage
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};


 