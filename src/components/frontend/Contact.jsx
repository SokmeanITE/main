import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {

    const [body, setBody] = useState({
        content : ''
    });

    const handleInput = (e) => {
        e.persist();
        setBody({...body, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            content: body.content,
            
        }

        axios.post('api/comments', data).then(res => {
            if(res.data.status === 200){
                
                Swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: "success"
                });
            }
            else if(res.data.status === 400){
                alert(1);

            }
            // else{
            //     setCategoryInput({...categoryInput, error_list:res.data.validation_error});
            // }
        })
    };


    return (
        <div>
            contact

            <form onSubmit={handleSubmit}>
                <textarea name='content' onChange={handleInput} value={body.content} />
                <button type="submit">Add Comment</button>
            </form>

        </div>
    );
}

export default Contact;
