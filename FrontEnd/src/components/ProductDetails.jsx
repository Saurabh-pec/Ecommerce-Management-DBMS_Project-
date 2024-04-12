
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
 
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
 
  useEffect(() => {
    axios
      .get(`http://localhost:5000/Products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
 
  return (
    <>

    <div className="container mt-5" style={{width: '300px'}}>
      {product ? (
        <div className="card border-primary" style={{display: 'flex', flexDirection: 'column'}}>
          <div>
            <img
              src={product.img}
              className="card-img-top"
              alt={product.name}
              style={{
                maxHeight: "300px",
                maxWidth: "300px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">Price: ${product.price}</p>
            <p className="card-text">Description: {product.description}</p>
            <p className="card-text">Category: {product.category}</p>
            <p className="card-text">Manufacturer: {product.manufacturer}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    
    </div>
    </>
  );
};
 
export default ProductDetails;
 

