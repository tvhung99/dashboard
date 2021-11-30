import React , {useState , useEffect,useMemo} from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router';
import orderApi from '../../../../../../api/orderApi';
import { useSelector } from 'react-redux';
import Loading from '../../../../../../components/Loading';
import { Typography, Box, Button } from '@material-ui/core';
import { VNDFormart } from '../../../../../../ulitilize/format';
import { makeStyles } from '@material-ui/core/styles';

OrderDetail.propTypes = {
    
};
const useStyles = makeStyles((theme) =>({
    root:{
        padding:20,
    },
    wrapper:{
        display:'flex',
        justifyContent:'space-between',
        margin:'15px 0px',
        padding:'10px 10px',
        borderBottom:'1px solid rgba(222,222,222,.6)'
    },
    name:{
        flex : '0 0 60%',
    },
    item:{
        flex : '0 0 20%',
    },
    info:{
        margin:'10px 0',
        fontWeight:500,
    },
    label :{
        minWidth:150,
        display:'inline-block'
    },
    value :{
        color:'orange'
    },
    title:{
        fontSize:20,
        fontWeight:700,
        
    },
    header:{
        background:'orange',
        
        color:'white',
        fontWeight:700,
    },
    price:{
        fontWeight:700,
    },
    mt:{
        marginTop:50,
    },
    row:{
        marginTop:10,
        padding:'5px 0',
        '& span:first-child':{
            minWidth:250,
            display:'inline-block'
        },
        '&:nth-child(3) span:last-child':{
            color:'red',
            fontWeight:700,
            
        }
    },
    btn:{
        background:'orange',
        color:'white',
        fontWeight:700,
        marginTop:20,
    }
}))


function OrderDetail(props) {
    const token = useSelector(state => state.auth.token);
    const classes = useStyles();
    const headers = useMemo(() => ({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': "*",
        "Authorization":"Bearer "+ token,
    }),[token])
    const id = (useParams()).id;
    const [loading,setLoading] = useState(true);
    const [order , setOrder] = useState({})
    const [total , setTotal] = useState({})
    const navigate = useNavigate();
    useEffect(() =>{
        (async () =>{
            const data = await orderApi.getById(id , {headers} );
            setOrder(data);
            setTotal(data.product.reduce((all , current) => ({money : all.money + current.price*(1-current.discount/100)*current.pivot.quantity , discount : all.discount + current.price*(current.discount/100)*current.pivot.quantity  , quantity : all.quantity + current.pivot.quantity}) ,{money : 0 , quantity : 0 , discount : 0}))
            setLoading(false);
        })()
    },[id,headers])
    const forRender = [
        {
            label : 'Khách hàng :',
            value : 'customer_name',
        },
        {
            label : 'Địa chỉ :',
            value : 'customer_address',
        },
        {
            label : 'Số điện thoại :',
            value : 'customer_phone_number',
        },
        {
            label : 'Email :',
            value : 'email',
        },
        {
            label:'Trạng thái :',
            value:'status',
        },

    ]
    
    const handleClick = async (order) =>{
        if(order.status === 'unapproved'){
            await orderApi.update(order.order_id , {status : 'approved'} , {headers})
        }
        else{
            await orderApi.update(order.order_id , {status : 'complete'} , {headers})
        }
        navigate('/')
    }
    return (
        !loading ? 
        <Box className={classes.root}>
            <Typography className={classes.title}>Thông tin khách hàng</Typography>
            {
                forRender.map(item => (
                    <Box key={item.value} className={classes.info}>
                        <span className={classes.label}>{item.label}</span><span className={classes.value}>{item.value !== 'status' ? order[item.value] : (order[item.value] === 'complete' ? 'Đã giao' :  (order[item.value] === 'approved') ? 'Đang giao':'Chưa phê duyệt')}</span>
                    </Box>
                ))
            }
            <Typography className={`${classes.title} ${classes.mt}`}>Danh sách sản phẩm đã mua</Typography>
                <Box className={`${classes.wrapper} ${classes.header}`}>
                    <Box className={classes.name}>
                        Tên sản phẩm
                    </Box>
                    <Box className={classes.item}>
                        Giá
                    </Box>
                    <Box className={classes.item}>
                        Số lượng
                    </Box>
                </Box>
                {order.product.map(item => (
                    <Box className={classes.wrapper} key={item?.pivot?.product_id}>
                        <Box className={classes.name}>
                            {item?.product_name}    
                        </Box>
                        <Box className={`${classes.item} ${classes.price}`}>
                            {VNDFormart(item?.price*(1-item.discount/100))}
                        </Box>
                        <Box className={classes.item}>
                            {item?.pivot?.quantity}
                        </Box>
                    </Box>
                ))
                
            }
            <Box className={classes.foot}>
                <Typography className={`${classes.title} ${classes.mt}`}>Tổng đơn hàng</Typography>
                <Box>
                    <Box className={classes.row}>
                        <span>Tổng giá trị đơn hàng</span>
                        <span>{VNDFormart(total.discount + total.money)}</span>
                    </Box>
                    <Box className={classes.row}>
                        <span>Tổng giảm giá</span>
                        <span>{VNDFormart(total.discount)}</span>
                    </Box>
                    <Box className={classes.row}>
                        <span>Tổng cần thanh toán</span>
                        <span>{VNDFormart(total.money)}</span>
                    </Box>
                    <Box className={classes.row}>
                        <span>Tổng số lượng sản phẩm</span>
                        <span>{(total.quantity)} chiếc</span>
                    </Box>
                </Box>
                <Box>
                    {order.status !== 'complete' && <Button className={classes.btn} onClick={() => handleClick(order)}>{order.status === 'unapproved' ? 'Phê duyệt đơn hàng':'Hoàn thành đơn hàng'}</Button>}
                </Box>
            </Box>
          
        </Box> 
        : <Loading />
    );
}

export default OrderDetail;