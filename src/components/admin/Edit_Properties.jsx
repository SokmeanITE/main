import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';



const Edit_Properties = () => {

    const navigate = useNavigate();
    const {id} = useParams();    
    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(false);
    const [allCategory, setAllCategory] = useState([]);
    const [allArea, setAllArea] = useState([]);
    const [allType, setAllType] = useState([]);
    const [allAgent, setAllAgent] = useState([]);
    const [errorList,setError] = useState([]);
    const [propertyInput, setPropertyInput] = useState({
        name: '',
        category_id: ' ',
        area_id: '',
        agent_id: '',
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
        // featured: '',
        // status: '',
        
    });
    const [picture, setPicture] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setPropertyInput({...propertyInput, [e.target.name]: e.target.value});
    }

    const[errorImage, setErrorImage] = useState(null);
    const handleImage = (e) =>{
        
        const selectedFile = e.target.files[0];
        const maxSize = 3 * 1024 * 1024; // 2MB
    
        if (selectedFile.size <= maxSize) {
            setPicture({image: e.target.files[0]});
            setErrorImage(null);
        } else {
            setErrorImage(' maximum size of 3MB.');
        }
    }

    const [allCheckbox, setAllCheckbox] = useState([]);
    const handleChecked = (e) =>{
        setAllCheckbox({...allCheckbox, [e.target.name]:e.target.checked});
    }

    useEffect(() =>{        

        // api category
        axios.get('api/all-category')
            .then(res => {
                if (res.data.status === 200) {
                    setAllCategory(res.data.category);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        // api all agent
        axios.get('api/all-agent')
            .then(res => {
                if (res.data.status === 200) {
                    setAllAgent(res.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching agent:', error);
            });

        // api area
        axios.get('api/all-area')
            .then(res => {
                if (res.data.status === 200) {
                    setAllArea(res.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching area:', error);
            });

        // api type
        axios.get('api/allType')
        .then(res => {
            if (res.data.status === 200) {
                setAllType(res.data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching types:', error);
        });

        // get id
        axios.get(`api/edit-property/${(id)}`).then(res=>{
            if(res.data.status === 200){
                setPropertyInput(res.data.property);
                setAllCheckbox(res.data.property);
            }
            
            else if(res.data.status === 400){
                Swal.fire({
                    title: "Warning",
                    text: res.data.message,
                    icon: "warning"
                });
                navigate("/admin/view-propertyInput");
            }
            setLoading(false);
        });


    },[id]);

    const submitPropertyInput = (e) => {
        e.preventDefault();
        const form = e.target;
    
        //check validate style
        if (!form.checkValidity()) {
        e.stopPropagation();
        }
        setValidated(true);

        const formData =  new FormData();
        formData.append('image', picture.image);
        formData.append('category_id', propertyInput.category_id);
        formData.append('area_id', propertyInput.area_id);
        formData.append('agent_id', propertyInput.agent_id);
        formData.append('price', propertyInput.price);
        formData.append('name', propertyInput.name);
        formData.append('bathroom', propertyInput.bathroom);
        formData.append('bedroom', propertyInput.bedroom);
        formData.append('type_id', propertyInput.type_id);
        formData.append('lat', propertyInput.lat);
        formData.append('lng', propertyInput.lng);
        formData.append('location', propertyInput.location);
        formData.append('size', propertyInput.size);
        formData.append('description', propertyInput.description);
        formData.append('featured', allCheckbox.featured ? 1 : 0);
        formData.append('status', propertyInput.status ? 1 : 0);

        axios.post(`api/update-property/${id}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then(res => {
            if(res.data.status === 200){
                
                Swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: "success"
                });
                setError([]);
            }
            else if(res.data.status === 400){
                setError(res.data.validation_error);
            }
        })

    };

    
    
    
    if(loading){
        return (
            <>
                <h4>Loading edit PropertyInput...</h4>
            </>
        )
    } 
    


    

    return (
        <div>
            <div class="container-fluid">
                <form id="myForm" onSubmit={submitPropertyInput}  className={`row g-3 needs-validation ${validated ? 'was-validated is-valid' : ''}`} noValidate>
                    <div class="col-md-3">
                        <label for="name">Name:</label>
                        <input type="text" class="form-control" name='name' onChange={handleInput} value={propertyInput.name} id="name" required />
                        <div class="invalid-feedback"> {errorList.name}</div>
                    </div>

                    <div class="col-md-3">
                        <label for="category_id" class="form-label">Category</label>
                        <select class="form-select " name='category_id' onChange={handleInput} value={propertyInput.category_id} id="category_id" aria-describedby="validationServer04Feedback" required >                            
                            <option value="">Select a category</option>
                                {
                                    allCategory.map((item) =>{
                                        return (
                                            <option key={item.id} value={item.id} >{item.name_slug}</option>
                                        )
                                    })
                                }
                            
                        </select>
                        <div id="validationServer04Feedback" class="invalid-feedback">{errorList.category_id}</div>
                    </div>

                    <div class="col-md-3">
                        <label for="agent_id" class="form-label">Agent</label>
                        <select class="form-select " name='agent_id' onChange={handleInput} value={propertyInput.agent_id} id="category_id" aria-describedby="validationServer04Feedback" required >                            
                            <option value="">Select a category</option>
                                {
                                    allAgent.map((item) =>{
                                        return (
                                            <option key={item.id} value={item.id} >{item.name}</option>
                                        )
                                    })
                                }
                            
                        </select>
                        <div id="validationServer04Feedback" class="invalid-feedback">{errorList.category_id}</div>
                    </div>

                    <div class="col-md-3">
                        <label for="area_id" class="form-label">Area</label>
                        <select class="form-select " name='area_id' onChange={handleInput} value={propertyInput.area_id} id="area_id" aria-describedby="validationServer04Feedback" required >                            
                            <option value="">Select a area</option>
                                {
                                    allArea.map((item) =>{
                                        return (
                                            <option key={item.id} value={item.id} >{item.name}</option>
                                        )
                                    })
                                }
                            
                        </select>
                        <div id="validationServer04Feedback" class="invalid-feedback">{errorList.area_id}</div>
                    </div>

                    <div class="col-md-4">
                        <label for="price">Price:</label>
                        <input type="text" class="form-control" name='price' onChange={handleInput} value={propertyInput.price} id="price"  required />
                        <div class="invalid-feedback">{errorList.price}</div>
                    </div>

                    
                    <div class="col-md-4">
                        <label for="bedroom" class="form-label">bedroom</label>
                        <input type="text"  class="form-control" name='bedroom' onChange={handleInput} value={propertyInput.bedroom} id="bedroom" required />
                        <div class="invalid-feedback">{errorList.bedroom}</div>
                    </div>

                    <div class="col-md-4">
                        <label for="bathroom" class="form-label">bathroom</label>
                        <input type="text" class="form-control" name='bathroom' onChange={handleInput} value={propertyInput.bathroom} id="bathroom" required />
                        <div class="invalid-feedback">{errorList.bathroom}</div>
                    </div>

                    <div class="col-md-4">
                        <label for="lat" class="form-label">Latitude</label>
                        <input type="text"  class="form-control" name='lat' onChange={handleInput} value={propertyInput.lat} id="lat" required />
                        <div class="invalid-feedback">{errorList.lat}</div>
                    </div>

                    <div class="col-md-4">
                        <label for="lng" class="form-label">Longitude</label>
                        <input type="text" class="form-control" name='lng' onChange={handleInput} value={propertyInput.lng} id="lng" required />
                        <div class="invalid-feedback">{errorList.lng}</div>
                    </div>

                    

                    <div class="col-md-4">
                        <label for="type_id" class="form-label">Type</label>
                        <select class="form-select " name='type_id' onChange={handleInput} value={propertyInput.type_id} id="type_id" aria-describedby="validationServer04Feedback" required >
                            <option value="">Select a Type</option>
                            {
                                allType.map((item) =>{
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                        <div id="validationServer04Feedback" class="invalid-feedback">{errorList.type_id}</div>
                    </div>

                    <div class="col-md-4">
                        <label for="location" class="form-label">location</label>
                        <input type="text" class="form-control" name='location' onChange={handleInput} value={propertyInput.location} id="location" required />
                        <div class="invalid-feedback">{errorList.location}</div>
                    </div>
                    
                    <div class="col-md-4">
                        <label for="" class="form-label">Size</label>
                        <input type="text" class="form-control" name='size' onChange={handleInput} value={propertyInput.size} id="size" required />
                        <div class="invalid-feedback">{errorList.size}</div>
                    </div>

                    <div class="col-md-4">
                        <label for="image" class="form-label">image:</label>
                        <input type="file" id='image' name='image' onChange={handleImage}  class="form-control" />
                        <img className='mt-2' width={80} height={80} src={`http://127.0.0.1:8000/${propertyInput.image}`} alt="" />
                        <div class="invalid-feedback">{errorList.image}</div>
                        {errorImage && <div className='text-danger'>{errorImage}</div>}
                    </div>

                    <div class="col-md-12">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" name='description' id="description" onChange={handleInput} value={propertyInput.description} ></textarea>
                        <div class="text-danger">{errorList.description}</div>
                        
                    </div>

                    <div class="col-12">
                        <div class="form-check">
                        <input class="form-check-input " type="checkbox" name='featured' onChange={handleChecked} 
                            defaultChecked={allCheckbox.featured === 1 ? true:false}   />
                            <label class="form-check-label" >
                                featured
                            </label>
                            {/* <div id="invalidCheck3Feedback" class="invalid-feedback">
                                You must agree before submitting.
                            </div> */}
                        </div>
                    </div>

                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Edit_Properties;
