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
            <Grid item xs={12} md={3} sm={12} lg={3} style={{background:'#def3fd' , minHeight:'100vh'}}>
                <SideBar />
            </Grid>
            <Grid item xs={12} md={9} sm={12} lg={9} style={{borderRadius:'30px'}}>
                <Main />
            </Grid>
        </> 
    ) 
}

export default withRouter(MainLayout);