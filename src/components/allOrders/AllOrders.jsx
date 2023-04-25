import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from "../loadingScreen/LoadingScreen";

export default function AllOrders({ currentUser }) {
  let [allOrders, setAllOrders] = useState(null);

  console.log("currentUser.id", currentUser.id);
  const getAllOrders = async () => {
    try {
      let { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/orders/user/${currentUser.id}`
      );
      console.log("data", data);
      setAllOrders(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllOrders();
    console.log("hi from useEffect");
  }, [currentUser.id]);

  return (
    <>
      {allOrders === null ? (
        <LoadingScreen />
      ) : (
        <div className="container py-4">
          <div className="row">
            {allOrders.map((order, index) => {
              return (
                <div key={index} className="col-md-8">
                  <div className="order bg-info text-black rounded-4 p-5 m-1 w-100 text-center align-items-center">
                    <div className="container">
                      <div className="row">
                        <h3 className="bg-light text-black">
                          Order {index + 1}
                        </h3>
                        {order.cartItems.map((item, index) => {
                          return (
                            <div className="col-sm-6 p-4" key={index}>
                              <div className="item">
                                <img
                                  src={item.product.imageCover}
                                  alt="title"
                                  className="w-100"
                                />
                                <h4>Title: {item.product.title}</h4>
                                <h5>Count: {item.count}</h5>
                                <h5>Price: {item.price}</h5>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <h5>Price: {order.totalOrderPrice}</h5>
                    <h5>Order Type: {order.paymentMethodType}</h5>
                    {/* <p>
            The order was delivered to{order.shippingAddress.details} in
            {order.shippingAddress.city} with this number
            {order.shippingAddress.phone}
          </p> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
