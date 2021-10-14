import React, { useEffect , useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import productApi from '../../../../../../api/productApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Pagination } from '@material-ui/lab';


TableProduct.propTypes = {
    
};

//const LINK = 'https://firebasestorage.googleapis.com/v0/b/techshop-2ee9d.appspot.com/o/images';
const head = ['', 'Tên sản phẩm' , 'Giá','CPU' , 'Ổ cứng' ,'Hãng sản xuất' , 'RAM' ,'Card đồ hoạ','Dòng máy','Màn hình','Trọng lượng','Giảm giá' ,'Thông tin chi tiết','Ảnh'];
const useStyles = makeStyles({
    root: {
        maxWidth: "100%",
        marginTop: '10px',
        overflowX: "auto",
        padding : '20px',
      },
      table: {
        
        
      },
      row:{
        '&:hover':{
            backgroundColor:'gray'
        }
      },
      cell:{
          minWidth:200,
          textAlign:'center',
          padding:'5px!important',
          

      }
})


function TableProduct(props) {
    const token = useSelector((state) => state.auth.token);
    const [check,setCheck] = useState(false);
    const [product , setProduct] = useState([]);
    const navigate = useNavigate();
    const [count , setCount] = useState();
    const [page , setPage] = useState(1);
    const [filter,setFilter] = useState({page : page})
    useEffect(() =>{
        (async () =>{
            try {
                console.log(filter);
                const {data , last_page , current_page} = await productApi.getProductActiveDetail(filter);
                
                setProduct(data);
                setCount(last_page);
                setPage(current_page);
            } catch (error) {
                
            }
        })()
    },[check , filter])
    const classes = useStyles();
    const updateProduct =(id) =>{
        navigate('/san-pham/update/'+id)
    }
    const removeProduct = async (id) =>{
        console.log(token);
        const config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': "*",
                "Authorization":"Bearer "+ token,
            }
        }
        await productApi.deleteProduct(id , config);
        setCheck((prev) => !prev)
    }
    const handlePaginationChange = (e,page) =>{
        setFilter({
            ...filter,
            page : page,
        })

    }
    return (
        <Box>
            <Box className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {head.map((x , index) => <TableCell className={classes.cell} key={index}>{x}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.map((row) =>{
                            return (
                                <TableRow key={row.product_id} className={classes.row}>
                                    <TableCell className={classes.cell}>
                                        <Button onClick={() => updateProduct(row.product_id , row)}>Sửa</Button>
                                        <Button onClick={() => removeProduct(row.product_id , row)}>Xoá</Button>
                                    </TableCell >
                                    <TableCell className={classes.cell}>{row.product_name}</TableCell>
                                    <TableCell className={classes.cell}>{row.price}</TableCell>
                                    <TableCell className={classes.cell}>{row.cpu_name}</TableCell>
                                    <TableCell className={classes.cell}>{row.capacity_harddisk}</TableCell>
                                    <TableCell className={classes.cell}>{row.brand_name}</TableCell>
                                    <TableCell className={classes.cell}>{row.ram_detail}</TableCell>
                                    <TableCell className={classes.cell}>{row.card_detail}</TableCell>
                                    <TableCell className={classes.cell}>{row.class_name}</TableCell>
                                    <TableCell className={classes.cell}>{row.screen_detail}</TableCell>
                                    <TableCell className={classes.cell}>{row.mass}</TableCell>
                                    <TableCell className={classes.cell}>{row.discount}</TableCell>
                                    <TableCell className={classes.cell}>{row.product_detail}</TableCell>
                                    <TableCell className={classes.cell} style={{maxWidth:400}}>{row.image_product.reduce((total , next) => total + next.url +',' , '')}</TableCell> {/*  <img style={{maxWidth:100}} src={`${LINK}%2F${x.url}?alt=media`} alt="" /> */}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <Box className={classes.paginate}>
                    <Pagination page={page} count={count} onChange={handlePaginationChange} />
                </Box>
            </Box>
        </Box>
    );
}

export default TableProduct;