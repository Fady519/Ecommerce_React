import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { FallingLines } from 'react-loader-spinner';
import Categories from './../Categories/Categories';
import { useQuery } from '@tanstack/react-query';
import useAllCategories from "../../CustomHooks/useAllCategories";

export default function CategoriesSlider() {

 // const [allCategories, setAllCategories] = useState(null);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,

  };

  const {isError, isLoading, data} = useAllCategories();

  //   function getAllCategories()
  // {
  //   return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  // }

  // const {isLoading, isError, data} = useQuery({
  //   queryKey: 'allCategories',
  //   queryFn: getAllCategories,
  // })

  // async function getCategories() {
  //   await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  //   .then( (param) => {
  //     setAllCategories(param.data.data);
  //   })
  //   .catch((param) => {

  //   });
  // }

  // useEffect( () => {
  //   getCategories();
  // }, []);

    if(isError)
    {
      return ( 
      <>
      <h2> Exist Error </h2>
      </>
      )
    }


  if (isLoading) {
    return (
      <div className='h-screen bg-blue-300 flex justify-center items-center'>
        <FallingLines
          color="#fff"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }
  
  return (

<>

<Slider {...settings} arrows ={false}>

      {data.data.data.map( (category) => <div key={category._id}>
        <img className="w-full h-36" src= {category.image} alt = {category.name}/>
        <h6>{category.name}</h6>
      </div> ) }

    </Slider>

</>
  );
}
