
import axios from "axios";
import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
const server_ip = process.env.LOCAL_SERVER ||  "http://localhost:5000"
 
const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
 
  const handleLogin = (data) => {
    axios
      .get(`${server_ip}/Admin?email=${data.email}&password=${data.password}`)
      .then((res) => {
        if (res.data.length > 0) {
          const admin = res.data[0];
          sessionStorage.setItem("adminId", admin.id);
          sessionStorage.setItem("adminName", admin.name);
          sessionStorage.setItem("adminEmail", admin.email);
          navigate("/adminProduct");
        } else {
          axios
            .get(`http://localhost:5000/Users?email=${data.email}&password=${data.password}`)
            .then((res) => {
              const user = res.data.find((d) => d.email === data.email);
              if (user) {
                sessionStorage.setItem("userId", user.id);
                sessionStorage.setItem("userName", user.name);
                sessionStorage.setItem("userEmail", user.email);
                navigate("/product");
              } else {
                throw new Error("User not found");
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div
      className="container-sm mt-5"
      style={{
        width: "400px",
        border: "1px solid grey",
        padding: "40px",
        borderRadius: "20px",
      }}
    >
      <h1>Login</h1>
      <br />
      <form onSubmit={handleSubmit(handleLogin)} className="mb-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", { required: true, maxLength: 20 })}
          />
          {errors.email && (
            <span className="invalid-feedback">Email error</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", { required: true, maxLength: 20 })}
          />
          {errors.password && (
            <span className="invalid-feedback">Password error</span>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p>
        New Account? <Link to="/registration">Register Here</Link>
      </p>
    </div>
  );
};
 
export default Login;
 