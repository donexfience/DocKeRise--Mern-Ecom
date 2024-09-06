import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const images = [
    "https://ae01.alicdn.com/kf/H57c47539b7eb45c397b6481b39579975O/RYZEN-logo-RGB-gaming-accessories-Mouse-Pad-Oversize-Glowing-Led-Extended-Mousepad-Non-Slip-Rubber-Computer.jpg_640x640.jpg",
    "https://www.open.edu.au/-/media/blog/2022/12-december/6-careers-in-gaming.jpg?h=477&iar=0&w=715&rev=1703712e4a6f420982a6e524baa51872&hash=1E0E1879FDFD0204E2E5B3766058B391",
    "https://img.freepik.com/premium-photo/gaming-black-mouse-rgb-black-background-generative-ai_849906-5404.jpg",
    // Add more image URLs as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full mr-5 py-20 sm:px-20 pb-12">
      <Slider {...settings}>
        {images.map((imageUrl, index) => (
          <div key={index} className="lg:h-[80vh]">
            <img
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
