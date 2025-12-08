import axios from 'axios'
import React from 'react'
// import { useQuery } from 'react-query';
import { useQuery } from '@tanstack/react-query';
import { FallingLines } from 'react-loader-spinner';
import useAllCategories from '../../CustomHooks/useAllCategories';

export default function Categories() {

  // function getAllCategories()
  // {
  //   return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  // }

  // const {isLoading, isError, data} = useQuery({
  //   queryKey: 'allCategories',
  //   queryFn: getAllCategories,
  // })

   const {isError, isLoading, data} = useAllCategories();

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

    <div className='container py-5 mx-auto'>

      <div className=' grid grid-cols-4 gap-5'>

        {data.data.data.map(brand => <div key={brand._id} className='brand rounded-xl bg-blue-200'>

          <img src={brand.image} alt={brand.name} className='w-full' />
          <h2> {brand.name} </h2>

        </div> ) }



      </div>

    </div>

    </>
  )
}

