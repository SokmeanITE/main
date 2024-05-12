import React from 'react';
import { Route } from 'react-router-dom';
import FrontendLayout from './layout/frontend/FrontendLayout';

const PublicRoute = ({...rest}) => {
    return (
        <div>
            <Route {...rest} render={ (props) => <FrontendLayout {...props} /> } />
        </div>
    );
}

export default PublicRoute;
