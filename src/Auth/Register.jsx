import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.jpg'
import Navbar from '../components/frontend/Navbar';


const Register = () => {

    const navigate = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    })

    const handleInput = (e) => {
        e.preventDefault();
        setRegister({...registerInput, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation,
        }

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/register', data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);

                    Swal.fire({
                        title: "Success",
                        text: res.data.message,
                        icon: "success"
                    });
                    navigate("/login");
                }
                else{
                    setRegister({...registerInput, error_list:res.data.validation_error});
                }
            })
        });

    }

    return (
        <>
        <Navbar/>

            <div className="container form-login">
                <form onSubmit={handleSubmit} className='container'>
                
                    <div className="text-center">
                        <a className="nav-link  logo-login-box m-auto"  href="#">
                            <img className="logo-login" src={logo} alt="" />
                        </a>
                        <p className='p-login'>Sign up to your account</p>
                    </div>

                    <div class="form-group row mt-5">
                        <label for="name" class="col-sm-3 col-form-label">Username <span className='text-danger'>*</span></label>
                        <div class="col-sm-9 ">
                            <input type="name" name="name" onChange={handleInput} value={registerInput.name} class="form-control" id="name" placeholder="username" />
                            <span className='text-danger'>{registerInput.error_list.name} </span>
                        </div>
                    </div>

                    <div class="form-group row mt-3">
                        <label for="email" class="col-sm-3 col-form-label">Email <span className='text-danger'>*</span></label>
                        <div class="col-sm-9 ">
                            <input type="email" name="email" onChange={handleInput} value={registerInput.email} class="form-control" id="email" placeholder="email" />
                            <span className='text-danger'>{registerInput.error_list.email} </span>
                        </div>
                    </div>

                    <div class="form-group row mt-3">
                        <label for="inputPassword" class="col-sm-3 col-form-label">Password <span className='text-danger'>*</span></label>
                        <div class="col-sm-9">
                            <input type="password" name='password' onChange={handleInput} value={registerInput.password} class="form-control" id="inputPassword" placeholder="password" />
                            <span className='text-danger'>{registerInput.error_list.password} </span>
                        </div>
                    </div>

                    <div class="form-group row mt-3">
                        <label for="inputPassword" class="col-sm-3 col-form-label">Confirm <span className='text-danger'>*</span></label>
                        <div class="col-sm-9">
                            <input type="password" name='password_confirmation' onChange={handleInput} value={registerInput.password_confirmation} class="form-control" id="password_confirmation" placeholder="confirm-password" />
                            <span className='text-danger'>{registerInput.error_list.password_confirmation} </span>
                        </div>
                    </div>

                    <div className="text-center mt-3">
                        <button className='btn btn-outline-success'>Sign Up</button>
                    </div>
                </form>
            </div>



            {/* <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6" >
                        <div>
                            <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <input id="name" onChange={handleInput} value={registerInput.name} name="name" type="name" autocomplete="name" required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            <span className='text-red-600 text-sm'>{registerInput.error_list.name} </span>
                        </div>

                        <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <input id="email" onChange={handleInput} value={registerInput.email} name="email" type="email" autocomplete="email" required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            <span className='text-red-600 text-sm'>{registerInput.error_list.email} </span>
                        </div>

                        <div>
                            <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <input id="password" onChange={handleInput} value={registerInput.password} name="password" type="password" autocomplete="current-password" required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            <span className='text-red-600 text-sm'>{registerInput.error_list.password} </span>
                        </div>

                        <div>
                            <label for="" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            <input id="confirm" onChange={handleInput} value={registerInput.password_confirmation} name="password_confirmation" type="password" autocomplete="curent-password"  required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign up</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                    </p>
                </div>
            </div> */}
        </>
    );
}

export default Register;
