import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { decryptData } from './CryptoJS';

const EditCategories = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategoryInput] = useState([]);
    const [validation_error, setError] = useState([]);

    const decryptedId = decryptData(id);

    const handleInput = (e) => {
        e.preventDefault();
        setCategoryInput({...categoryInput, [e.target.name]: e.target.value});
    }

    const [allCheckbox, setAllCheckbox] = useState([]);
    const handleChecked = (e) =>{
        e.persist();
        const { name, checked } = e.target;
        setAllCheckbox({
            ...allCheckbox,
            [name]: checked,
        });

    }

    useEffect(() =>{
        // const category_id = props.match.params.id;
        // axios.get(`api/edit-category/${id}`).then(res=>{
        axios.get(`api/edit-category/${decryptedId}`).then(res=>{
            if(res.data.status === 200){
                
                setCategoryInput(res.data.category);
            }
            
            else if(res.data.status === 400){
                Swal.fire({
                    title: "Warning",
                    text: res.data.message,
                    icon: "warning"
                });
                navigate("/admin/view-categories");
            }
            setLoading(false);
        });


    },[id, navigate]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = categoryInput;
            axios.put(`api/update-category/${decryptedId}`, data).then(res => {
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
                else if(res.data.status === 404){
                    Swal.fire({
                        title: "Error",
                        text: res.data.message,
                        icon: "error"
                    });
                    navigate("/admin/view-categories");
                }
            })

    }

    if(loading){
        return (
            <>
                <h4>Loading edit Category...</h4>
            </>
        )
    } 

   
    return (
        <div>
            <div className="container-fluid">
                <form onSubmit={handleUpdate}>
                    <div class="mb-3">
                        <label for="slug" class="form-label">Slug Name</label>
                        <input type="text" name="name_slug" onChange={handleInput} value={categoryInput.name_slug} class="form-control" />
                        <span className='text-danger'>{validation_error.name_slug} </span>
                    </div>
                    
                    <div class="mb-3">
                        <label for="description" class="form-label">Discriptions</label>
                        <textarea name='description' class="form-control" onChange={handleInput} value={categoryInput.description} id="description" rows="3"></textarea>
                        <span className='text-danger'>{validation_error.description} </span>
                    </div>

                    <div class="mb-3 me-1 form-check">
                        <input  class="form-check-input"
                            type="checkbox" 
                            name='status'
                            onChange={handleChecked} 
                            defaultChecked={allCheckbox.status === 1 ? true:false} 
                        />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary float-end">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditCategories;
