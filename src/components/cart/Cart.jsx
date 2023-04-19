import React, { useState, useEffect, useContext } from "react";
import { cartContext } from "../../context/CartContext";

export default function Cart() {
  const userCart = useContext(cartContext);
  console.log("userCart", userCart);
  return (
    <div className="container py-5">
      <h2 className="text-center">Welcome User</h2>
    </div>
  );
}
