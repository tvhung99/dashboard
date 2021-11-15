// import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import React, { useEffect } from 'react';
import { withRouter } from '../../components/withRoute';
import Main from './components/Main';
import SideBar from "./components/SideBar";

MainLayout.propTypes = {
    
};

function MainLayout(props) {
    useEffect(() =>{
        
    },[])
    return(
        <>
            <Grid item xs={3} md={3} sm={3} lg={3}>
                <SideBar />
            </Grid>
            <Grid item xs={9} md={9} sm={9} lg={9} style={{height:'100vh',borderRadius:'30px'}}>
                <Main />
            </Grid>
        </> 
    ) 
}

export default withRouter(MainLayout);