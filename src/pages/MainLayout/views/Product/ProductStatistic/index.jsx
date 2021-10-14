import PropTypes from 'prop-types';
import React from 'react';
import TableProduct from '../Components/TableProduct/index';

ProductStatistic.propTypes = {
    listProduct : PropTypes.array.isRequired,
};

function ProductStatistic({listProduct}) {
    return (
        <TableProduct />
    );
}

export default ProductStatistic;