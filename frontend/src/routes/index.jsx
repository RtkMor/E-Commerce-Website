import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Home from '../pages/Home.jsx';
import App from '../App.jsx';
import Login from '../pages/Login.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import Register from '../pages/Register.jsx';
import AdminPanel from '../pages/AdminPanel.jsx';
import AllUsers from '../pages/AllUsers.jsx';
import AllProducts from '../pages/AllProducts.jsx';
import Profile from '../pages/Profile.jsx'
import Cart from '../pages/Cart.jsx'
import CategoryProduct from '../pages/CategoryProduct.jsx';
import ProductDetails from '../pages/ProductDetails.jsx';
import SearchProducts from '../pages/SearchProducts.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="sign-up" element={<Register />} />
      <Route path="admin-panel" element={<AdminPanel />}>
        <Route path="users" element={<AllUsers />} />
        <Route path="products" element={<AllProducts />} />
      </Route>
      <Route path='search/:query' element={<SearchProducts />} />
      <Route path='profile' element={<Profile />} />
      <Route path='cart' element={<Cart />} />
      <Route path='product-category/:categoryName' element={<CategoryProduct />} />
      <Route path='product/:productName/:productId' element={<ProductDetails />} />
    </Route>
  )
);

export default router;
