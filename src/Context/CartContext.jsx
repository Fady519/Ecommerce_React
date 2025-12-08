import axios from "axios";
//import { createContext } from "react"
import React, { createContext, useEffect, useState } from "react";


export const cartContext = createContext();


export default function CartContextProvider({ children} ) {

  const [allProducts, setAllProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId ] = useState(null);

  function clearUI()
  {
    setAllProducts(null);
    setTotalCartPrice(0);
    setNumOfCartItems(0);
    setCartId(null);
  }

  let headers = {
    token: localStorage.getItem('tkn'),
  }

   async function addProduct(productId)
  {
     return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
      "productId" : productId
    } , {
      headers: {
        token: localStorage.getItem('tkn'),
      },
    })
    .then( (resp) => {    // is Right
      
      // setNumOfCartItems(resp.data.numOfCartItems);
      // setAllProducts(resp.data.data.products);
      // setTotalCartPrice(resp.data.data.totalCartPrice);
      getUserCart();

      return true;

    })
    .catch( (error) => {  // Is Wrong
      console.log(error);

        return false;

    })

  }

    function getUserCart()
  {
      axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers,
    })
    .then( (res) => {    // is Right 
      setNumOfCartItems(res.data.numOfCartItems);
      setAllProducts(res.data.data.products);
      setTotalCartPrice(res.data.data.totalCartPrice);
    })
    .catch( (error) => {  // Is Wrong     
      console.log('error', error);
    })
  }

  function updateCount(productId, newCount)
  {
    axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      "count": newCount,
    }, {
      headers,
    })
    .then( (res) => {
       setNumOfCartItems(res.data.numOfCartItems);
       setAllProducts(res.data.data.products);
       setTotalCartPrice(res.data.data.totalCartPrice);
    })
    .catch( () => {

    })

  }

  async function deleteProduct(pId)
  {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`, {
      headers,
    })
    .then( (res) => {
       setNumOfCartItems(res.data.numOfCartItems);
       setAllProducts(res.data.data.products);
       setTotalCartPrice(res.data.data.totalCartPrice);
       setCartId(res.data.data.totalCartPrice);
       return true;
    })
    .catch( (error) => {
      console.log('error', error);
      return false;
    })
  }

  useEffect( () => {
    getUserCart();
  }
  , []);


  return ( 

    <cartContext.Provider value={ {
      addProduct,
     allProducts,
      totalCartPrice,
       numOfCartItems,
       getUserCart,
       updateCount,
       deleteProduct,
       cartId,
       clearUI,
        } }> 

      { children}


    </cartContext.Provider>

  )
}







