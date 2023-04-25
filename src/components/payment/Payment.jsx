import React, { useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { cartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  let navigate = useNavigate();

  let { cartId } = useContext(cartContext);
  console.log("cart id in payment file", cartId);
  let userPaymentInfo = {
    details: document.querySelector("#details"),
    phone: document.querySelector("#phone"),
    city: document.querySelector("#city"),
  };

  //function to send the values to the backend
  const confirmCashOrder = async () => {
    try {
      let { data } = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: {
            details: document.querySelector("#details").value,
            phone: document.querySelector("#phone").value,
            city: document.querySelector("#city").value,
          },
        },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log("data", data);
      if (data.status === "success") {
        navigate("/allOrders");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const confirmCreditOrder = async () => {
    try {
      let { data } = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: {
            details: document.querySelector("#details").value,
            phone: document.querySelector("#phone").value,
            city: document.querySelector("#city").value,
          },
        },
        {
          headers: { token: localStorage.getItem("token") },
          // we use location.port to make it dynamic.
          params: { url: `http://localhost:3000` },
        }
      );

      console.log("inside creditOrder");
      console.log("data", data);
      if (data.status === "success") {
        window.open(data.session.url);
      }
    } catch (error) {
      console.log("inside creditOrder");
      console.log("error", error);
    }
  };
  return (
    <>
      {cartId !== null ? (
        <div className="container">
          <h2>Welcome</h2>
          <div>
            <form className="">
              <label htmlFor="details">Address Details</label>
              <input
                type="text"
                placeholder="Address Details"
                id="details"
                className="form-control mb-5"
              />

              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                placeholder="Phone"
                id="phone"
                className="form-control  mb-5"
              />

              <label htmlFor="city">City</label>
              <input
                type="text"
                placeholder="City"
                id="city"
                className="form-control  mb-5"
              />

              <button
                className="btn btn-primary mb-5 me-4"
                type="button"
                onClick={() => confirmCashOrder()}
              >
                Confirm Cash
              </button>

              <button
                className="btn btn-primary mb-5"
                type="button"
                onClick={() => confirmCreditOrder()}
              >
                Confirm Credit Card
              </button>
            </form>
          </div>
        </div>
      ) : (
        <h3>No Cart</h3>
      )}
    </>
  );
}
