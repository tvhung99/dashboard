import React from 'react';
import { Route  ,Navigate } from 'react-router-dom';


ProtectedRoute.propTypes = {
    
};

function ProtectedRoute({isAuth , children , component : Component , path , ...rest }) {

    return (
       <Route 
            path={path}
            {...rest}
            element={isAuth ? <Component  /> : <Navigate to='/login' />}
       
            
       />
    );
}

export default ProtectedRoute;