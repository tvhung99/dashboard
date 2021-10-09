import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../components/form-control/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Button} from '@material-ui/core'
import PasswordField from '../../../components/form-control/PasswordField/index';



LoginForm.propTypes = {
    onSubmit : PropTypes.func,
};

function LoginForm({onSubmit}) {
    const schema = yup.object({
        email: yup.string().required('Please enter username'),
      })
    const form = useForm({
        defaultValues:{
            email : '',
            password :'',
        },
        resolver : yupResolver(schema),
    })
    const handleSubmit = (values) => {
        if(!onSubmit) return;
        onSubmit(values);
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} style={{padding:'30px 20px'}}>
           <InputField name="email" label="Email"  form={form}/>
           <PasswordField name="password" label="Password"  form={form}/>
           <Button type="submit" variant="contained" color="primary" fullWidth >
                Login
            </Button>
        </form>
    );
}

export default LoginForm;