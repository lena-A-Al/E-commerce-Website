import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { cartContext } from "../../context/CartContext";
import $ from "jquery";
import { Helmet } from "react-helmet";

export default function ProductDetails({ currentUser }) {
  let [productDetails, setProductDetails] = useState(null);
  const { addProductToCart, deleteProductFromCart } = useContext(cartContext);

  //customs hooks
  const { id } = useParams();

  const getProductDetails = async () => {
    // bring the data from the cart store
    try {
      let { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.log("eror", error);
    }
  };

  // a different function that can be used.
  const addProductToUserCart = async (productId) => {
    console.log("addPrduct function");
    if ((await addProductToCart(productId)) === true) {
      $(".addedProductMsg").fadeIn(1000, () => {
        setTimeout(() => {
          $(".addedProductMsg").fadeOut(300);
        }, 1000);
        $(".addToCart").hide();
        $(".deleteProduct").fadeIn(100);
      });
    } else {
      console.log("nothing to add to the cart");
    }
  };

  const deleteProductFromUserCart = async (productId) => {
    // deleteProductFromCart(productId);
    let result = await deleteProductFromCart(productId);
    if (await result) {
      $(".deletedProductMsg").fadeIn(1000, () => {
        setTimeout(() => {
          $(".deletedProductMsg").fadeOut(4000);
        }, 100);
      });
      $(".deleteProduct").hide();
      $(".addToCart").fadeIn(100);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <>
      {productDetails == null ? (
        <div>
          <LoadingScreen />
        </div>
      ) : (
        <div className="container">
          <Helmet>
            <title>{productDetails.title ? productDetails.title : ""}</title>
          </Helmet>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-3">
              <img
                className="w-100"
                src={productDetails.imageCover}
                alt={productDetails.title}
              />
            </div>
            <div className="col-md-9">
              <h3>{productDetails.title}</h3>
              <p>{productDetails.description}</p>
              <h4>Price: ${productDetails.price}</h4>
              <h4>Quantity: {productDetails.quantity}</h4>
              <h4>Rate: {productDetails.ratingsAverage}</h4>
              <button
                className="addToCart btn btn-success w-100"
                onClick={() => addProductToUserCart(productDetails.id)}
              >
                Add To Cart +
              </button>
              <button
                style={{ display: "none" }}
                className="deleteProduct btn btn-danger w-100"
                onClick={() => deleteProductFromUserCart(productDetails.id)}
              >
                Remove From Cart -
              </button>
              <div
                style={{ display: "none" }}
                className="addedProductMsg alert alert-success text-center m-5"
              >
                The {productDetails.title}has been added successfully to your
                cart
                <span>
                  <i class="fa-solid fa-cart-shopping"></i>{" "}
                </span>
              </div>

              <div
                style={{ display: "none" }}
                className="deletedProductMsg alert alert-danger text-center m-5"
              >
                The {productDetails.title}has been removed successfully from
                your cart
                <span>
                  <i class="fa-solid fa-cart-shopping"></i>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
