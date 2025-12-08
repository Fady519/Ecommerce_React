import {Link, NavLink, useNavigate } from 'react-router-dom';
import freshLogo from '../../assets/Images/download.png';
import { useContext } from 'react';
import { authContext } from '../../Context/AuthContext';

export default function Navbar() {

    const {token, setToken} = useContext(authContext);

    const navigate = useNavigate();

    function handleLogout(){
        localStorage.removeItem('tkn');
        setToken(null);
        navigate('/login');
    }
  return (
    <>

    <nav className='bg-emerald-500 '>

    <div className='container p-3 mx-auto flex items-center justify-between'>

    <div className='flex items-center gap-3'>

        <Link to = ''>
         <img className='w-12' src = {freshLogo} alt = "fresh logo" />
        </Link>

    {token ?  <ul className='flex items-center space-x-4'>
            <li>
                <NavLink to = '/products'> Products </NavLink>
            </li>

            <li>
                <NavLink to = '/categories'> Categories </NavLink>
            </li>

            <li>
                <NavLink to = '/cart'> Cart </NavLink>
            </li>

            <li>
                <NavLink to = '/brands'> Brands </NavLink>
            </li>

        </ul>
        : null}

    </div>

    <div className='flex items-center gap-4'>

    <ul className='flex items-center gap-2'>

        <li>
            <i className='cursor-pointer fa-brands fa-facebook-f'></i>
        </li>

        <li>
            <i className='cursor-pointer fa-brands fa-twitter'></i>
        </li>

        <li>
            <i className='cursor-pointer fa-brands fa-behance'></i>
        </li>

        <li>
            <i className='cursor-pointer fa-brands fa-linkedin'></i>
        </li>

    </ul>

    <ul className='flex items-center gap-2'>
        {token ? <li>
            <span className='cursor-pointer' onClick={handleLogout}> Logout </span>
        </li> :
        <> <li>
            <NavLink to = '/Register'> Register </NavLink>
        </li>

        <li>
            <NavLink to = '/Login'> Login </NavLink>
        </li> </> }



    </ul>


    </div>

        </div>

    </nav>



      
    </>
  )
}
