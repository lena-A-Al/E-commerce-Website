import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer className="p-4">
        <h2>Get the FreshCart App</h2>
        <p>
          We will send you a link, open it on your phone to download the app
        </p>
        <div class="container mb-3 d-flex justify-content-between">
          <input
            type="text"
            className="form-control w-75"
            placeholder="Email..."
          />
          <button className="btn btn-success w-25 ms-3">Share App Link</button>
        </div>

        <div className="container border-top  d-flex justify-content-between align-items-center  border-bottom border-2 border-dark py-4">
          <div className="leftPart">
            <ul className="list-unstyled d-flex">
              <li className="me-2 text-primary">
                <h6>Payment Parteners</h6>
              </li>
              <li className="me-2 text-primary">
                <i className="fa-brands fa-paypal"></i>
              </li>
              <li className="me-2 text-primary">
                <i className="fa-brands fa-cc-amazon-pay"></i>
              </li>
              <li className="me-2 text-primary">
                <i className="fa-brands fa-cc-mastercard"></i>
              </li>
            </ul>
          </div>
          <div className="rightPart d-flex align-items-center">
            <h6 className="">Get deliveries with FreshCart</h6>
            <button className="btn btn-dark text-white btn-lg mx-3">
              <i className="fa-brands fa-app-store-ios me-2"></i>
              <span>Available on the App Store</span>
            </button>
            <button className="btn btn-dark text-white btn-lg">
              <i className="fa-brands fa-google-play me-2"></i>
              <span>Get it on Google Play</span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
