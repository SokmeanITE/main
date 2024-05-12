import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom';
import PriceComponent from './PriceComponent';
import Ratings from './Ratings';
import axios from 'axios';

const Images = (props) => {
    const {data} = props;
    const [ratings, setRatings] = useState([]);
    const {name} = useParams(); 

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 8;

    useEffect(() =>{

        // ratting
        axios.get('/api/ratings')
            .then(response => {
                setRatings(response.data);
            })
            .catch(error => {
                console.error(error);
            });


        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
        }, [itemOffset,itemsPerPage,data,name]);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % data.length;
            setItemOffset(newOffset);
    };

    return (
            <div className="images container ">
                <div class="row row-cols-1 row-cols-lg-4 g-2 g-lg-3">
                    
                    {currentItems.map(item => {
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
                    // }
                    })}

                    </div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName='pagination'
                        pageClassName='page-num'
                        nextLinkClassName='page-num'
                        activeClassName='active'
                    />
                    <div className="hide">m</div>
                </div>


            
    );
}

export default Images;
