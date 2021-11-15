import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

Product.propTypes = {
    
};

function Product(props) {

    return (
        <>
            <Outlet />
        </>

    );
}

export default Product;