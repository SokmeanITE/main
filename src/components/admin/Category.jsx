import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Category = () => {
    const navigate = useNavigate();

    const [categoryInput, setCategoryInput] = useState({
        name_slug: '',
        description: '',
        status: '',
        is_featured: '',
        error_list: [],
    })

    const handleInput = (e) => {
        e.persist();
        setCategoryInput({...categoryInput, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name_slug: categoryInput.name_slug,
            description: categoryInput.description,
            status: categoryInput.status,
            is_featured: categoryInput.is_featured,
        }

            axios.post('http://127.0.0.1:8000/api/add-category', data).then(res => {
                if(res.data.status === 200){
                    
                    Swal.fire({
                        title: "Success",
                        text: res.data.message,
                        icon: "success"
                    });
                    // window.location.reload();
                    // navigate("/login");
                }
                else if(res.data.status === 400){
                    setCategoryInput({...categoryInput, error_list:res.data.validation_error});

                }
                // else{
                //     setCategoryInput({...categoryInput, error_list:res.data.validation_error});
                // }
            })

    }



    return (
        <div>
            <div className="container-fluid">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="slug" class="form-label">Slug Name</label>
                        <input type="text" name="name_slug" onChange={handleInput} value={categoryInput.name_slug} class="form-control" />
                        <span className='text-danger'>{categoryInput.error_list.name_slug} </span>
                    </div>
                    
                    <div class="mb-3">
                        <label for="description" class="form-label">Discriptions</label>
                        <textarea name='description' class="form-control" onChange={handleInput} value={categoryInput.description} id="description" rows="3"></textarea>
                        <span className='text-danger'>{categoryInput.error_list.description} </span>
                        
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

export default Category;
