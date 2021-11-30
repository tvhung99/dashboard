import { CircularProgress } from '@material-ui/core';
import React from 'react';

Loading.propTypes = {
    
};

function Loading(props) {
    return (
        <div style={{ background:'white',display:'flex' , marginTop:85 , height:'calc(100vh - 85px)' , justifyContent:'center', alignItems:'center'}}>
            <CircularProgress size={80} style={{color:'orange'}} />
        </div>
    );
}

export default Loading;