import React, { useEffect, useState } from 'react'
import { createContext } from 'react'


export const authContext = createContext();

// each refresh => will make the token lose it is values
// useEffect => mounting phase


export default function AuthContext({children}) {

    const [token , setToken] =  useState(null);

    useEffect ( () => {
        console.log('refresh');
        const userToken = localStorage.getItem('tkn');
        if(userToken != null)
        {
            setToken(userToken);
        }
    }, [] );

  return (
    <authContext.Provider value={ { token, setToken } }>
      
    {children}



    </authContext.Provider>
  )
}
