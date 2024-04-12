
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './Registeration.css'; 


 
const Registeration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);
 
  const onSubmit = (data) => {
    if (data.confirm_password === data.password) {
      delete data.confirm_password;
 
      axios
        .post("http://localhost:5000/Users", data)
        .then(() => {
          alert("User added successfully");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
 
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };
 
  const handleConfirmPasswordChange = (e) => {
    if (e.target.value === "") {
      setPasswordError(false);
    } else if (e.target.value !== document.getElementById("password").value) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
 
  return (
    <div
      className="container mt-5"
      style={{
        width: "400px",
        border: "1px solid grey",
        padding: "40px",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Registration</h2>
 
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                {...register("name", { required: true, maxLength: 20 })}
              />
              {errors.name && (
                <div className="invalid-feedback">Name is required.</div>
              )}
            </div>
 
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <div className="invalid-feedback">Email is required.</div>
              )}
            </div>
 
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password", { required: true, maxLength: 20 })}
              />
              {errors.password && (
                <div className="invalid-feedback">Password is required.</div>
              )}
            </div>
 
            <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirm_password"
                className={`form-control ${
                  errors.confirm_password || passwordError ? "is-invalid" : ""
                }`}
                {...register("confirm_password", {
                  required: true,
                  maxLength: 20,
                })}
                onChange={handleConfirmPasswordChange}
              />
              {errors.confirm_password && (
                <div className="invalid-feedback">
                  Confirmation is required.
                </div>
              )}
              {passwordError && (
                <div className="invalid-feedback">Passwords do not match.</div>
              )}
            </div>
 
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default Registeration;