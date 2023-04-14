import React, { useState, useEffect } from "react";
import brandDetailsCSS from "./brandDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../loadingScreen/LoadingScreen";

export default function BrandProducts() {
  let [brandProducts, setBrandProducts] = useState(null);
  let { id } = useParams();
  const getBrandProducts = async () => {
    try {
      let { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/products",
        { params: { brand: `${id}` } }
      );
      console.log("data", data);
      setBrandProducts(data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getBrandProducts();
  }, []);
  return (
    <>
      {brandProducts == null ? (
        <LoadingScreen />
      ) : (
        <div className="container">
          <div className="row">
            {brandProducts.length > 0 ? (
              brandProducts.map((brandProduct, index) => (
                <div className="col-md-4" key={brandProduct._id}>
                  <div className="item bg-warning mb-5">
                    <img
                      className="w-100"
                      src={brandProduct.imageCover}
                      alt={brandProduct.title}
                    />
                    <h4>Title:{brandProduct.title}</h4>
                    <h5>Price: ${brandProduct.price}</h5>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-center p-5">No Data available</h2>
            )}
          </div>
        </div>
      )}
    </>
  );
}
