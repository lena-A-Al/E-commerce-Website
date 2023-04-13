import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../loadingScreen/LoadingScreen";

export default function ProductDetails() {
  let [productDetails, setProductDetails] = useState(null);
  //customs hooks
  const { id } = useParams();
  console.log(id);

  const getProductDetails = async () => {
    try {
      let { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/products/${id}`
      );
      console.log(data.data);
      setProductDetails(data.data);
    } catch (error) {
      console.log("eror", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  });
  return (
    <>
      {productDetails == null ? (
        <LoadingScreen />
      ) : (
        <div className="container">
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
              <button className="btn btn-success w-100">Add To Cart +</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
