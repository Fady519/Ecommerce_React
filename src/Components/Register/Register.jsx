
import { useFormik } from "formik";
import * as yup from 'yup';
import { useState } from "react";
 import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";



export default function Register() {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ isClicked , setIsClicked] = useState(false);
  
let user = {
  name: '',
  phone: '',
  password: '',
  rePassword: '',
  email: '',
}

async function registerUser(values)
{
  setIsClicked(true);
 axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
  .then(function(x){

    setIsSuccess(true);
    setIsClicked(false);
    setTimeout( () => {
      navigate('/login')
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

 onSubmit: registerUser,

//  validate: function(allData){

//   const errors = {};                       // to store errors
//   const nameRegex = /^[A-Z][a-z]{4, 8}$/;  // regex on name
//   const phoneRegex = /^(20)01[0125][0-9]{8}$/;  // regex on phone

//   if(nameRegex.test(allData.name) == false)   // Check Name Regex
//   {
//     errors.name = "name must start with capital letters";
//   }

//   if(phoneRegex.test(allData.phone) == false)   // Check phone Regex
//   {
//     errors.name = "Phone Number must be ejyption number";
//   }

//   if(allData.email.includes('@') == false || allData.email.includes('.') == false)   // Check email Regex
//   {
//     errors.email = "Invalid Email";
//   }

//   if(allData.password.length < 6 || allData.password.length > 12)   // Check password Regex
//   {
//     errors.password = "Invalid password";
//   }  

//   if(allData.password !== allData.rePassword)   // Check rePassword Regex
//   {
//     errors.rePassword = "password and rePassword Not Match";
//   }

//   console.log(errors);
//   return errors;
//  },


 validationSchema: yup.object().shape({

  name : yup.string().required("Name Is Required").min(3, "Minmum must be 3 Charactters").max(12, "max must be 12 Characters"),
  phone : yup.string().required('Phone Required').matches(/^01[0125][0-9]{8}$/),
  password : yup.string().min(6).max(12).required(),
  rePassword: yup.string().required().oneOf([yup.ref('password')], "rePasword not match password"),
  email: yup.string().email('Invalid Value').required(),

 }),

});



  return (
    <>    

<div className='p-5 '>

      {isSuccess ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      Congratulations
      </div> : '' }

    {errorMessage ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {errorMessage}
      </div> : '' }

<h2 className='text-center'> Register Now </h2>

<form onSubmit={registerFormik.handleSubmit} className="max-w-md mx-auto">

  <div className="relative z-0 w-full mb-5 group">
      <input value={registerFormik.values.name} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Name </label>

      {registerFormik.errors.name && registerFormik.touched.name ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {registerFormik.errors.name}
      </div> : '' }

  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input value={registerFormik.values.email} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>

      {registerFormik.errors.email && registerFormik.touched.email ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {registerFormik.errors.email}
      </div> : '' }

  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input value={registerFormik.values.phone} onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Phone</label>

       {registerFormik.errors.phone && registerFormik.touched.phone ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {registerFormik.errors.phone}
      </div> : '' }

  </div>
  
  <div className="relative z-0 w-full mb-5 group">
      <input value={registerFormik.values.password} onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> password</label>

      {registerFormik.errors.password && registerFormik.touched.password ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {registerFormik.errors.password}
      </div> : '' }

  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input value={registerFormik.values.rePassword} onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> rePassword</label>

      {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {registerFormik.errors.rePassword}
      </div> : '' }

  </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    { !isClicked ? 'Submit' :   <ColorRing
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
