import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, redirect, useNavigate, Navigate, useLocation, Outlet } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import MasterLayout from './layout/admin/MasterLayout';
import axios from 'axios';
import Navbar from './components/frontend/Navbar';
import NotFound from './components/NotFound';
import AdminPrivateRoute from './AdminPrivateRoute';
import Dashboard from './components/admin/Dashboard';
import './assets/admin/css/main.css'
import Home from './components/frontend/Home';
import PublicRoute from './PublicRoute';
import FrontendLayout from './layout/frontend/FrontendLayout';



axios.defaults.baseURL= 'http://127.0.0.1:8000/';
// axios.defaults.baseURL= 'https://back-end-real-estate-4fjw-cshqi0dpe-momviseus-projects.vercel.app/api/';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '' ;
  return config;
})


const App = () => {

  function action() {
    return redirect("/register");
  }

  const [token, setToken] = useState(localStorage.getItem('auth_token'));

  const isLoggedIn = localStorage.getItem('auth_token') ? true : false;

  const wrapPrivateRoute = (element, user, redirect) => {
    return (
      <AdminPrivateRoute user={user} redirect={redirect}>
        {element}
      </AdminPrivateRoute>
    );
  };
  
  
  return (
    <div>
      <BrowserRouter>      
        <Routes>

          {/* <Route path='*' element={<NotFound />}/> */}
          {/* <Route path='/' element={<Home/>} /> */}
          
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login/>} />
          <Route path="/register" element={token ? <Navigate to="/" /> : <Register/>} />

          {/* <PublicRoute path='/' name="Home" /> */}
          <Route path="/*" element={<FrontendLayout/>} />

          
          <Route path="/admin/*" element={wrapPrivateRoute(<MasterLayout />, isLoggedIn, 'profile')} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}



export default App;

export const PrivateRoute = ({  children }) => {
  const login = JSON.parse(localStorage.getItem('auth_token'))
  const location = useLocation();
  if (login) {
       return (
      children ? children : <Outlet />
  )
  }return <Navigate to='/login' state={location} />
 
}





// =========================================================================

{/* <Route path="/" element={<div>Default Page Content</div>} /> */}
{/* <Route path="/admin/*" element={<MasterLayout />} /> */}

{/* <Route path="/admin/*" role="admin" element={<AdminPrivateRoute><MasterLayout /></AdminPrivateRoute>} /> */}


{/* <Route element={<PrivateRoute/>}>
        <Route path="/admin/*"  element={<MasterLayout />} />
    </Route> */}

{/* <Route path="/admin/*" element={<MasterLayout />} /> */}