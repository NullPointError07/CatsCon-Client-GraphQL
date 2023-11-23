"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carousalItems from "@/utils/carousalItems";

const settings = {
  dots: true,
  lazyLoad: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
};

const Banner = () => {
  return (
    <div className="relative ">
      <div className="mx-auto ">
        <Slider {...settings}>
          {carousalItems.map((item, index) => (
            <div key={index} className="w-full relative ">
              <img
                src={item.image}
                alt={item.header}
                className="w-full  rounded-xl"
              />
              <div className="absolute bottom-0 left-0 p-2 md:p-4 lg:p-6 bg-white bg-opacity-80">
                <h3 className="text-md md:text-5xl font-semibold mb-2">
                  {item.header}
                </h3>
                <p className="text-gray-900 text-xs md:text-lg">{item.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
