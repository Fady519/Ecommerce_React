import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner';
import { cartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';


export default function ProductDetails() {

  const {id} = useParams();

  const {addProduct} = useContext(cartContext)

  async function handleAddProduct(id)
  {
    const resFlag = await addProduct(id);

    if(resFlag)
    {
        //toast('Product Added Successfully');
        toast.success('Product Added Successfully', {
          position: 'top-right',
          duration: 3000,
        })
    }
    else
    {
       // toast('Addeding Produt Error');
          toast.error('Addeding Produt Error', {
          position: 'top-right',
          duration: 3000,
        })
    }

  }

  function getProductsDetails()
  {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

  }

  const {data, isError, isLoading} = useQuery({

    queryKey: ['productDetails', id],
    queryFn: getProductsDetails,

  });

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
 
  const objectDetails = data.data.data;

  return (
    <>

    <div className=' container mx-auto p-5 flex items-center justify-between'>

        <div className='w-1/4'>
        
            <img src= {objectDetails.imageCover} alt={objectDetails.title} className='w-full' />


        </div>

        <div className='w-[70%]'>

            <h1>{objectDetails.title}</h1>
            <p>{objectDetails.description}</p>
            <h5>Category: {objectDetails.category.name}</h5>
            <h5>Price: {objectDetails.price}</h5>

            <button onClick={ () => handleAddProduct(objectDetails._id) } className='bg-green-500 p-5 rounded-xl w-full'> +add product to cart </button>

        </div>

    </div>
      
    </>
  )
}
