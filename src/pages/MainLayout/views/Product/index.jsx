import React ,{useEffect, useState} from 'react';
import { Outlet, Routes  , Route} from 'react-router';
import { Link } from 'react-router-dom';
import ProductAdd from '../../views/Product/ProductAdd/index';
import ProductStatistic from '../../views/Product/ProductStatistic/index';
import axiosClient from '../../../../api/axiosClient';
import productApi from '../../../../api/productApi';

Product.propTypes = {
    
};

function Product(props) {
    const [list , setList] = useState();
    useEffect(() =>{
        (async () =>{
            const {data , link , current_page} = await productApi.getProductActiveDetail();
            console.log(data)

        })()
    },[])
    return (
        <>
            <Link to="/san-pham/create">To thêm sản phẩm</Link>
            <Outlet />

            <ProductStatistic listProduct={list} />
            
        </>

    );
}

export default Product;