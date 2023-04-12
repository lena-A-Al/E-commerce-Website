import React, { useEffect, useState } from "react";
import brandsCSS from "./brands.module.css";
import axios from "axios";
import LoadingScreen from "../loadingScreen/LoadingScreen";

export default function Brands() {
  let [allBrands, setAllBrands] = useState(null);
  // a function to get all brand names
  const getAllBrands = async () => {
    try {
      let { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/brands"
      );
      setAllBrands(data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      {allBrands == null ? (
        <LoadingScreen />
      ) : (
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="title">
                <h3 className="text-primary pt-5">Our Brands</h3>
                <p className="">
                  You can se our brands and each brand includes products in it.{" "}
                </p>
              </div>
            </div>
            {allBrands &&
              allBrands.map((brand, id) => (
                <div
                  key={brand._id}
                  className="col-md-3 text-center text-primary pt-5"
                >
                  <div>
                    <img
                      className={brandsCSS.imageStyle}
                      src={brand.image}
                      alt={brand.name}
                    />
                    <h3 className="fw-bold">{brand.name}</h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
