import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
  async function loginUser(obj) {
    try {
      let { data } = await axios.post(
        "https://route-ecommerce.onrender.com/api/v1/auth/signin",
        obj
      );
      if (data.message === "success") {
        $(".successMsg").fadeIn(1000, () => {
          navigate("/home");
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
      loginUser(values);
      // navigate("/login");
    },
    //validate the data before sending to backend
    validate: (values) => {
      // console.log(values);
      let errors = {};
      //do the validation here
      if (
        values.email.includes("@") === false ||
        values.email.includes(".com") === false
      ) {
        errors.email = "Email must be valid!";
      }

      if (values.password.length < 3 || values.password.length > 15) {
        errors.password = "Password must be from 6 to 12 characters only!";
      }
      // if there are errors, return the errors
      return errors;
    },
  });

  return (
    <div className="container py-5">
      <h2 className="">Login Form</h2>

      <div
        style={{ display: "none" }}
        className="errorMsg alert alert-danger text-center"
      >
        Email or Password are incorrect, try again!!
      </div>

      <div
        style={{ display: "none" }}
        className="successMsg alert alert-success text-center"
      >
        successfully logged in !!
      </div>

      <form className="" onSubmit={formik.handleSubmit}>
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

        <button
          type="submit"
          className="btn btn-outline-success mt-4 mb-4 w-40"
        >
          Login
        </button>
      </form>
    </div>
  );
}
