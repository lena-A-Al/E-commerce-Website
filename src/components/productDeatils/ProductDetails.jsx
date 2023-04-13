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
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-3">
            <img className="w-100" src="imagelogo" alt="imagelogo" />
          </div>
          <div className="col-md-9 py-5">
            <h3>Lorem ipsum dolor sit amet.</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              tenetur cupiditate ducimus aperiam at quibusdam molestiae
              voluptatibus exercitationem, maxime saepe.
            </p>
            <h4>Price:33</h4>
            <h4>Quantity:33</h4>
            <h4>Rate:33</h4>
            <button className="btn btn-success w-100">Add To Cart +</button>
          </div>
        </div>
      </div>
    </>
  );
}
