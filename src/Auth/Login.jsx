import axios from 'axios';
import React, { useState } from 'react';
// import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import logo from '../images/logo.jpg'
import Navbar from '../components/frontend/Navbar';
import { GoogleLoginButton } from 'react-social-login-buttons';

const Login = () => {

  const navigate = useNavigate();

  const [loginInput, setLogin] = useState({
      email: '',
      password: '',
      error_list: [],
  })

  const handleInput = (e) => {
      e.preventDefault();
      setLogin({...loginInput, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      const data = {
          email: loginInput.email,
          password: loginInput.password,
      }

      axios.get('/sanctum/csrf-cookie').then(response => {
          axios.post('api/login', data).then(res => {
              if(res.data.status === 200){
                  localStorage.setItem('auth_token', res.data.token);
                  localStorage.setItem('auth_name', res.data.username);
                  // console.log('name', name) // undefined

                  Swal.fire({
                      title: "Success",
                      text: res.data.message,
                      icon: "success"
                  });

                  if(res.data.role === 'admin'){
                    navigate("/admin/");

                  }
                  else{
                    navigate("/");
                  }
                  

              }
              else if(res.data.status === 400){
                Swal.fire({
                  title: "Warning",
                  text: res.data.message,
                  icon: "warning"
              });

              }
              else{
                  setLogin({...loginInput, error_list:res.data.validation_error});
                  
              }
          })
      });

  }

    return (
      <>
        <Navbar/>
        <div className="container form-login">
          
          <form onSubmit={handleSubmit} className='container w-100'>
            <div className="text-center">
              <a className="nav-link  logo-login-box m-auto"  href="#">
                <img className="logo-login" src={logo} alt="" />
              </a>
              <p className='p-login'>Login to your account</p>
            </div>

            <div class="form-group row mt-5">
              <label for="email" class="col-sm-3 col-xs-3 col-form-label">Email <span className='text-danger'>*</span></label>
              <div class="col-sm-9 col-xs-9">
                <input type="email" name="email" onChange={handleInput} value={loginInput.email} class="form-control" id="email" placeholder="email" />
                <span className='text-danger'>{loginInput.error_list.email} </span>
              </div>
            </div>

            <div class="form-group row mt-3">
              <label for="inputPassword" class="col-sm-3 col-xs-3 col-form-label">Password <span className='text-danger'>*</span></label>
              <div class="col-sm-9 col-xs-9">
                <input type="password" name='password' onChange={handleInput} value={loginInput.password} class="form-control" id="inputPassword" placeholder="password" />
                <span className='text-danger'>{loginInput.error_list.password} </span>
              </div>
            </div>

            <div className="text-center mt-3">
              <button className='btn btn-outline-success'>Login</button>
            </div>

            <GoogleLoginButton onClick={() => alert("Hello")} />

          </form>
        </div>
      </>


        // <div className='' id='wrapper'>
        //   <div class="scrollbar" id="style-3">
        //     <div class="force-overflow">
        //       <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        //         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        //           <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
        //           <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        //         </div>

        //         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        //           <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
        //             <div>
        //               <label  className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        //               <div className="mt-2">
        //                 <input onChange={handleInput} value={loginInput.email} id="email" name="email" type="email"  required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        //                 <span className='text-red-600 text-sm'>{loginInput.error_list.email} </span>
        //               </div>
        //             </div>

        //             <div>
        //               <div className="flex items-center justify-between">
        //                 <label  className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        //                 <div className="text-sm">
        //                   <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
        //                 </div>
        //               </div>
        //               <div className="mt-2">
        //                 <input onChange={handleInput} value={loginInput.password} id="password" name="password" type="password"  required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        //                 <span className='text-red-600 text-sm'>{loginInput.error_list.password} </span>
        //               </div>
        //             </div>

        //             <div>
        //               <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        //             </div>
        //           </form>

        //           <p className="mt-10 text-center text-sm text-gray-500">
        //             Not a member?
        //             <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
        //           </p>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
            
        // </div>
    );
}

export default Login;
