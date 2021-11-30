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
import { makeStyles } from '@material-ui/core/styles';
import ThongKe from '../../views/Order/index';
import OrderStatistic from '../../views/Order/Components/OrderStatistic/index';
import OrderDetail from '../../views/Order/Components/OrderDetail/index';


Main.propTypes = {
    
};
const useStyles = makeStyles((theme) =>({
    root : {
        padding:5,
        [theme.breakpoints.down('md')]:{
            padding:theme.spacing(4,2),
        }
    }
}));

function Main(props) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
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
                {/* <Route path="/hoa-don" element={<Order />}>
                    
                </Route> */}
                <Route path="/phan-cung">
                    <Route path="/ram" element={<RAM />} />
                </Route>
                <Route path='/' element={<ThongKe />}>
                    <Route path='/hoa-don/:id' element={<OrderDetail />} />
                    <Route path='/' element={<OrderStatistic />} />
                </Route>
            </Routes>
        </Box>
    );
}

export default Main;