
import { useFormik } from "formik";
import * as yup from 'yup';
import { useState } from "react";
 import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";

export default function login() {
  const {setToken} = useContext(authContext);
  const { getUserCart } = useContext(cartContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ isClicked , setIsClicked] = useState(false);
  
let user = {
  password: '',
  email: '',
}

async function loginUser(values)
{
  setIsClicked(true);
 axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
  .then(function(x){
    // console.log("Sah", x.data.token);
    setToken(x.data.token);
    localStorage.setItem('tkn', x.data.token);

    getUserCart();

    setIsSuccess(true);
    setIsClicked(false);
    setTimeout( () => {
      navigate('/')
    }, 2000);

  })

  .catch(function(x){

    setErrorMessage(x.response.data.message);
    setIsClicked(false);
    setTimeout( () => {
      setErrorMessage(null);
    }, 2000);

  });  

}

const registerFormik = useFormik({

 initialValues: user,

 onSubmit: loginUser,

 validationSchema: yup.object().shape({

  password : yup.string().min(6).max(12).required(),
  email: yup.string().email('Invalid Value').required(),

 }),

});

  return (
    <>    

<div className='p-5 '>

      {isSuccess ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      Wellcome Back
      </div> : '' }

    {errorMessage ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {errorMessage}
      </div> : '' }

<h2 className='text-center'> Login Now </h2>

<form onSubmit={registerFormik.handleSubmit} className="max-w-md mx-auto">

  <div className="relative z-0 w-full mb-5 group">
      <input value={registerFormik.values.email} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>

      {registerFormik.errors.email && registerFormik.touched.email ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {registerFormik.errors.email}
      </div> : '' }

  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input value={registerFormik.values.password} onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> password</label>

      {registerFormik.errors.password && registerFormik.touched.password ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {registerFormik.errors.password}
      </div> : '' }

  </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    { !isClicked ? 'Login' :   <ColorRing
  visible={true}
  height="40"
  width="40"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /> }
    

    </button>
</form>


</div>
      
    </>
  )
}
