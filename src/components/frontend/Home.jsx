import React, { useEffect, useState } from 'react';
import home from '../../images/home.jpg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import RateForm from './collections/RateForm';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import Rating from 'react-rating';
import { Card } from 'react-bootstrap';
import Ratings from './collections/Ratings';
import PriceComponent from './collections/PriceComponent';


const Home = () => {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    // view-property
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState([]);
    const [agents, setAgents] = useState([]);

    const [propertyList, setPropertyList] = useState({
        name: '',
        category_id: ' ',
        area_id: ' ',
        image: '',
        price: '',
        bathroom: '',
        bedroom: '',
        type_id: '',
        lat: '',
        lng: '',
        location: '',
        size: '',
        description: '',
        featured: '',
        status: '',
        
    });
    const [area, setArea] = useState([]);
    const [area1, setArea1] = useState([]);
      
    useEffect(() =>{
        
        axios.get('api/front/view-property').then(res=>{
            if(res.data.status === 200){
                setPropertyList(res.data.message);
            }
            setLoading(false);
        });

        // agent-------
        axios.get('api/front/view-agent').then(res=>{
            if(res.data.status === 200){
                setAgents(res.data.message);
            }
        });

        
        axios.get('api/front/view-area').then(res=>{
            if(res.data.status === 200){
                setArea(res.data.message);
                setArea1(res.data.message);
            }
        });

        

        // ratting
        axios.get('/api/ratings')
            .then(response => {
                setRatings(response.data);
            })
            .catch(error => {
                console.error(error);
            });

    },[]);

    if(loading){
        return (
            <>
                <h4>Loading Category...</h4>
            </>
        )
    } 

    

    
    return (
        <div className='main-home'>
            {/* <Navbar/> */}
            

            <section className='container home-slider'>
                <div className="border-nav  m-auto">
                </div>
                <div className="row m-auto ">
                    <div className="col-6 plus">+</div>
                    <div className="col-6 plus home-plus">+</div>
                </div>
                

                <div className="box-slider m-auto">
                    <div className="row box-text-home">
                        <span className='text-home'>
                            We mark your dream come true 
                        </span>
                    </div>
                    <img className="" src={home} alt="" />
                </div>
                <div className="row m-auto ">
                    <div className="col-6 plus">+</div>
                    <div className="col-6 plus home-plus">+</div>
                </div>
                <div className="border-nav  m-auto">
                </div>
            </section>

            <section className='container slider-property'>
                <div className=" text-center">
                    <h3>Property</h3>
                    <Slider {...settings} className='row'>
                        {
                            propertyList?.map((item) => {
                                // if(item.featured === 1){
                                    return (
                                        <div class="col-12">
                                            <div className="bg-primary" key={item.id}>
                                                <p className='text-up'>{item.name}</p>
                                                <img src={`http://127.0.0.1:8000/${item.image}`} class="card-img-top W-100 box-next-slider" alt="..." />
                                            </div>
                                        </div>
                                    )
                                // }
                            })
                            
                        }

                        
                    </Slider>
                </div>
            
            </section>

            <section className='container mt-5 most-property'>
                <h3>Most Bougth Property</h3>
                <div class=" ">
                    <div class="row row-cols-1 row-cols-lg-4 g-2 g-lg-3">
                        {
                            propertyList?.map((item) => {
                                return (
                                    <div class="col col-pos">
                                        <div className="box-card"></div>
                                        <div class="card border-black" key={item.id}>
                                            <span className='text-type m-1'>{item.type.name}</span>
                                            <img src={`http://127.0.0.1:8000/${item.image}`} class="card-img-top box-pro" alt="..." />
                                            <div class="card-body">
                                                
                                                <div className="loc-pri-flex">
                                                    <p><i class="fa-solid fa-location-dot"></i> {item.location}</p>
                                                    <h5 className='text-primary'>$<PriceComponent price={item.price}/> </h5>
                                                </div>

                                                <h5 class="card-title">{item.name}</h5>
                                                {ratings.filter(rating => rating.property_id === item.id).map(rating => (
                                                    <div key={rating.id}>
                                                        <div className="loc-pri-flex">
                                                            <p> Rating: ({rating.rating.toFixed(2)})</p>
                                                            <p><Ratings value={rating.rating} /> </p>
                                                        </div>
                                                        <hr className=' hr-size' />
                                                    </div>
                                                ))}
                                                
                                                <span className='box-rom'>
                                                    <p className='text-size-box'><i class="fa-solid fa-expand"></i>{item.size}</p>
                                                    <p className='text-size-box'><i class="fa-solid fa-bed"></i>{item.bedroom}Bed</p>
                                                    <p className='text-size-box'><i class="fa-solid fa-toilet"></i>{item.bathroom}Bath</p>
                                                </span>

                                                <p class="card-text"></p>
                                                <Link to={`/view_property/${item.id}`} className=''>See Detail</Link>
                                                
                                                


                                            </div>
                                        </div>
                                        
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </section>

            <section className='container mt-5 most-property'>
                <h3>Area</h3>
                <div class=" ">
                    <div class="row row-cols-1 row-cols-lg-3 g-2 g-lg-3">
                        {
                            area?.map((item, index) => {
                                if (item.area.id === 1) {
                                    return (
                                        <div class="col col-pos">
                                            .{item.area.name}
                                            <div className="box-card"></div>
                                            <div class="card border-black" key={item.id}>
                                                <img src={`http://127.0.0.1:8000/${item.image}`} class="card-img-top box-pro" alt="..." />
                                                <div class="card-body">
                                                    
                                                    <div className="loc-pri-flex">
                                                        <p><i class="fa-solid fa-location-dot"></i> {item.location}</p>
                                                        <h5 className='text-primary'>$<PriceComponent price={item.price}/> </h5>
                                                    </div>

                                                    <h5 class="card-title">{item.name}</h5>
                                                    {ratings.filter(rating => rating.property_id === item.id).map(rating => (
                                                        <div key={rating.id}>
                                                            <div className="loc-pri-flex">
                                                                <p> Rating: ({rating.rating.toFixed(2)})</p>
                                                                <p><Ratings value={rating.rating} /> </p>
                                                            </div>
                                                            <hr className=' hr-size' />
                                                        </div>
                                                    ))}
                                                    
                                                    <span className='box-rom'>
                                                        <p className='text-size-box'><i class="fa-solid fa-expand"></i>{item.size}</p>
                                                        <p className='text-size-box'><i class="fa-solid fa-bed"></i>{item.bedroom}Bed</p>
                                                        <p className='text-size-box'><i class="fa-solid fa-toilet"></i>{item.bathroom}Bath</p>
                                                    </span>

                                                    <p class="card-text"></p>
                                                    <Link to={`/view_property/${item.id}`} className=''>See Detail</Link>
                                                    
                                                </div>
                                            </div>
                                            
                                        </div>
                                    )
                                }
                            }).filter(Boolean)[0]
                        }
                        

                        {/*  */}
                        {
                            area1?.map((item, index) => {
                                if (item.area.id === 2) {
                                    return (
                                        <div class="col col-pos">
                                            .{item.area.name}
                                            <div className="box-card"></div>
                                            <div class="card border-black" key={item.id}>
                                                <img src={`http://127.0.0.1:8000/${item.image}`} class="card-img-top box-pro" alt="..." />
                                                <div class="card-body">
                                                    
                                                    <div className="loc-pri-flex">
                                                        <p><i class="fa-solid fa-location-dot"></i> {item.location}</p>
                                                        <h5 className='text-primary'>$<PriceComponent price={item.price}/> </h5>
                                                    </div>

                                                    <h5 class="card-title">{item.name}</h5>
                                                    {ratings.filter(rating => rating.property_id === item.id).map(rating => (
                                                        <div key={rating.id}>
                                                            <div className="loc-pri-flex">
                                                                <p> Rating: ({rating.rating.toFixed(2)})</p>
                                                                <p><Ratings value={rating.rating} /> </p>
                                                            </div>
                                                            <hr className=' hr-size' />
                                                        </div>
                                                    ))}
                                                    
                                                    <span className='box-rom'>
                                                        <p><i class="fa-solid fa-expand"></i>{item.size}</p>
                                                        <p><i class="fa-solid fa-bed"></i>{item.bedroom}Bed</p>
                                                        <p><i class="fa-solid fa-toilet"></i>{item.bathroom}Bath</p>
                                                    </span>

                                                    <p class="card-text"></p>
                                                    <Link to={`/view_property/${item.id}`} className=''>See Detail</Link>
                                                    
                                                </div>
                                            </div>
                                            
                                        </div>
                                    )
                                }
                            }).filter(Boolean)[0]
                        }

                        {/* ========== */}

                        {
                            area?.map((item, index) => {
                                if (item.area.id === 3) {
                                    return (
                                        <div class="col col-pos">
                                            .{item.area.name}
                                            <div className="box-card"></div>
                                            <div class="card border-black" key={item.id}>
                                                <img src={`http://127.0.0.1:8000/${item.image}`} class="card-img-top box-pro" alt="..." />
                                                <div class="card-body">
                                                    
                                                    <div className="loc-pri-flex">
                                                        <p><i class="fa-solid fa-location-dot"></i> {item.location}</p>
                                                        <h5 className='text-primary'>$<PriceComponent price={item.price}/> </h5>
                                                    </div>

                                                    <h5 class="card-title">{item.name}</h5>
                                                    {ratings.filter(rating => rating.property_id === item.id).map(rating => (
                                                        <div key={rating.id}>
                                                            <div className="loc-pri-flex">
                                                                <p> Rating: ({rating.rating.toFixed(2)})</p>
                                                                <p><Ratings value={rating.rating} /> </p>
                                                            </div>
                                                            <hr className=' hr-size' />
                                                        </div>
                                                    ))}
                                                    
                                                    <span className='box-rom'>
                                                        <p><i class="fa-solid fa-expand"></i>{item.size}</p>
                                                        <p><i class="fa-solid fa-bed"></i>{item.bedroom}Bed</p>
                                                        <p><i class="fa-solid fa-toilet"></i>{item.bathroom}Bath</p>
                                                    </span>

                                                    <p class="card-text"></p>
                                                    <Link to={`/view_property/${item.id}`} className=''>See Detail</Link>
                                                    
                                                </div>
                                            </div>
                                            
                                        </div>
                                    ) 
                                }
                            }).filter(Boolean)[0]
                        }

                    </div>
                </div>
            </section>

            {/* agency */}
            <section className='container mt-5 most-property'>
                <div className="">
                <h3 className='text-center'>Our Agency</h3>
                    <div class="row">
                        <div class="col-md-12">
                            {
                                agents?.map((item, index)=>{
                                    return (
                                        <div id="testimonial-slider" class="owl-carousel">
                                            <div class="testimonial">
                                                <div class="pic">
                                                    <img src={`http://127.0.0.1:8000/${item.image}`} className='img-agent' alt="" />
                                                </div>
                                                <div class="testimonial-content">
                                                    <h3 class="title">Mr. {item.name}</h3>
                                                    <p class="description mt-4">
                                                        {item.description}
                                                    </p>
                                                    <Link to={item.url} className='m-3'>Contact Him</Link>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            
                        </div>
                        <div className="mt-3"></div>
                    </div>
                    

                </div>
            </section>

        </div>
    );
}

export default Home;
