import React from "react";
import registerCSS from "./register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  //customs hooks
  let navigate = useNavigate();
  // info coming from the form
  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  //function to send the values to the backend
  async function registerNewUser(obj) {
    try {
      let { data } = await axios.post(
        "https://route-ecommerce.onrender.com/api/v1/auth/signup",
        obj
      );
      if (data.message === "success") {
        $(".successMsg").fadeIn(1000, () => {
          navigate("/login");
          setTimeout(() => {
            $(".successMsg").fadeOut(100);
          }, 100);
        });
      }
    } catch (error) {
      console.log("error", error);
      $(".errorMsg").fadeIn(1000, function () {
        setTimeout(() => {
          $(".errorMsg").fadeOut(500);
        }, 3000);
      });
    }
  }

  //this is the start of using formik
  const formik = useFormik({
    initialValues: user,
    //submit will happen after validate.
    onSubmit: (values) => {
      console.log("values", values);
      //if the validation is right, send the data to the backend-call API
      registerNewUser(values);
      // navigate("/login");
    },
    //validate the data before sending to backend
    validate: (values) => {
      // console.log(values);
      let errors = {};
      //do the validation here
      if (values.name.length < 3 || values.name.length > 20) {
        errors.name = "Name must be more than 3 characters and less than 10!";
      }

      if (
        values.email.includes("@") === false ||
        values.email.includes(".com") === false
      ) {
        errors.email = "Email must be valid!";
      }

      // if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
      //   errors.phone = "Phone must be egyptian number!";
      // }

      if (values.password.length < 3 || values.password.length > 15) {
        errors.password = "Password must be from 6 to 12 characters only!";
      }

      if (values.password !== values.rePassword) {
        errors.rePassword = "Password and repassword must be identical!";
      }
      // if there are errors, return the errors
      return errors;
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container py-5">
        <h2 className="">Registeration Form</h2>

        <div
          style={{ display: "none" }}
          className="errorMsg alert alert-success text-center"
        >
          Email already in use!
        </div>

        <div
          style={{ display: "none" }}
          className="successMsg alert alert-success text-center"
        >
          Email is valid!
        </div>

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
            // ٠١٠١٩٣٨١٨٤٠
            placeholder="Phone must be 11 numbers and must start with 0101"
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

          <label className="mt-3" htmlFor="rePassword">
            RePassord
          </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            id="rePassword"
            placeholder="rePassword"
            type="password"
            className="form-control"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger text-center">
              {formik.errors.rePassword}
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
    </>
  );
}
