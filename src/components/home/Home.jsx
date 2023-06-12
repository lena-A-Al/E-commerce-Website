import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import homeCSS from "./home.module.css";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import SliderComponent from "../SliderComponent/SliderComponent";
import { cartContext } from "../../context/CartContext";
import $ from "jquery";
import { Helmet } from "react-helmet";

// import "jquery"

export default function Home() {
  //local States to save products coming from the API
  let [products, setProducts] = useState(null);
  const addProductToCart = useContext(cartContext);

  async function getAllProducts() {
    try {
      //call the endpoint to get all products
      let { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (err) {
      console.log("error", err);
    }
  }

  const addProductToCartFromHome = async (productId) => {
    let result = await addProductToCart(productId);
    if ((await result) && productId) {
      $(".addProductInHome").fadeIn(1000, () => {
        setTimeout(() => {
          $(".addProductInHome").fadeOut(4000);
        }, 1000);
        $(`#addToCartInHome${productId}`).hide();
        $(`#deleteProductInHome${productId}`).fadeIn(10);
      });
    } else {
      console.log("nothong to add to the cart!");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Helmet>
        {/* <meta charSet="utf-8" /> */}
        <title>home</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      {products == null ? (
        <LoadingScreen />
      ) : (
        <div className="container py-4">
          <SliderComponent />
          <div
            style={{
              zIndex: "100000",
              left: "0",
              display: "none",
            }}
            className="addProductInHome alert position-fixed bottom-0 start-50 alert-success text-center bg-dark text-white"
          >
            Product was added successfully!!
          </div>
          <div className="row">
            {products &&
              products.map((product, index) => (
                <div key={index} className="col-md-3 position-relative">
                  <Link
                    className={homeCSS.link}
                    to={`/productDeatils/${product.id}`}
                  >
                    <div className="item bg-light rounded text-center">
                      <img
                        className={homeCSS.imageStyle}
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <h6>
                        {/* indexOf here will find the space after 20 characters, so the slice will be from 0 until the second space after counting 20 */}
                        {product.title.slice(0, product.title.indexOf(" ", 20))}
                      </h6>
                      <h6 className="">
                        <span>
                          <i className="fa-solid fa-star text-warning"></i>{" "}
                        </span>
                        {product.ratingsAverage}{" "}
                      </h6>
                      {/* <h6>{product.category.name}</h6> */}
                      {/* <button className={homeCSS.addCart}>Add To Cart +</button> */}
                      {product.priceAfterDiscount ? (
                        <div className="d-flex justify-content-between">
                          <h6
                            style={{ textDecoration: "line-through" }}
                            className="text-bg-danger fs-5"
                          >
                            ${product.price}
                          </h6>
                          <h6 className="text-bg-warning fs-5">
                            ${product.priceAfterDiscount}
                          </h6>
                        </div>
                      ) : (
                        <div>
                          <h6 className="fs-5 p-3">${product.price}</h6>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="position-absolute top-0 start-80 text-bg-info fs-5">
                    {/* <button
                      id={`addToCartInHome${product.id}`}
                      className="btn btn-info"
                      onClick={() => addProductToCartFromHome(product.id)}
                    >
                      Add To Cart +
                    </button> */}
                    <button
                      id={`deleteProductInHome${product.id}`}
                      style={{ display: "none" }}
                      className="btn btn-danger w-100"
                    >
                      Remove From Cart -
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
