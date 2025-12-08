import { createBrowserRouter, PrefetchPageLinks, RouterProvider } from 'react-router-dom';

import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Layout from './Components/Layout/Layout';
import Products from './Components/Products/Products';
import AuthContext from './Context/AuthContext';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import ProtectedRoute from './Components/Test/Test';
//  import { QueryClient, QueryClientProvider } from "react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './Components/Payment/Payment';
// import { Offline } from 'react-detect-offline';



// const router = createBrowserRouter([
//   {
//     path: '' , element: <Layout /> , children: [

//       {path : 'true', element: <ProtectedRoute>
//          < Products />
//          </ProtectedRoute>},

//       {path : 'products', element: <ProtectedRoute>
//          < Products />
//          </ProtectedRoute>},

//       {path: 'Cart', element: <ProtectedRoute> 
//        < Cart /> 
//        </ProtectedRoute>},

//       {path: 'Categories', element:<ProtectedRoute> 
//         < Categories />
//         </ProtectedRoute>},

//       {path: 'ProductDetails/:id', element:<ProtectedRoute> 
//         < ProductDetails />
//         </ProtectedRoute>},

//       {path: 'Brands', element: <ProtectedRoute>
//          < Brands />
//          </ProtectedRoute>},

//       {path: 'Payment', element: <ProtectedRoute>
//          < Payment />
//          </ProtectedRoute>},

//       { path: 'register', element: <Register /> },

//       { path: 'login', element: <Login /> },  

//       { path: '*', element: <NotFound /> },

//     ],

//   },

// ]);

const router = createBrowserRouter(
  [
    {
      path: '', 
      element: <Layout />, 
      children: [

        {path : 'true', element: <ProtectedRoute> <Products /> </ProtectedRoute>},

        {path : 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute>},

        {path: 'Cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute>},

        {path: 'Categories', element:<ProtectedRoute> <Categories /> </ProtectedRoute>},

        {path: 'ProductDetails/:id', element:<ProtectedRoute> <ProductDetails /> </ProtectedRoute>},

        {path: 'Brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute>},

        {path: 'Payment', element: <ProtectedRoute> <Payment /> </ProtectedRoute>},

        { path: 'register', element: <Register /> },

        { path: 'login', element: <Login /> },  

        { path: '*', element: <NotFound /> },

      ],
    },
  ],
  {
    basename: "/Ecommerce_React"
  }
);


const reactQueryConfig = new QueryClient();

export default function App() {

  return( 
  <>
  
  <AuthContext>

    <QueryClientProvider client = { reactQueryConfig }>

      <CartContextProvider>

        <RouterProvider router={router} />

        < Toaster />

        {/* <Offline>

           <div className='bg-black text-white rounded-xl p-5 text-center fixed bottom-5 left-5'>
            <h1> Internet Corruptted </h1>
           </div>
            
        </Offline> */}

      </CartContextProvider>

    </QueryClientProvider>

  </AuthContext >

  
  </>
  )
}







