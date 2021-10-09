import React from 'react';
// import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import SideBar from "./components/SideBar";
import Main from './components/Main';

MainLayout.propTypes = {
    
};

function MainLayout(props) {
    return (
        <>
            <Grid item xs={2} md={2} sm={2} lg={2}>
                <SideBar />
            </Grid>
            <Grid item xs={10} md={10} sm={10} lg={10} style={{background:'#E2F2FD',height:'100vh',borderRadius:'20px'}}>
                <Main />
            </Grid>
        </>
    );
}

export default MainLayout;