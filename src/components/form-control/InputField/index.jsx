import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form : PropTypes.object.isRequired,
    name : PropTypes.string.isRequired,

    label: PropTypes.string,
    disable: PropTypes.bool,
};

function InputField({form , name , label , disable}) {
    const {errors , formState} = form;
    const hasError = formState.touched[name] && errors[name];
    return (
        <Controller 
            style={{marginTop :5}}
            name={name}
            control={form.control}
            as={TextField}

            variant="outlined"
            margin="normal"
            fullWidth
            label={label}
            disable={disable}

            error ={!!hasError}
            helperText={errors[name]?.message}
        />
    );
}

export default InputField;