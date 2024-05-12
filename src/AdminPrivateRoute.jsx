import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import MasterLayout from './layout/admin/MasterLayout';
import axios from 'axios';
import Swal from 'sweetalert2';


const AdminPrivateRoute = ({ user, children, redirect }) => {

    const navigate = useNavigate();

    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/checkingAuthenticated').then( res => {
            if(res.status === 200){
                setAuthenticated(true);
            }
            setLoading(false);
        });

        return () => {
            setAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(
        function (response) {
          if (response.data) {
            // return success
            if (response.status === 200) {
              return response;
            }
            // reject errors & warnings
            return Promise.reject(response);
          }
    
          // default fallback
          return Promise.reject(response);
        },
        function (err) {
            Swal.fire({
                title: "403 Unautorized",
                text: err.response.message,
                icon: "warning"
            });
            navigate("/403");
          // if the server throws an error (404, 500 etc.)
          return Promise.reject(err);
        }
      );

    // // admin
    // axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
    //     if(err.response.status === 400){
    //         Swal.fire({
    //             title: "Unautorized",
    //             text: err.respons.message,
    //             icon: "warning"
    //         });
    //         navigate("/");
    //     }
    //     return Promise.reject(err);
    // });

    // // user
    // axios.interceptors.response.use(function (res){
    //         return res;
            
    //     }, function (err){
    //         if(err.res.status === 403){
                
                
    //             Swal.fire({
    //                 title: "Forbidden",
    //                 text: err.res.message,
    //                 icon: "warning"
    //             });
    //             // navigate("/");
    //         }
    //         else if(err.res.status === 400){
    //             alert(2);
    //             // navigate("/jjj");
    //         }
    //         return Promise.reject(err);
    //     }
    // );


    if(loading){
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }


    // const authenticate = localStorage.getItem('auth_token') ? true : false;
    const location = useLocation();
    return Authenticated ? (
        children
        ) : (
        <Navigate
            to={`/login?redirect=${encodeURIComponent(redirect || location.pathname)}`}
        />
    );
}

export default AdminPrivateRoute;
