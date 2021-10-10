import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import PropTypes from 'prop-types';
import React from "react";
import { Controller } from "react-hook-form";
import FormHelperText from '@material-ui/core/FormHelperText';

SelectField.propTypes = {
    form : PropTypes.object.isRequired,
    name : PropTypes.string.isRequired,

    label: PropTypes.string,
    disable: PropTypes.bool,
    defaultValue : PropTypes.string,
    
}

function SelectField({form ,name , label , disable , defaultValue , children}){
    const labelId = `${name}-label`;
    const {errors , formState} = form;
    const hasError = formState.touched[name] && errors[name];
    return (
        <FormControl fullWidth variant="outlined" >
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller
            as={
                <Select labelId={labelId} label={label}>
                    {children}
                </Select>
            }
            name={name}
            control={form.control}
            defaultValue={defaultValue}
            disable={disable}
            error = {!!hasError}
            helpertext={errors[name]?.message}
            
            />
            <FormHelperText style={{color:'red'}}>{errors[name]?.message}</FormHelperText>
        </FormControl>
        // Trong SelectField la <MenuItem value="" ></MenuItem>
  );
};
export default SelectField;