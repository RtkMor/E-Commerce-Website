import React from 'react'
import { Link } from 'react-router-dom'

import Logo from './Logo.jsx'
import { GrSearch } from 'react-icons/gr'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FaCartShopping } from 'react-icons/fa6'

const Header = () => {
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>

        {/* Logo */}
        <div className='flex-1 flex justify-start'>
          <Link to={'/'}>
            <Logo w={100} />
          </Link>
        </div>

        {/* Search Bar */}
        <div className='hidden lg:flex items-center w-full max-w-sm flex-1 border rounded-r-full focus-within:shadow-md pl-2'>
          <input type='text' placeholder='search product here..' className='w-full outline-none'/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 hover:bg-red-800 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        {/* Icons */}
        <div className='flex items-center gap-3 sm:gap-7 flex-1 justify-end'>

          {/* User Icon */}
          <div className='text-3xl cursor-pointer'>
            <FaRegCircleUser />
          </div>

          {/* Shopping Cart */}
          <div className='text-2xl cursor-pointer relative'>
            <span><FaCartShopping /></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>

          {/* Login Button */}
          <div>
            <Link to={'/login'} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 ms-1'>Login</Link>
          </div>

        </div>

      </div>
    </header>

  )
};

export default Header;