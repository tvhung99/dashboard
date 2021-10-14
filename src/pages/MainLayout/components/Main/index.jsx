import React from 'react';
//import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router';
import RAM from '../../views/Hard/Ram/index';
import Product from '../../views/Product/index';
import ProductAdd from '../../views/Product/ProductAdd';
import { Box } from '@material-ui/core';


Main.propTypes = {
    
};

function Main(props) {
    return (
        <Box padding={5}>
            <Routes>
                <Route path="/san-pham" element={<Product />}>
                    <Route path='/create' element={<ProductAdd />} />
                    <Route path='/update/:id' element={<ProductAdd />} />
                </Route>
                <Route path="/phan-cung">
                    <Route path="/ram" element={<RAM />} />
                </Route>
            </Routes>
        </Box>
    );
}

export default Main;