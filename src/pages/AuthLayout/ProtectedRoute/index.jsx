import React from 'react';
import { Route  ,Navigate } from 'react-router-dom';


ProtectedRoute.propTypes = {
    
};

function ProtectedRoute({isAuth , component : Component , path , ...rest}) {

    return (
       <Route 
            path={path}
            {...rest}
            // render={(props) =>{
            //     if(isAuth) return <Component />
            //     else navigate('/login')
            // }}
            element={isAuth ? <Component  /> : <Navigate to='/login' />}
       
            
       />
    );
}

export default ProtectedRoute;