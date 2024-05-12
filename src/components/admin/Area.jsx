import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Area = () => {

    const navigate = useNavigate();

    const [areaInput, setAreaInput] = useState({
        name: '',
        description: '',
        status: '',
        is_featured: '',
        error_list: [],
    })

    const handleInput = (e) => {
        e.persist();
        setAreaInput({...areaInput, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: areaInput.name,
            description: areaInput.description,
            status: areaInput.status,
            is_featured: areaInput.is_featured,
        }

            axios.post('api/add-area', data).then(res => {
                if(res.data.status === 200){
                    
                    Swal.fire({
                        title: "Success",
                        text: res.data.message,
                        icon: "success"
                    });
                }
                else if(res.data.status === 400){
                    setAreaInput({...areaInput, error_list:res.data.validation_error});

                }
            })

    }

    return (
        <div>
            <div className="container-fluid">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="slug" class="form-label">Name</label>
                        <input type="text" name="name" onChange={handleInput} value={areaInput.name} class="form-control" />
                        <span className='text-danger'>{areaInput.error_list.name} </span>
                    </div>
                    
                    <div class="mb-3">
                        <label for="description" class="form-label">Discriptions</label>
                        <textarea name='description' class="form-control" onChange={handleInput} value={areaInput.description} id="description" rows="3"></textarea>
                        <span className='text-danger'>{areaInput.error_list.description} </span>
                        
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

export default Area;
