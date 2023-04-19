import React, { createContext, useState } from "react";
import axios from "axios";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  let [userCart, setUserCart] = useState("");

  //this function will add product to user cart
  const addProductToCart = async (productId) => {
    try {
      let { data } = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        { productId: productId },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (data.status === "success") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <cartContext.Provider
      value={{ addProductToCart: addProductToCart, userCart: userCart }}
    >
      {children}
    </cartContext.Provider>
  );
}
