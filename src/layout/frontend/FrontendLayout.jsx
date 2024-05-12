import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routeFrontent from '../../routes/routeFrontent';
import Navbar from '../../components/frontend/Navbar';
import Footer from '../../components/frontend/Footer';

const FrontendLayout = () => {
    return (
        <div>
            <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">
                        <Navbar/>
                            <main>
                                <Routes>
                                    {routeFrontent.filter(route => route.component)
                                    .map(({ path, component: Component }, idx) => (
                                        <Route
                                        key={idx}
                                        path={path}
                                        element={<Component />}
                                        />
                                    ))}
                                    <Route
                                    path="/"
                                    element={<Navigate to="/"/>}
                                    />
                                </Routes>
                            </main>
                        <Footer/>
                       </div>
                </div>

                

            </div>
           
        </div>
    );
}

export default FrontendLayout;
