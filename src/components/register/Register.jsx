import React from "react";
import registerCSS from "./register.module.css";
import { useFormik } from "formik";

export default function Register() {
  // info coming from the form
  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  //this is the start of using formik
  useFormik({});

  return (
    <div className="container py-5">
      <h2 className="">Registeration Form</h2>
      <form className="">
        <label className="mt-3" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          placeholder="name"
          type="text"
          className="form-control"
        />

        <label className="mt-3" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          placeholder="email"
          type="email"
          className="form-control"
        />

        <label className="mt-3" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          placeholder="phone"
          type="number"
          className="form-control"
        />

        <label className="mt-3" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          placeholder="password"
          type="password"
          className="form-control"
        />

        <label className="mt-3" htmlFor="repassword">
          rePassword
        </label>
        <input
          id="repassword"
          placeholder="repassword"
          type="password"
          className="form-control"
        />
        <button
          type="submit"
          className="btn btn-outline-success mt-4 mb-4 w-40"
        >
          Register
        </button>
      </form>
    </div>
  );
}
