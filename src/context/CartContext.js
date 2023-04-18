import React, { createContext, useState } from "react";
import axios from "axios";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  let [userCart, setUserCart] = useState("");

  //this function will add product to user cart
  const addProductToCart = async (productId) => {
    try {
      let productToAdd = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        { productId: productId },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setUserCart(addProductToCart);
      console.log(productToAdd);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <cartContext.Provider value={{ addProductToCart: addProductToCart }}>
      {children}
    </cartContext.Provider>
  );
}
