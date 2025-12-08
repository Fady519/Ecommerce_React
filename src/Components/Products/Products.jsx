


import axios from 'axios'
import React, { useContext } from 'react'
import { FallingLines } from 'react-loader-spinner';
import SimpleSlider from '../HomeSlider/HomeSlider';
import sliderImage1 from '../../assets/Images/download5.png.jpeg';
import sliderImage2 from '../../assets/Images/download6.png.jpeg';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Products() {

const {addProduct} = useContext(cartContext);

async function handleAddProduct(id) {
  const x = await addProduct(id);

      if(x)
    {
       
        toast.success('Product Added Successfully', {
          position: 'top-right',
          duration: 3000,
        })
    }
    else
    {
       
          toast.error('Addeding Produt Error', {
          position: 'top-right',
          duration: 3000,
        })
    }
  
}

  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['allProducts'],  
    queryFn: getAllProducts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: false, // مش بيعمل fetch تلقائي غير لما تدوس على الزرار
  });

  if (isError) {
    console.log("Error object:", error);
    return ( 
      <h2 className='text-red-500 text-center'>Error: {error.message}</h2>
    );
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
      <div className='container mx-auto'>
        
        {/* Slider Section */}
        <div className='flex items-center justify-center'>
          <div className='w-[80%]'>
            <SimpleSlider />
          </div>
          <div className='w-[20%]'>
            <div>
              <img src={sliderImage2} className='w-full h-40' alt="" />
            </div>
            <div>
              <img src={sliderImage1} className='w-full h-40' alt="" />
            </div>
          </div>
        </div>

        <CategoriesSlider />

        {/* Fetch Products Button */}
        <button 
          className='bg-blue-500 p-2 rounded-xl w-full mt-5 text-white'
          onClick={refetch}
        >
          Get Products
        </button>

        {/* Products Grid */}
        <div className='grid md:grid-cols-3 lg:grid-cols-6 gap-4 mt-5'>
          {data?.data?.data?.map((product) => (
            <div key={product._id} className='product p-2 group'>

              <div className='relative overflow-hidden'>

                <div onClick={() => handleAddProduct(product._id) } className='cursor-pointer group-hover:translate-x-0 transition-all duration-500 p-2 rounded-xl bg-green-400 absolute top-2 end-2 translate-x-[150%]'>
                  <i className='fa-solid fa-plus'></i>
                </div>

                <Link to={`/productDetails/${product._id}`}> 
                
                  <img src={product.imageCover} className='w-full' alt={product.title} />
                  <h6 className='text-emerald-500'>{product.category.name}</h6>
                  <h2>{product.title.split(' ').slice(0, 2).join(' ')}</h2>

                  <div className='flex justify-between items-center'> 
                    <p>
                      <span className={product.priceAfterDiscount ? 'line-through text-red-500' : ''}>
                        {product.price}
                      </span>
                      {product.priceAfterDiscount && (
                        <span className='ml-1'>{product.priceAfterDiscount}</span>
                      )}
                    </p>
                    <p>
                      <i className='fa-solid fa-star text-yellow-400'></i>
                      {product.ratingsAverage}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}





