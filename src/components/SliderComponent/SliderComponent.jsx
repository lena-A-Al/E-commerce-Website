import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="row g-0 mt-4 mb-5">
        <div className="col-md-9 mainSlider">
          <Slider {...settings}>
            <img
              className="w-100"
              height={300}
              src={require("../../images/banner-slider/slider-image-1.jpeg")}
              alt="Main Slider"
            />
            <img
              className="w-100"
              height={300}
              src={require("../../images/banner-slider/slider-image-2.jpeg")}
              alt="Main Slider"
            />
            <img
              className="w-100"
              height={300}
              src={require("../../images/banner-slider/slider-image-3.jpeg")}
              alt="Main Slider"
            />
            <img
              className="w-100"
              height={300}
              src={require("../../images/banner-slider/grocery-banner-2.jpeg")}
              alt="Main Slider"
            />
          </Slider>
        </div>
        <div className="col-md-3">
          <img
            className="w-100"
            height={150}
            src={require("../../images/banner-slider/grocery-banner.png")}
            alt="Show"
          />
          <img
            className="w-100"
            height={150}
            src={require("../../images/banner-slider/slider-2.jpeg")}
            alt="Show"
          />
        </div>
      </div>
    </>
    // // <div>
    // <Slider {...settings}>
    //   {/* <div> */}
    //   <div>
    //     <img
    //       style={{ height: "350px;" }}
    //       className="w-100"
    //       src={require("../../images/banner-slider/grocery-banner-2.jpeg")}
    //       alt=""
    //     />
    //   </div>

    //   <div>
    //     <img
    //       style={{ height: "350px;" }}
    //       className="w-100"
    //       src={require("../../images/banner-slider/slider-2.jpeg")}
    //       alt=""
    //     />
    //   </div>

    //   <div>
    //     <img
    //       style={{ height: "350px;" }}
    //       className="w-100"
    //       src={require("../../images/banner-slider/slider-image-1.jpeg")}
    //       alt=""
    //     />
    //   </div>

    //   <div>
    //     <img
    //       style={{ height: "350px;" }}
    //       className="w-100"
    //       src={require("../../images/banner-slider/slider-image-2.jpeg")}
    //       alt=""
    //     />
    //   </div>

    //   <div>
    //     <img
    //       style={{ height: "350px;" }}
    //       className="w-100"
    //       src={require("../../images/banner-slider/slider-image-3.jpeg")}
    //       alt=""
    //     />
    //   </div>
    //   {/* </div> */}
    // </Slider>
    // // </div>
  );
}
