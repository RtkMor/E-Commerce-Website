import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Context from './context';
import ApiSummary from './common/ApiSummary.jsx';
import { setUserDetails } from './store/userSlice.jsx';

function App() {
  const dispatch = useDispatch();
  const mainContainerRef = useRef(null);

  // Fetch user details and set user state
  const fetchUserDetails = async () => {
    const response = await fetch(ApiSummary.current_user.url, {
      method: ApiSummary.current_user.method,
      credentials: 'include',
    });
    const dataAPI = await response.json();
    if (dataAPI.success) {
      dispatch(setUserDetails(dataAPI.data));
    }
  };

  // Fetch user details on component mount
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Handle scroll event from admin panel to sync with main container
  const handleAdminPanelScroll = () => {
    mainContainerRef.current.scrollTop = mainContainerRef.current.scrollHeight;
  };

  return (
    <div id="mainContainer" ref={mainContainerRef} className="flex flex-col min-h-screen">
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        <Header />
        <main className="flex-1 overflow-y-auto" onScroll={handleAdminPanelScroll}>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </div>
  );
}

export default App;
