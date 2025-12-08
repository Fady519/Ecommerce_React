import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import { cartContext } from "../../Context/CartContext"


export default function Payment() {

    const { cartId, clearUI } = useContext(cartContext);
    const {isOnline, setIsOnline } = useState(false);

    function detectAndCall(values)
    {
            if(isOnline)
            {
                onlinePayment(values);
            }
            else{
                createCasheOrder(values);
            }
    }

    function createCasheOrder(values)
    {
        const backEndBody = {
            shippingAddress: values,
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , backEndBody, { 
            headers: {
                token: localStorage.getItem('tkn')
            }
    })
        .then( (res) => {
            console.log('after cashe order', res);
            clearUI();
        })
        .catch( (err) => {
            console.log('error', err);
        });
    }

    function onlinePayment(values)
    {
        const backEndBody = {
            shippingAddress: values,
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , backEndBody, { 
            headers: {
                token: localStorage.getItem('tkn')
            },
            params: {
                url: 'http://localhost:3333/'
            }
    })
        .then( (res) => {
            console.log('after online order', res);
            window.open(res.data.session.url, '_self');
            //clearUI();
        })
        .catch( (err) => {
            console.log('error', err);
        });
    }

    const PaymentFormik = useFormik({
        initialValues:{
            details: '',
            city: '',
            phone: '',
        },

        onSubmit: detectAndCall,
    })


  return (
    <>

    <div className="container mx-auto p-5">

      <form onSubmit = { PaymentFormik.handleSubmit} className="max-w-md mx-auto">
      
        <div className="relative z-0 w-full mb-5 group">
            <input value={PaymentFormik.values.phone} onBlur={PaymentFormik.handleBlur} onChange={PaymentFormik.handleChange} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone</label>
      
            {PaymentFormik.errors.phone && PaymentFormik.touched.phone ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {PaymentFormik.errors.phone}
            </div> : '' }
      
        </div>
      
        <div className="relative z-0 w-full mb-5 group">
            <input value={PaymentFormik.values.city} onBlur={PaymentFormik.handleBlur}  onChange={PaymentFormik.handleChange} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> city</label>
      
            {PaymentFormik.errors.city && PaymentFormik.touched.city ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {PaymentFormik.errors.city}
            </div> : '' }
      
        </div>

        <div className="relative z-0 w-full mb-5 group">
            <input value={PaymentFormik.values.details} onBlur={PaymentFormik.handleBlur}  onChange={PaymentFormik.handleChange} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> details</label>
      
            {PaymentFormik.errors.details && PaymentFormik.touched.details ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {PaymentFormik.errors.details}
            </div> : '' }
      
        </div>
      
        <button onClick = { () => setIsOnline(false) }  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             
          Cashe Order
      
        </button>

        <button onClick = { () => setIsOnline(true) } type="submit" className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             
          Online Order
      
        </button>


      </form>

       </div>
      
    </>
  )
}
