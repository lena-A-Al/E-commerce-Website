import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  let navigate = useNavigate();
  let [numberOfCartItems, setNumberOfCartItems] = useState(0);
  let [totalCartPrice, setTotalCartPrice] = useState(0);
  let [cartProducts, setCartProducts] = useState(null);
  let [cartId, setCartId] = useState(null);
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

  const getProductsInUserCart = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await axios.get(
          `https://route-ecommerce.onrender.com/api/v1/cart`,
          { headers: { token: token } }
        );
        console.log(cartId);
        if (data.status === "success") {
          console.log("success", data.status);
          setNumberOfCartItems(data.numOfCartItems);
          setTotalCartPrice(data.data.totalCartPrice);
          setCartProducts(data.data.products);
          setCartId(data.data._id);
        }
      }
    } catch (error) {
      console.log("error", error.response.status);
      if (error.response.status === 404) {
        $(".noProductsInCart").fadeIn(100, () => {
          setTimeout(() => {
            $(".noProductsInCart").fadeOut(1500);
          }, 100);
        });
        navigate("/home");
      } else {
        console.log("error", error);
      }
    }
    console.log("cartId", cartId);
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
        cartId,
      }}
    >
      <div
        style={{ display: "none" }}
        className="noProductsInCart container text-center alert alert-dark text-black fw-bold"
      >
        <h5>No Cart Exist</h5>
      </div>
      {children}
    </cartContext.Provider>
  );
}
