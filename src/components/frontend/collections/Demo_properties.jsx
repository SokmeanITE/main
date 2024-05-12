import React, { useEffect, useState } from 'react';
import "../../../assets/css/view_detail.css";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Rating from 'react-rating';
import Ratings from './Ratings';
import PriceComponent from './PriceComponent';


const DemoProperties = ({userId}) => {

    const navigate = useNavigate();
    const {id} = useParams();   
    const [loading, setLoading] = useState(true); 
    const [ratings, setRatings] = useState([]);
    const [propertyList, setPropertyList] = useState([]);
    const [latestPost, setLatestPost] = useState([]);
    const [location, setLocation] = useState([]);
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState({});
    const [comment, setComment] = useState('');
    const [reply, setReply] = useState('');
    


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/comments', {
                user_id: userId,
                property_id: id,
                body: comment
            });
            setComment('');
            setComments([...comments, response.data]);
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/replies', {
                user_id: userId,
                comment_id: id,
                body: reply
            });
            console.log(response.data);
            setReply('');
            setReplies({...replies, [id]: [...(replies[id] || []), response.data]});
        } catch (error) {
            console.error(error);
        }
    };


    const handleRatingChange = (value) => {
        setRating(value);
        axios.post('/api/ratings', {
            user_id: userId,
            property_id: id,
            rating: value
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        });
    }


    useEffect(() =>{           
            axios.get(`api/front/view-property/${(id)}`).then(res=>{
                if(res.data.status === 200){
                    setPropertyList(res.data.message);
                    setLocation(res.data.message);
                }
                
                else if(res.data.status === 400){
                    Swal.fire({
                        title: "Warning",
                        text: res.data.message,
                        icon: "warning"
                    });
                    navigate("/");
                }
                else if(res.data.status === 404){
                    Swal.fire({
                        title: "Warning",
                        text: res.data.message,
                        icon: "warning"
                    });
                    navigate("/");
                }
            });

            // comments

            axios.get('api/comments').then(res=>{
                if(res.status === 200){
                    setComments(res.data.message);
                }
                setLoading(false);
            })
            // ratting
            axios.get('/api/ratings')
            .then(response => {
                setRatings(response.data);
            })
            .catch(error => {
                console.error(error);
            });

            // latest property
            axios.get('api/front/view-property').then(res=>{
                if(res.data.status === 200){
                    setLatestPost(res.data.message);
                }
                setLoading(false);
            });
            

    },[id, userId]);

    if(loading){
        return (
            <>
                <h4>Loading Category...</h4>
            </>
        )
    }


    return (
        <div className=''>
            <div class="blog-single gray-bg">
                <div class="container">
                    <div class="row align-items-start">
                        <div class="col-lg-8 m-15px-tb">
                            {
                                propertyList.map((item) => {
                                    return (
                                        <article class="article" key={item.id}>
                                            <div class="article-img">
                                            <span className='text-type m-2'>{item.type.name}</span>
                                            <img src={`http://127.0.0.1:8000/${item.image}`} class="w-100" height={350} alt="..." />
                                            </div>
                                            <div class="article-title">
                                                <h6><a href="#">Lifestyle</a></h6>
                                                <h2>{item.name}</h2>

                                                <Rating
                                                    initialRating={rating}
                                                    onClick={handleRatingChange}
                                                    emptySymbol="far fa-star "
                                                    fullSymbol="fas fa-star text-warning"
                                                    rating={rating}
                                                    
                                                />

                                                {/* <Ratings rating={rating} onClick={handleRatingChange} initialRating={rating} value={rating}/> */}
                                                <div class="media">
                                                    <div class="avatar">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" title="" alt="" />
                                                    </div>
                                                    <div class="media-body">
                                                        <label>Rachel Roth</label>
                                                        <span>26 FEB 2020</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="article-content">
                                                <p>Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget adipiscing luctus lorem. Adipiscing veni amet luctus enim sem libero tellus viverra venenatis aliquam. Commodo natoque quam pulvinar elit.</p>
                                                <p>Eget aenean tellus venenatis. Donec odio tempus. Felis arcu pretium metus nullam quam aenean sociis quis sem neque vici libero. Venenatis nullam fringilla pretium magnis aliquam nunc vulputate integer augue ultricies cras. Eget viverra feugiat cras ut. Sit natoque montes tempus ligula eget vitae pede rhoncus maecenas consectetuer commodo condimentum aenean.</p>
                                                <h4>What are my payment options?</h4>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                <blockquote>
                                                    <p class="blockquote-footer">Someone famous in <cite title="Source Title">Dick Grayson</cite></p>
                                                </blockquote>

                                                <h3>Our Agency</h3>

                                                <div className="row">
                                                    <div className="col-12">
                                                        <div id="testimonial-slider" class="owl-carousel">
                                                            <div class="testimonial">
                                                                <div class="pic">
                                                                    <img src={`http://127.0.0.1:8000/${item.agent.image}`} height={150} alt="" />
                                                                </div>
                                                                <div class="testimonial-content">
                                                                    <h3 class="title">Mr. {item.agent.name}</h3>
                                                                    <p class="description mt-4">
                                                                        {item.agent.description}
                                                                    </p>
                                                                    <Link to={item.url} className='m-3'>Contact Him</Link>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </article>
                                        
                                    )
                                })
                            }
                            
                            <div class="contact-form mt-4 article-comment">
                                <h4>Location</h4>
                                {
                                    location.map((item, index) => (
                                        <div key={index} className="">
                                            <iframe
                                                key={index}
                                                title={`Map-${index}`}
                                                width="100%"
                                                height="450"
                                                loading="lazy"
                                                allowFullScreen
                                                src={`https://maps.google.com/maps?q=${item.lat},${item.lng}&hl=es;&output=embed`}
                                            ></iframe>
                                        </div>
                                    ))
                                }

                            </div>

                        </div>

                        <div class="col-lg-4 m-15px-tb blog-aside">
                            <div class="widget widget-latest-post">
                                <div class="widget-title">
                                    <h3>Latest Post</h3>
                                </div>
                                <div class="widget-body">
                                    {
                                        latestPost.map((item, index) => {
                                            return (
                                                <div class="latest-post-aside media">
                                                    <div class="lpa-left media-body">
                                                        <div class="lpa-title">
                                                            <h5><a href={`/view_property/${item.id}`}>{item.name}</a></h5>
                                                        </div>
                                                        <div class="lpa-meta">
                                                            <span>
                                                                {item.location}
                                                            </span>&emsp;
                                                            <span class="date" href="#">
                                                                $<PriceComponent price={item.price}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="lpa-right">
                                                        <a href={`/view_property/${item.id}`}>
                                                            <img src={`http://127.0.0.1:8000/${item.image}`} class="" width={400} height={60} alt="..." />
                                                            {/* <img src="https://www.bootdey.com/image/400x200/FFB6C1/000000" title="" alt=""/> */}
                                                        </a>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            

                            {/* <div class="widget widget-tags">
                                <div>
                                    <form onSubmit={handleCommentSubmit}>
                                        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                                        <button type="submit">Add Comment</button>
                                    </form>
                                    {comments.map((item) => {
                                        return (

                                        
                                            <div key={item.id}>
                                                <p>{item.body}</p>
                                                <form onSubmit={(e) => handleReplySubmit(item.id, e)}>
                                                    <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} />
                                                    <button type="submit">Add Reply</button>
                                                </form>
                                                {replies[item.id] && replies[item.id].map(reply => (
                                                    <div key={reply.id}>
                                                        <p>{reply.body}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    })}
                                    
                                </div>
                                


                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DemoProperties;
