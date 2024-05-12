import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ViewArea = () => {

    const [loading, setLoading] = useState(true);
    const [arealist, setArealist] = useState([]);
    const navigate = useNavigate();


    useEffect(() =>{
        
        axios.get('api/view-area').then(res=>{
            if(res.status === 200){
                setArealist(res.data.message);
            }
            setLoading(false);
        })

    },[]);

    const handleDelete = (e, id) => {
        e.preventDefault();
        const confirm = window.confirm("Would you like to Delete?");
        if(confirm){
            axios.delete(`api/delete-area/${id}`).then(res => {
                if(res.data.status === 200){
                    window.location.reload();

                }else if(res.data.status === 400){
                    navigate("/admin/view-area");
                }
                
            }).catch(err => console.log(err));
        }
        
    }


    var ViewArea_HTMLTABLE = "";
    if(loading){
        return (
            <>
                <h4>Loading Category...</h4>
            </>
        )
    }   
    else{
        ViewArea_HTMLTABLE =
        arealist?.map((item) => {

                return (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.status}</td>
                        <td>
                            <button className='btn btn-primary me-2 mt-1'>
                                <Link to={`/admin/edit-area/${item.id}`} className='text-white'>Edit</Link>
                            </button>

                            <button id='e_delete' className='btn btn-danger mt-1' onClick={e => handleDelete(e, item.id)}>Delete</button>
                        </td>
                    </tr>
                )
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
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Ststus</th>
                                        <th>Actions</th>
                                        
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {ViewArea_HTMLTABLE}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            
            </div>
        </div>
    );
}

export default ViewArea;
