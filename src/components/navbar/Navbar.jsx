import React from "react";
import { Link } from "react-router-dom";
import refreshCartLogo from "../../images/freshcart-logo.svg";
export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand">
            <img src={refreshCartLogo} alt="freshCart-logo" />
          </Link>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>

              <li class="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/brands"
                >
                  Brands
                </Link>
              </li>

              <li class="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Carts
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>

              <li class="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
