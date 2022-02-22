import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../scss/Top_nav_bar.scss";
import Cookies from "js-cookie";
import axios from 'axios';

const TopNavBar = () => {
  const [route, setRoute] = useState("");
  const [user, setUser] = useState({});
  let navigate = useNavigate();

  const signoutHandler = () => {
    Cookies.remove("user");
    Cookies.remove("id");
    Cookies.remove("employer");
    navigate("/");
  };
  
  axios.get("//express-server-hire.herokuapp.com/api/all")
  .then((response) => {
    const users = response.data;
    const userArr = users.filter((user) => user.email === Cookies.get('user'))
    setUser(userArr[0]);
  }).catch(err => err.message)

  useEffect(() => {
      if (Cookies.get("user") && Cookies.get("employer") === "false") {
        setRoute(`/developers/${Cookies.get("id")}`);
      } else {
      setRoute(`/employers/${Cookies.get("id")}`);
      }
  }, []);

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-fluid">
      <Link className="navbar-brand" to={"/"}>
        <img src="/logo.png" alt="Hire/:D" className="logo" />
      </Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          <span className="left-side">
      <li className="nav-item">
        <NavLink className="nav-link" to={"/projects"}>
          Projects
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={"/jobs"}>
          Jobs
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={"/developers"}>
          Developers
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={"/employers"}>
          Employers
        </NavLink>
      </li>
      </span>
      <span className="right-side">
      {Cookies.get("user") ? (
        <React.Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to={route}>
             Hello {user.first_name}
            </NavLink>
          </li>
          <li>
          <img src={user.avatar} className="top-nav-avatar" alt={user.first_name} />
          </li>
          <li className="nav-item">
            <p className="nav-link signout-btn" onClick={signoutHandler}>
              Signout
            </p>
          </li>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to={`/login`}>
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={"/signup"}>
              SignUp
            </NavLink>
          </li>
        </React.Fragment>
      )}
      </span>
    </ul>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default TopNavBar;
