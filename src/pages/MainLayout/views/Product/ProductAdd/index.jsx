import React from 'react';
import ProductAddForm from '../ProductAddForm';
import { useSelector } from 'react-redux';
import productApi from '../../../../../api/productApi';

ProductAdd.propTypes = {
    
};

function ProductAdd(props) {
    const token = useSelector((state) => state.auth.token);

    const handleAddProductSubmit = (values) =>{
        const formatValue = {...values};
        formatValue.images = [
            {
                url : formatValue.image1
            },
            {
                url : formatValue.image2
            }
        ]
        delete formatValue.image1;
        delete formatValue.image2;
        (async ()=> {
            await productApi.create([formatValue] , {
                headers : {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': "*",
                    "Authorization":"Bearer "+ token,
                }
            }).then(() => console.log('OK'))
            .catch((error) => console.log(error))
        })()

    }
    return (
        <ProductAddForm onSubmit={handleAddProductSubmit}/>
    );
}

export default ProductAdd;