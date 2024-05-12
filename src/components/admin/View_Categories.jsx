import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { encryptId } from './CryptoJS';

const ViewCategories = () => {
    // const encryptedId = encryptId(id);

    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);
    const navigate = useNavigate();


    useEffect(() =>{
        
        axios.get('api/view-category').then(res=>{
            if(res.status === 200){
                setCategorylist(res.data.category);
            }
            setLoading(false);
        })

    },[]);

    const handleDelete = (e, id) => {
        e.preventDefault();

        // const element = document.getElementById('e_delete');
        // if (element) {
        //     element.innerText = "Deleting...";
        // }
        const confirm = window.confirm("Would you like to Delete?");
        if(confirm){
            axios.delete(`api/delete-category/${id}`).then(res => {
                if(res.data.status === 200){
                    window.location.reload();

                }else if(res.data.status === 400){
                    navigate("/admin/view-categories");
                }
                
            }).catch(err => console.log(err));
        }
        
    }


    var ViewCategory_HTMLTABLE = "";
    if(loading){
        return (
            <>
                <h4>Loading Category...</h4>
            </>
        )
    }   
    else{
        ViewCategory_HTMLTABLE =
        categorylist?.map((item) => {

            if(item.status === 0){
                return (
                    <tr key={item.id}>
                        <td>{item.name_slug}</td>
                        <td>{item.description}</td>
                        <td>{item.status}</td>
                        {/* <td>{item.is_featured}</td> */}
                        <td>
                            <button className='btn btn-primary me-2 mt-1'>
                            {/* <Link to={`/admin/edit-category/${item.id}`}>Edit</Link> */}
                                <Link to={`/admin/edit-category/${encryptId(item.id)}`} className='text-white'>Edit</Link>
                            </button>

                            <button id='e_delete' className='btn btn-danger mt-1' onClick={e => handleDelete(e, item.id)}>Delete</button>
                        </td>
                    </tr>
                )
            }    
        })
    }

    

    return (
        <div>
            <div className="container-fluid">
                <h1 class="h3 mb-2 text-gray-800">Tables</h1>
                <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                    For more information about DataTables, please visit the <a target="_blank"
                        href="https://datatables.net">official DataTables documentation</a>.</p>

                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name Slug</th>
                                        <th>Description</th>
                                        <th>Ststus</th>
                                        {/* <th>Is featured</th> */}
                                        <th>Actions</th>
                                        
                                    </tr>
                                </thead>
                                {/* <tfoot>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Office</th>
                                        <th>Age</th>
                                        <th>Start date</th>
                                        <th>Salary</th>
                                    </tr>
                                </tfoot> */}
                                <tbody>
                                    {ViewCategory_HTMLTABLE}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            
            </div>
        </div>
    );
}

export default ViewCategories;
