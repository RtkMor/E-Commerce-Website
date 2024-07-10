import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Context from './context';
import ApiSummary from './common/ApiSummary.jsx';
import { setUserDetails } from './store/userSlice.jsx';
import countCartProducts from './helpers/countCartProducts.jsx';

function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const dispatch = useDispatch();
  const mainContainerRef = useRef(null);
  const initialFetch = useRef(true);

  console.log('Backend Domain:', import.meta.env.VITE_BACKEND_DOMAIN);

  // Fetch user details
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

  // Fetch cart products
  const fetchCartProducts = async () => {
    const data = await countCartProducts();
    setCartProducts(data.products);
    const totalQuantity = data.products?.reduce((acc, curr) => acc + curr.quantity, 0);
    setCartQuantity(totalQuantity);
  };

  // Fetch user details
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Fetch cart details once initially and whenever cartProducts or cartQuantity change
  useEffect(() => {
    if (initialFetch.current) {
      fetchCartProducts();
      initialFetch.current = false;
    }
  }, []);

  // Handle scroll event from admin panel to sync with main container
  const handleAdminPanelScroll = () => {
    mainContainerRef.current.scrollTop = mainContainerRef.current.scrollHeight;
  };

  return (
    <div id="mainContainer" ref={mainContainerRef} className="flex flex-col min-h-screen">
      <Context.Provider value={{ 
        fetchUserDetails,
        fetchCartProducts,
        cartProducts,
        cartQuantity
      }}>
        <ToastContainer />
        <Header />
        <main className="flex-1 overflow-y-auto mt-16" onScroll={handleAdminPanelScroll}>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </div>
  );
}

export default App;