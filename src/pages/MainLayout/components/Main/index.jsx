import React from 'react';
//import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router';
import Product from '../../views/Product';
import ProductDetail from '../../views/ProductDetail';

Main.propTypes = {
    
};

function Main(props) {
    return (
        <Routes>
            <Route path="/san-pham">
                <Route path="/:id" element={<ProductDetail />} />
                <Route path="/" element={<Product />} />
            </Route>    
        </Routes>
    );
}

export default Main;