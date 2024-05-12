import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'flowbite-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../../images/logo.jpg';
import { NavDropdown } from 'react-bootstrap';

const Navbar = () => {

  const navigate = useNavigate();
  const [propertyList, setPropertyList] = useState([]);


  let user = localStorage.getItem('auth_name');
  const handleLogout = (e) => {
    e.preventDefault();

    axios.post('api/logout').then(res => {
      if(res.data.status === 200){

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');

        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success"
        });
        navigate("/login");
        window.location.reload();
      }

    });
  }

  useEffect(() =>{
    axios.get('api/front/all-type').then(res=>{
        if(res.data.status === 200){
            setPropertyList(res.data.message);
        }
      });
  },[]);

  var AuthButtons = ' ';
  if(!localStorage.getItem('auth_token')){

    AuthButtons = (
      <>
        <Link to='/login'>
          <button className="me-3 btn-login" type="submit">Login</button>
        </Link>
        <Link to='/register'>
          <button className="btn-signUp" type="submit">Sign up</button>
        </Link>

      </>
                    
    );
    
  }else{
    AuthButtons = (
      <>
        <NavDropdown title={user}>
          <NavDropdown.Item>
            <button onClick={handleLogout} type="submit">Logout</button>
          </NavDropdown.Item>
        </NavDropdown>
        
        
      </>
    )

  }
  
    return (
      <div className='main-navbar '>
        <nav className="navbar navbar-expand-lg container">
            <button className="navbar-toggler" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <ul className="navbar-nav ">
              <li className="nav-item ">
                  <a className="nav-link logo-box "  href="#">
                    <img className="logo-home " src={logo} alt="" />
                  </a>
                </li>
            </ul>
            
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ul-navbar">
                {/* <li className="nav-item">
                  <a className="nav-link logo-box "  href="#">
                    <img className="logo-home" src={logo} alt="" />
                  </a>
                </li> */}

                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Property
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href={'/all-property'}>All Property</a></li>
                    {/* <li><a className="dropdown-item" href={'/for-rent'}>For Rent</a></li>
                    <li><a className="dropdown-item" href={'/for-buy'}>For Buy</a></li>
                    <li><a className="dropdown-item" href={'/for-sale'}>For Sale</a></li> */}
                    {
                      propertyList?.map((item,index) => {
                        return (
                          <Link className="dropdown-item" to={`property/${item.id}/${item.name}`}>{item.name}</Link>
                        )
                      })
                    }
                  </ul>
                </li>
                
                <li className="nav-item">
                  <a className="nav-link" href="#">Service</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Blog</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact Us</a>
                </li> 
                {/*<li className="nav-item">
                  <Link to='/contact'>Contact</Link>
                </li>*/}
                
              </ul>
              <div className="d-flex" role="search">
                {AuthButtons}
                
              </div>
            </div>
          
          
        </nav>

        <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>

      </div>
    );
}

export default Navbar;
