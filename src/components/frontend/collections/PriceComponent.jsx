import React from 'react';

const PriceComponent = ({price}) => {
    const formattedPrice = Number(price).toLocaleString('en', {
        // minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    
    return <span>{formattedPrice}</span>;
}

export default PriceComponent;
