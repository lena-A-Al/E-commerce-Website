import React, { useEffect, useState } from "react";
import brandsCSS from "./brands.module.css";
import axios from "axios";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>brands</title>
      </Helmet>
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
                  <Link
                    className={brandsCSS.link}
                    to={`/brandProducts/${brand._id}`}
                  >
                    <div>
                      <img
                        className={brandsCSS.imageStyle}
                        src={brand.image}
                        alt={brand.name}
                      />
                      <h3 className="fw-bold">{brand.name}</h3>
                      {/* <h1>{brand._id}</h1> */}
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
