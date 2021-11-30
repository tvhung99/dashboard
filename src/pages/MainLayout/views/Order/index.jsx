import React from 'react';
import { Outlet } from 'react-router';

ThongKe.propTypes = {
    
};

function ThongKe(props) {
    return (
       <>
         <Outlet />
       </>
    );
}

export default ThongKe;