import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

PasswordField.propTypes = {
    form : PropTypes.object.isRequired,
    name : PropTypes.string.isRequired,

    label: PropTypes.string,
    disable: PropTypes.bool,
};

function PasswordField({form , name , label , disable}) {
    const {errors , formState} = form;
    const hasError = formState.touched[name] && errors[name];
    const [showPassword , setShowPassword] = useState(false);
    const toggleShowPassword = () =>{
        setShowPassword(x => !x);
    }
    return (
        <FormControl margin="normal" fullWidth variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Controller
                name={name}
                control={form.control}
                as={OutlinedInput}
                id={name}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                    >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }
                disable={disable}
                error ={!!hasError}
                helpertext={errors[name]?.message}
                labelWidth={70}
            />
        </FormControl>
    );
}

export default PasswordField;