import React, { useEffect, useState } from 'react';
import Images from './Images';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormSearch from './FormSearch';


const Properties = () => {
    const {id} = useParams(); 
    const [loading, setLoading] = useState(true);
    const [propertyList, setPropertyList] = useState([]);
    const [property, setProperty] = useState([]);

    useEffect(() =>{
        axios.get(`api/front/type-property/${id}`).then(res=>{
            if(res.data.status === 200){
                setPropertyList(res.data.message);
            }
            setLoading(false);
        });

        axios.get(`api/front/all-property/${id}`).then(res=>{
            if(res.data.status === 200){
                setProperty(res.data.message);
            }
        });

    },[id]);

    if(loading){
        return (
            <>
                <h4>Loading Category...</h4>
            </>
        )
    }else if(id) {
        return (
            <div className='main-home'>
                <section className='container'>
                    <FormSearch/>
                </section>
                
                <section className='container mt-3'>
                    <Images data={propertyList} />
                    
                </section>   
            </div>
        )
        
    } else {
        return (
            <div className='main-home'>
                <section className='container'>
                    <FormSearch/>
                </section>
                <section className='container mt-3'>
                    <Images data={property} />
                    
                </section>   
            </div>
        )
    }

    
}

export default Properties;
