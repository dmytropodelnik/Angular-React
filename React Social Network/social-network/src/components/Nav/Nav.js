import React from 'react';
//import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom'

//localStorage.setItem("signInLogOut", "Sign In");

const Nav = () => ( 
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Activity Feed</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="profile">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/auth">Sign In Test</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/reg">Sign Up TEST</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

// Nav.propTypes = {};

// Nav.defaultProps = {};

export default Nav; 