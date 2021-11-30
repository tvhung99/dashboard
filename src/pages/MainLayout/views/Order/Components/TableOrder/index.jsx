import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import orderApi from '../../../../../../api/orderApi';
import Loading from '../../../../../../components/Loading';
import { Alert } from '@material-ui/lab';

const head = ['', 'Tên khách hàng' , 'Địa Chỉ' ,'Số điện thoại'];
const useStyles = makeStyles({
    root: {
        maxWidth: "100%",
        marginTop: '10px',
        overflowX: "auto",
        padding : '20px',

      },

      table: {
        
        
      },
      head:{
        background:'orange',
      },
      paginate:{
        display:'flex',
        justifyContent:'center',
        margin:'10px 0'
      },
      cell:{
          minWidth:200,

          padding:'5px 0!important',
      },
      cellHeader:{
        minWidth:200,
        padding:'5px!important',
        color:'white'



,
        textTransform : 'uppercase',
        fontSize:16,
        fontWeight:600
    },
    update:{
        background:'orange',
        color:'white',
        '&:hover':{
            background:'orange',
            color:'white'
        }
    },
    delete:{
        background:'#dc3545',
        color:'white',
        margin:'0 10px',
        '&:hover':{
            background:'#dc3545',
            color:'white'
        }
    },
    undo:{
        background:'green',
        color:'white',
        marginRight:'10px',
        '&:hover':{
            background:'green',
            color:'white'
        }
    },
    activeBtn:{
        background :'orange',
        color:'white',
        padding:'5px 20px',
        transition :'background .5s ease-in-out',
        '&:hover':{
            background :'orange',
            color:'white',
        }
    },
    btn:{
        padding:'5px 20px',
    }

})

function TableOrder({onChange}) {
    const token = useSelector((state) => state.auth.token);
    const [check,setCheck] = useState(false);
    const [orders , setOrders] = useState([]);
    const navigate = useNavigate();
    const [count , setCount] = useState();
    const [page , setPage] = useState(1);
    const [filter,setFilter] = useState({page : page , status : 'unapproved'});
    const [loading,setLoading] = useState(true);
    const headers = useMemo(() => ({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': "*",
        "Authorization":"Bearer "+ token,
    }),[token])
    
    useEffect(() =>{
        (async () =>{
            setLoading(true)
            try {
                const {data , last_page , current_page} = await orderApi.getOrders({
                    headers,
                    params:{
                        ...filter
                    }
                });
                setOrders(data);
                setCount(last_page);
                setPage(current_page);
                setLoading(false);
            } catch (error) {
                
            }
        })()
    },[check ,filter ,headers])
    const classes = useStyles();
    const changeStatus = async (order) =>{
        if(order.status === 'unapproved'){
            await orderApi.update(order.order_id , {status : 'approved'} , {headers})
        }
        else{
            await orderApi.update(order.order_id , {status : 'complete'} , {headers})
        }
        onChange();
        setCheck((prev) => !prev)
        
    }
    const handlePaginationChange = (e,page) =>{
        setFilter({
            ...filter,
            page : page,
        })

    }
    const navigatToDetail = (id) =>{
        navigate(`/hoa-don/${id}`)
    }
    const showByStatus = (status) =>{
        setFilter({
            ...filter,
            status,
            page : 1,
        })
    }
    const status = [
        {
            status : 'unapproved',
            title : 'Chưa phê duyệt'

        },
        {
            status : 'approved',
            title : 'Đang thực hiện'

        },
        {
            status : 'complete',
            title : 'Đã giao'

        }
    ];
    return (
        <Box>
            <Box className={classes.root}>
                <Box style={{margin:'10px 0'}}>
    
                {status.map(x => <Button className={x.status === filter.status ? classes.activeBtn : classes.btn} onClick={() => showByStatus(x.status)}>{x.title}</Button>)}
                </Box>

                {
                !loading ? 
                    
                    <>
                        {
                            orders.length > 0 ?
                            <Table className={classes.table}>
                                <TableHead className={classes.head}>
                                    <TableRow>
                                        {head.map((x , index) => <TableCell className={classes.cellHeader} key={index}>{x}</TableCell>)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders && orders.map((order) =>{
                                        return (
                                            <TableRow key={order.order_id} className={classes.row}>
                                                <TableCell className={classes.cell}>
                                                <Button className={classes.undo} onClick={() => navigatToDetail(order.order_id)}>Xem</Button>
                                                {order.status !== 'complete' && <Button className={classes.undo} onClick={() => changeStatus(order)}>{order.status === 'unapproved' ? 'Phê duyệt':'Hoàn thành'}</Button>}
                                                </TableCell >
                                                <TableCell className={classes.cell}>{order.customer_name}</TableCell>
                                                <TableCell className={classes.cell}>{order.customer_address}</TableCell>
                                                <TableCell className={classes.cell}>{order.customer_phone_number}</TableCell>
                                                
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                            : 
                            <Alert severity="info">Không có đơn hàng ở trạng thái này</Alert>
                        }
                    </> 
                    : 
                    <Loading />
                }

                {
                    orders.length > 0 && <Box className={classes.paginate}>
                        <Pagination page={page} count={count} onChange={handlePaginationChange} />
                    </Box>
                }
            </Box>
        </Box>
    );
}

export default TableOrder;