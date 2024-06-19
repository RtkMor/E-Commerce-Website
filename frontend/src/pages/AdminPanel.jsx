import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { FaRegCircleUser, FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const AdminPanel = () => {

  const user = useSelector(state => state?.user?.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='min-h-[calc(100vh-120px)] flex relative'>

      {/* Sidebar */}
      <aside className={`min-h-full md:min-w-60 max-w-60 bg-white customShadow absolute md:relative transition-all duration-300 
        ${isSidebarOpen ? 'w-full' : 'w-0'}`}>

        <div className={`min-h-44 flex flex-col gap-1 justify-center items-center bg-red-400 hover:bg-red-600 text-white ${!isSidebarOpen && 'hidden md:flex'}`}>
          {user?.profilePic ? (
            <img src={user.profilePic} className='min-w-20 min-h-20 w-32 h-32 rounded-full border-red-600 border-2' alt={user?.name} />
          ) : (
            <FaRegCircleUser className='min-w-20 min-h-20 w-28 h-28 rounded-full' />
          )}
          <p className={`capitalize text-lg ${!isSidebarOpen && 'hidden md:block'}`}>{user?.name}</p>
        </div>
        
        <nav className={`flex flex-col items-center text-lg text-center ${!isSidebarOpen && 'hidden md:flex'}`}>
          <NavLink to="users" 
                  className={({ isActive }) => `w-full p-2 hover:bg-red-600 hover:text-white ${isActive ? 'text-red-800 font-bold underline' : ''}`}>
            Users
          </NavLink>
          <NavLink to="products"
                  className={({ isActive }) => `w-full p-2 hover:bg-red-600 hover:text-white ${isActive ? 'text-red-800 font-bold underline' : ''}`}>
            Products
          </NavLink>
        </nav>
        
      </aside>

      <button
        className='h-100 fixed top-1/2 transform -translate-y-1/2 md:left-0 md:hidden z-50 bg-white p-2 customShadow'
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </button>

      <main className={`w-full h-full p-4 overflow-x-auto`}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;
