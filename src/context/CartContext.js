import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { useFormik } from "formik";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  let [numberOfCartItems, setNumberOfCartItems] = useState(0);
  let [totalCartPrice, setTotalCartPrice] = useState(0);
  let [cartProducts, setCartProducts] = useState(null);
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

  const getProductsInUserCart = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await axios.get(
          `https://route-ecommerce.onrender.com/api/v1/cart`,
          { headers: { token: token } }
        );
        if (data.status === "success") {
          setNumberOfCartItems(data.numOfCartItems);
          setTotalCartPrice(data.data.totalCartPrice);
          setCartProducts(data.data.products);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteProductFromCart = async (productId) => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.delete(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        { headers: { token: token } }
      );
      console.log("data", data);
      if (data.status === "success") {
        setNumberOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateProductInCart = async (productId, count) => {
    console.log("count", count);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        { count: count },
        {
          headers: { token: token },
        }
      );
      console.log(data);
      if (data.status === "success") {
        setNumberOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
      } else {
        console.log("no product to be updated");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProductsInUserCart();
  }, []);
  return (
    <cartContext.Provider
      value={{
        addProductToCart: addProductToCart,
        deleteProductFromCart: deleteProductFromCart,
        updateProductInCart: updateProductInCart,
        numberOfCartItems,
        totalCartPrice,
        cartProducts,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
