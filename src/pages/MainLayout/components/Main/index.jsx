import { Box } from '@material-ui/core';
import React from 'react';
//import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router';
import RAM from '../../views/Hard/Ram/index';
import Product from '../../views/Product/index';
import ProductAdd from '../../views/Product/ProductAdd';
import ProductStatistic from '../../views/Product/ProductStatistic';
import Article from '../../views/Article/index';
import ArticleAdd from '../../views/Article/components/ArticleAdd/index';
import ArticleStatistic from '../../views/Article/components/ArticleStatistic/index';


Main.propTypes = {
    
};

function Main(props) {
    return (
        <Box padding={5}>
            <Routes>
                <Route path="/san-pham" element={<Product />}>
                    <Route path='/them-moi' element={<ProductAdd type="create" />} />
                    <Route path='/cap-nhat/:id' element={<ProductAdd type="update" />} />
                    <Route path='/' element={<ProductStatistic />} />
                </Route>
                <Route path="/bai-viet" element={<Article />}>
                    <Route path='/them-moi' element={<ArticleAdd type="create" />} />
                    <Route path='/cap-nhat/:id' element={<ArticleAdd type="update" />} />
                    <Route path='/' element={<ArticleStatistic />} />
                </Route>
                <Route path="/phan-cung">
                    <Route path="/ram" element={<RAM />} />
                </Route>
            </Routes>
        </Box>
    );
}

export default Main;