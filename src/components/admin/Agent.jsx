import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Agent = () => {

    const [errorList,setError] = useState([]);
    const [agentInput, setAgentInput] = useState({
        name: '',
        description: '',
        status: '',
    })

    const handleInput = (e) => {
        e.persist();
        setAgentInput({...agentInput, [e.target.name]: e.target.value});
    }

    const [picture, setPicture] = useState([]);
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

    const submitAgentInput = (e) => {
        e.preventDefault();
        

        const formData =  new FormData();
        formData.append('image', picture.image);
        formData.append('url', agentInput.url);
        formData.append('name', agentInput.name);
        formData.append('description', agentInput.description);
        formData.append('status', agentInput.status ? 1 : 0);

        axios.post('api/add-agent', formData,
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


    
    return (
        <div>
            <div className="container-fluid">
                <form onSubmit={submitAgentInput} className='row'>
                    <div class="col-md-4">
                        <label for="slug" class="form-label">Name</label>
                        <input type="text" name="name" onChange={handleInput} value={agentInput.name} class="form-control" />
                        <div class="invalid-feedback"> {errorList.name}</div>
                    </div>

                    <div class="col-md-4">
                        <label for="slug" class="form-label">Link telegram</label>
                        <input type="text" name="url" onChange={handleInput} value={agentInput.url} class="form-control" />
                        <div class="invalid-feedback"> {errorList.url}</div>
                    </div>
                    
                    <div class="col-md-4">
                        <label for="image" class="form-label">image:</label>
                        <input type="file" id='image' name='image' onChange={handleImage}  class="form-control" required />
                        <div class="invalid-feedback">{errorList.image} </div>
                        {errorImage && <div className='text-danger'>{errorImage}</div>}
                    </div>
                    
                    <div class="mb-3">
                        <label for="description" class="form-label">Discriptions</label>
                        <textarea name='description' class="form-control" onChange={handleInput} value={agentInput.description} id="description" rows="3"></textarea>
                        <span className='text-danger'>{errorList.description} </span>
                        
                    </div>

                    <div class="mb-3 me-1 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary float-end">Add</button>
                </form>
            </div>
        </div>
    );
}

export default Agent;
