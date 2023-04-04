import React from "react";
import registerCSS from "./register.module.css";
import { useFormik } from "formik";
import axios from "axios";

export default function Register() {
  // info coming from the form
  let user = {
    name: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
  };

  async function registerNewUser() {
    let newUser = user;
    let sendNewUserToBackend = await axios.post(
      "https://route-ecommerce.onrender.com/api/v1/auth/signup",
      { user }
    );
    console.log("sendNewUserToBackend", sendNewUserToBackend);
  }
  //this is the start of using formik
  const formik = useFormik({
    initialValues: user,
    //submit will happen after validate.
    onSubmit: (values) => {
      // console.log("values", values);
      //if the validation is right, send the data to the backend-call API
      registerNewUser();
    },
    //validate the data before sending to backend
    validate: (values) => {
      // console.log(values);
      let errors = {};
      //do the validation here
      if (values.name.length < 3 || values.name.length > 10) {
        errors.name = "Name must be more than 3 characters and less than 10!";
      }

      if (
        values.email.includes("@") === false ||
        values.email.includes(".com") === false
      ) {
        errors.email = "Email must be valid!";
      }

      if (!values.phone.m(/^(02)?01[0125][0-9]{8}$/)) {
        errors.phone = "Phone must be egyptian number!";
      }

      if (values.password.length < 3 || values.password.length > 12) {
        errors.password = "Password must be from 6 to 12 characters only!";
      }

      if (values.password != values.repassword) {
        errors.repassword = "Password and repassword must be identical!";
      }
      // if there are errors, return the errors
      return errors;
    },
  });

  return (
    <div className="container py-5">
      <h2 className="">Registeration Form</h2>
      <form className="" onSubmit={formik.handleSubmit}>
        <label className="mt-3" htmlFor="name">
          Name
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
          id="name"
          placeholder="name"
          type="text"
          className="form-control"
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="alert alert-danger text-center">
            {formik.errors.name}
          </div>
        ) : (
          ""
        )}

        <label className="mt-3" htmlFor="email">
          Email
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          id="email"
          placeholder="email"
          type="email"
          className="form-control"
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger text-center">
            {formik.errors.email}
          </div>
        ) : (
          ""
        )}

        <label className="mt-3" htmlFor="phone">
          Phone
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
          id="phone"
          placeholder="phone"
          type="text"
          className="form-control"
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className="alert alert-danger text-center">
            {formik.errors.phone}
          </div>
        ) : (
          ""
        )}

        <label className="mt-3" htmlFor="password">
          Password
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          id="password"
          placeholder="password"
          type="password"
          className="form-control"
        />
        {formik.errors.password && formik.touched.password ? (
          <div className="alert alert-danger text-center">
            {formik.errors.password}
          </div>
        ) : (
          ""
        )}

        <label className="mt-3" htmlFor="repassword">
          RePassord
        </label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.repassword}
          id="repassword"
          placeholder="repassword"
          type="password"
          className="form-control"
        />
        {formik.errors.repassword && formik.touched.repassword ? (
          <div className="alert alert-danger text-center">
            {formik.errors.repassword}
          </div>
        ) : (
          ""
        )}

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
