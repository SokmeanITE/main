import React from 'react';
import '../assets/css/main.css'

const NotFound = () => {
    return (
        <>
            <div className='container notfond'>
                <div className='text-center'>
                    <h2 className='text-not'>404 Not Found</h2>
                    <p className='p-not'>Sorry, the page you are looking for does not exist.</p>
                </div>
            </div>
        </>
    );
}

export default NotFound;
