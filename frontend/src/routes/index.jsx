import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Home from '../pages/Home.jsx'
import App from '../App.jsx';
import Login from '../pages/Login.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import Register from '../pages/Register.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App />} >
        <Route path='' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/sign-up' element={<Register />} />
      </Route>
  )
);

export default router;
