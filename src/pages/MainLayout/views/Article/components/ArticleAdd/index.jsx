import React from 'react';
import PropTypes from 'prop-types';
import ArticleAddForm from '../ArticleAddForm/index';
import { useSelector } from 'react-redux';
import articleApi from '../../../../../../api/articleApi';
import { useParams, useNavigate } from 'react-router';

ArticleAdd.propTypes = {
    type : PropTypes.oneOf(['create','update'])
};

function ArticleAdd({type}) {
    const token = useSelector((state) => state.auth.token);
    const params = useParams();
    const navigate = useNavigate();
    const handleSubmit = (values) =>{
        (async () =>{
            type === 'create' ? await articleApi.create([values] , {
                headers : {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': "*",
                    "Authorization":"Bearer "+ token,
                }
            })
            .then(() => {
                alert('OK');
                navigate('/bai-viet')
            })
            .catch((error) => console.log(error)) 
            :
            await articleApi.update(params.id ,values , {
                headers : {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': "*",
                    "Authorization":"Bearer "+ token,
                }
            }).then(() => {
                alert('OK') ; 
                navigate('/bai-viet');
            })
            .catch((error) => console.log(error)) 
        } 
        )()
    }
    
    return (
        <ArticleAddForm onSubmit={handleSubmit} />
    );
}

export default ArticleAdd;