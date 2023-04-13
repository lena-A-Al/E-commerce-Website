import React, { useEffect, useState } from "react";
import axios from "axios";
import homeCSS from "./home.module.css";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

export default function Home() {
  //local States to save products coming from the API
  let [products, setProducts] = useState(null);
  const getAllProducts = async () => {
    try {
      //call the endpoint to get all products
      const { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getAllProducts();
  });

  return (
    <>
      {products == null ? (
        <LoadingScreen />
      ) : (
        <div className="container">
          <div className="row">
            {products &&
              products.map((product, index) => (
                <div key={index} className="col-md-2 position-relative">
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
                      <h6>{product.category.name}</h6>
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
                          <h6 className="fs-5">${product.price}</h6>
                        </div>
                      )}
                      <div>
                        <h6 className="position-absolute top-0 start-80 text-bg-info fs-5">
                          {product.ratingsAverage}
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
