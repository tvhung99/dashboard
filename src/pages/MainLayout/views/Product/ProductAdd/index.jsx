import React from 'react';
import ProductAddForm from '../ProductAddForm';
import { useSelector } from 'react-redux';
import productApi from '../../../../../api/productApi';
import { PropTypes } from 'prop-types';
import { useParams, useNavigate } from 'react-router';

ProductAdd.propTypes = {
    type : PropTypes.oneOf(['create' ,'update']),
};

function ProductAdd({type}) {
    const token = useSelector((state) => state.auth.token);
    const params = useParams();
    const navigate = useNavigate();

    const handleAddProductSubmit = (values) =>{
        console.log(values);
        (async ()=> {
            type === 'create' ? await productApi.create([values] , {
                    headers : {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': "*",
                        "Authorization":"Bearer "+ token,
                    }
                }).then(() => alert('OK'))
                .catch((error) => console.log(error)) 
            : await productApi.update(params.id ,values , {
                    headers : {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': "*",
                        "Authorization":"Bearer "+ token,
                    }
                }).then(() => {
                    alert('OK') ; 
                    navigate('/san-pham')
                })
                .catch((error) => console.log(error)) 
        })()
    

        

    }
    return (
        <ProductAddForm isEdit={type === 'create' ? false : true} onSubmit={handleAddProductSubmit}/>
    );
}

export default ProductAdd;