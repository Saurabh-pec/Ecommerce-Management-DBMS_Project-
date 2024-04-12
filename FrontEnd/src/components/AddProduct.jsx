import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
 
const AddProduct = () => {
 
     const {
       register,
       handleSubmit,
     } = useForm();
 
     const navigate = useNavigate();
 
     const onSubmit = (data) => {
        axios.post("http://localhost:5000/Products", data)
          .then(() => {
            console.log(data)
            alert('added')
            navigate("/product");
          })

          
     }
 
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        
 
        <label htmlFor="id">id: </label>
        <input
          id="id"
          name="id"
          {...register("id", { required: true, maxLength: 10 })}
        />
        <br />
 
        <label htmlFor="name">name: </label>
        <input
          id="name"
          name="name"
          {...register("name", { required: true, maxLength: 20 })}
        />
        <br />
 
        <label htmlFor="price">price: </label>
        <input
          id="c"
          name="price"
          {...register("price", { required: true })}
        />
        <br />
 
        <label htmlFor="img">img: </label>
        <input
          type="file"
          id="img"
          name="img"
          {...register("img", { required: true })}
        />
        <br />
 
        <input type="submit" />
      </form>
    );
}
 
export default AddProduct;