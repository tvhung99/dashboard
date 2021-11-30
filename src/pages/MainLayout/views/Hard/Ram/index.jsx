import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateRam from './components/CreateRam';

RAM.propTypes = {
    
};
const useStyles = makeStyles(() =>({
    root:{
        padding:20,
    }
}))

function RAM(props) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Typography>Thêm RAM mới</Typography>
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CreateRam />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    
                </Grid>

            </Grid>
        </Box>
    );
}

export default RAM;