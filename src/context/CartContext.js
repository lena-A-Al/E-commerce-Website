import React, { createContext, useState } from "react";
import axios from "axios";
import $ from "jquery";

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
      // if (await data.data) {
      //   $(".addedProductMsg").fadeIn(1000, () => {
      //     setTimeout(() => {
      //       $(".addedProductMsg").fadeOut(4000);
      //     }, 1000);
      //     $(".addToCart").hide();
      //     $(".deleteProduct").fadeIn(500);
      //   });
      // } else {
      //   console.log("nothing to add to the cart");
      // }
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
