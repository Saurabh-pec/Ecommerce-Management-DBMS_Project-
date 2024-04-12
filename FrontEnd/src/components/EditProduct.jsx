import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setValue("id", product.id);
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("img", product.img);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/Products/${id}`, data);
      alert("Product updated successfully");
      navigate("/product");
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-product-form">
        <label htmlFor="id">ID:</label>
        <input
          id="id"
          name="id"
          type="text"
          {...register("id", { required: true, maxLength: 10 })}
        />
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          {...register("name", { required: true, maxLength: 20 })}
        />
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          name="price"
          type="text"
          {...register("price", { required: true })}
        />
        <label htmlFor="img">Image:</label>
        <input
          id="img"
          name="img"
          type="text"
          {...register("img", { required: true })}
        />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default EditProduct;
