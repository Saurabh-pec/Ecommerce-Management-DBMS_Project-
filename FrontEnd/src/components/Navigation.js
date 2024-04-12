import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();


  const [isLoggedAdmin, setIsLoggedAdmin] = useState(false);
 
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate('/');
  }
 
  useEffect(() => {
    if (sessionStorage.getItem("userId")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [sessionStorage.getItem("userId")]);

  useEffect(()=>{
    if(sessionStorage.getItem("admitId")){
        setIsLoggedAdmin(true);

    }
    else{
        setIsLoggedAdmin(false);
    }
  },[sessionStorage.getItem("adminId")]);
 
  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Product Management System</h1>
      </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div
          className="container-fluid"
          style={{ backgroundColor: "lightgreen" }}
        >
          <a className="navbar-brand" href="#">
            <b>ReactStore</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLogged &&
                (
                  <li className="nav-item" style={{display: 'flex'}}>
                    <li className="nav-link" onClick={handleLogOut}>
                      Logout
                    </li>
                    <Link className="nav-link" to="/product">
                      Product
                    </Link>
                    <Link className="nav-link" to="/cartItems">
                      Cart Items
                    </Link>
                  </li>
                )
              }
            
            {isLoggedAdmin &&
                (
                  <li className="nav-item" style={{display: 'flex'}}>
                    <li className="nav-link" onClick={handleLogOut}>
                        style={{cursor:"product"}}
                      Logout
                    </li>
                    <Link className="nav-link" to="/adminproduct">
                      Product
                    </Link>
                    <Link  className="nav-link" to="/addProduct">
                      AddProduct
                    </Link>
                  </li>
                )
              }

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
 
export default Navbar;