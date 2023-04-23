import React from "react";
import axios from "axios";

export default function AllOrders({ currentUser }) {
  console.log("currentUser", currentUser);

  const getAllOrders = async () => {
    let { data } = await axios
      .get
      //   `https://route-ecommerce.onrender.com/api/v1/orders/user/${currentUserId}`
      ();
  };
  return <div>AllOrders</div>;
}
