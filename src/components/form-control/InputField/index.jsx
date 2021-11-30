import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

InputField.propTypes = {
    form : PropTypes.object.isRequired,
    name : PropTypes.string.isRequired,

    label: PropTypes.string,
    disable: PropTypes.bool,
};

const helperTextStyles = makeStyles(theme => ({
    root: {
      margin: 4,
      color: "red"
    },
    // error: {
    //   "&.MuiFormHelperText-root.Mui-error": {
    //     color: theme.palette.common.white
    //   }
    // }
  }));
function InputField({form , name , label , disable}) {
    const {errors , formState} = form;
    const hasError = formState.touched[name] && errors[name];
    const helperTestClasses = helperTextStyles();
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
            FormHelperTextProps={{ classes: helperTestClasses }}
        />
    );
}

export default InputField;