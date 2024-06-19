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
      <Route path='profile' element={<Profile />} />
    </Route>
  )
);

export default router;
