import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import SideBar from "./components/SideBar";
import Main from './components/Main';
import { useNavigate } from 'react-router';

MainLayout.propTypes = {
    
};

function MainLayout(props) {
    const navigate = useNavigate();
    useEffect(() =>{
        const token = localStorage.getItem('access_token');
        if(!token){
            navigate('/login')
        }
    })
    return (
        <>
            <Grid item xs={3} md={3} sm={3} lg={3}>
                <SideBar />
            </Grid>
            <Grid item xs={9} md={9} sm={9} lg={9} style={{background:'#E3F3FD',height:'100vh',maxHeight:'100vh',overflowY:'auto',borderRadius:'30px'}}>
                <Main />
            </Grid>
        </>
    );
}

export default MainLayout;