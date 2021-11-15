import React from 'react';
import { Outlet } from 'react-router';
//import PropTypes from 'prop-types';

Article.propTypes = {
    
};

function Article(props) {
    return (
       <Outlet />
    );
}

export default Article;