import React from 'react';

const RateForm = ({ratings,setRatings}) => {

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => {
                return (  
                <span
                    className='start'
                    style={{
                    cursor: 'pointer',
                    color: ratings >= star ? 'gold' : 'gray',
                    fontSize: `35px`,
                    }}
                    onClick={() => {
                        setRatings(star)
                    }}
                >
                    {' '}
                    ★{' '}
                </span>
                )
            })}
        </div>
    );
}

export default RateForm;
