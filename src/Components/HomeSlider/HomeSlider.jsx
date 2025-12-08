import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import sliderImage1 from '../../assets/Images/download1.png.jpeg';
import sliderImage2 from '../../assets/Images/download2.png.jpeg';
import sliderImage3 from '../../assets/Images/download3.png.jpeg';
import sliderImage4 from '../../assets/Images/download4.png.jpeg';
import sliderImage5 from '../../assets/Images/download5.png.jpeg';
import sliderImage6 from '../../assets/Images/download6.png.jpeg';

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };
  return (
    <Slider {...settings} arrows ={false}>
      <div>
        <img className="w-full h-80" src= {sliderImage1} alt = ""/>
      </div>
      <div>
         <img className="w-full h-80" src= {sliderImage2} alt = ""/>
      </div>
      <div>
         <img className="w-full h-80" src= {sliderImage3} alt = ""/>
      </div>
      <div>
         <img className="w-full h-80" src= {sliderImage4} alt = ""/>
      </div>
      <div>
         <img className="w-full h-80" src= {sliderImage5} alt = ""/>
      </div>
      <div>
         <img className="w-full h-80" src= {sliderImage6} alt = ""/>
      </div>
    </Slider>
  );
}
