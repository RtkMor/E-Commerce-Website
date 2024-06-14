import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Home from '../pages/Home.jsx'
import App from '../App.jsx';
import Login from '../pages/Login.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App />} >
        <Route path='' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Route>
  )
);

export default router;
