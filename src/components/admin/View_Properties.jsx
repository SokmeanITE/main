import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function View_Properties() {

    const [loading, setLoading] = useState(true);
    const [propertyList, setPropertyList] = useState({
        name: '',
        category_id: '',
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
        featured: '',
        status: '',
        
    });
    const navigate = useNavigate();

    useEffect(() =>{
        
        axios.get('api/view-property').then(res=>{
            if(res.status === 200){
                setPropertyList(res.data.message);
            }
            setLoading(false);
        })

    },[]);

    const handleDelete = (e, id) => {
        e.preventDefault();

        
        const confirm = window.confirm("Would you like to Delete?");
        if(confirm){
            axios.delete(`api/delete-property/${id}`).then(res => {
                if(res.data.status === 200){
                    window.location.reload();

                }else if(res.data.status === 400){
                    navigate("/admin/view-property");
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
        propertyList?.map((item) => {

            if(item.status === 0){
                return (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                            
                            <Link className='box-img-property'>
                                <img className='img-list-property' src={`http://127.0.0.1:8000/${item.image}`} alt="" />
                            </Link>
                        </td>
                        <td>{item.price} $</td>
                        <td>{item.category.name_slug}</td>
                        <td>{item.type.name}</td>
                        {/* <td>{item.agent.id}</td> */}
                        <td>{item.location}</td>
                        <td>{item.status}</td>
                        <td>{item.featured}</td>
                        <td>
                            <button className='btn btn-primary me-2 mt-1'>
                                <Link to={`/admin/edit-property/${item.id}`} className='text-white'>Edit</Link>
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
                            <table class="table table-bordered text-center" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Imgage</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Type</th>
                                        {/* <th>Agent</th> */}
                                        <th>Location</th>
                                        <th>Ststus</th>
                                        <th>Popular</th>
                                        <th>Actions</th>
                                        
                                    </tr>
                                </thead>
                                
                                <tbody >
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

export default View_Properties;