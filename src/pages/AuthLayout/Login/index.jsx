import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../authSlice';
import LoginForm from '../LoginForm';

Login.propTypes = {
    
};

function Login(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLoginFormSubmit = async (values)=>{
        try{
            const action = login(values);
            const resultAction = await dispatch(action);    
            const user = unwrapResult(resultAction);
            if(user){
                navigate('/')
            }
        }
        catch(error){
            alert("Khong the xac thuc")
            window.location.reload();
        }
    }
    return (
        <LoginForm onSubmit={handleLoginFormSubmit} />
    );
}

export default Login;