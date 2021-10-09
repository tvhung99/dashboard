import React from 'react';
import {Box , Typography } from '@material-ui/core'
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Login from './Login';

// Auth.propTypes = {
    
// };
const useStyles = makeStyles({
    root:{
        width:'100%',
        backgroundColor: '#FA8BFF',
        backgroundImage: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
        height:'100vh',
    },
    login:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50% , -50%)',
        width:'400px',
        height:'500px',
        background:'white',
        boxShadow: '0px 2px 5px #aaaaaa',
        borderRadius:'20px',
        padding : '50px 10px'
    },
    welcome:{
        textAlign:'center',
        fontWeight:'700',
        margin:'30px 10px'
    }
})

function Auth(props) {
    const classes = useStyles();
    
    return (
        <Box className={classes.root}>
            <Box className={classes.login}>
                <Typography variant="h5" className={classes.welcome} >
                   Login
                </Typography>
                <Login />
            </Box>
        </Box>
    );
}

export default Auth;