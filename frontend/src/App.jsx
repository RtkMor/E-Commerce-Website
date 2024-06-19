import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Context from './context'

import ApiSummary from './common/ApiSummary.jsx'
import { setUserDetails } from "./store/userSlice.jsx";

function App() {

  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    
    const response = await fetch(ApiSummary.current_user.url, {
      method: ApiSummary.current_user.method,
      credentials: 'include'
    })
    
    const dataAPI = await response.json();

    if(dataAPI.success){
      dispatch(setUserDetails(dataAPI.data))
    }
  }

  useEffect(() => {
    // user details
    fetchUserDetails();
  }, [])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,  // fetching the logged in user details
      }} >
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  )
}

export default App;
