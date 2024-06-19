import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'

import Logo from './Logo.jsx'
import { GrSearch } from 'react-icons/gr'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FaCartShopping } from 'react-icons/fa6'

import ApiSummary from '../common/ApiSummary.jsx'
import { setUserDetails } from '../store/userSlice.jsx'

const Header = () => {
  
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const menuDisplayRef = useRef(null);

  const handleLogout = async () => {

    setMenuDisplay(false);

    try {
      const response = await fetch(ApiSummary.logout.url, {
        method: ApiSummary.logout.method,
        credentials: "include"
      })
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Network response was not ok');
      }

      toast.success('Logout successfully!');
      navigate('/');
      dispatch(setUserDetails(null));
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleMenuDisplay = () => {
    if(user){
      setMenuDisplay(prev => !prev)
    }
  }

  const handleClickOutside = (event) => {
    if (menuDisplayRef.current && !menuDisplayRef.current.contains(event.target)) {
      setMenuDisplay(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='h-16 shadow-md bg-white relative z-50'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>

        {/* Logo */}
        <div className='flex-1 flex justify-start'>
          <Link to={'/'}>
            <Logo />
          </Link>
        </div>

        {/* Search Bar */}
        <div className='hidden lg:flex items-center w-full max-w-sm flex-1 border-red-600 border-[1px] rounded-r-full focus-within:shadow-md pl-2'>
          <input type='text' placeholder='search product here..' className='w-full outline-none'/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 hover:bg-red-800 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        {/* Icons */}
        <div className='flex items-center gap-3 sm:gap-7 flex-1 justify-end'>

          <div ref={menuDisplayRef} className='relative flex justify-center'>

            {/* User Icon */}
            {
              user && 
              <div className='text-3xl cursor-pointer' onClick={handleMenuDisplay}>
                {
                  user?.profilePic ? (
                    <img src={user.profilePic} className='min-w-10 min-h-10 w-10 h-10 rounded-full border-red-600 border-2' alt={user?.name} />
                  ) : (
                    <FaRegCircleUser className='min-w-[35px] min-h-[35px] w-[35px] h-[35px] rounded-full' />
                  )
                }
              </div>
            }
            
            
            {/* Admin Panel */}
            {
              menuDisplay && 
              <div className='absolute top-[48px] whitespace-nowrap'>
                <nav className='flex flex-col border-red-600 border-[1px] rounded-lg overflow-hidden text-center'>
                  <Link to={"/profile"} onClick={handleMenuDisplay} className='bg-red-600 p-2 text-white hover:bg-red-800'>Profile</Link>
                  {
                    user?.role === "ADMIN" &&
                    <Link to={"/admin-panel/users"} onClick={handleMenuDisplay} className='bg-white p-2 text-red-600 hover:bg-slate-100'>Admin Panel</Link>
                  }
                </nav>
              </div>
            }  

          </div>

          {/* Shopping Cart */}
          <div className='text-2xl cursor-pointer relative'>
            <span><FaCartShopping /></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>

          {/* Login / Logout Button */}
          {
            user ? (
              <div>
                <button className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 ms-1' onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div>
                <Link to={'/login'} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 ms-1'>Login</Link>
              </div>
            )
          }

        </div>

      </div>
    </header>
  )
};

export default Header;
