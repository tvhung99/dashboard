import React , {useState , useEffect , useMemo} from 'react';
import TableOrder from '../TableOrder/index';
import { Box, Grid, Typography } from '@material-ui/core';
import productApi from '../../../../../../api/productApi';
import articleApi from '../../../../../../api/articleApi';
import Loading from '../../../../../../components/Loading';
import orderApi from '../../../../../../api/orderApi';
import { useSelector } from 'react-redux';

OrderStatistic.propTypes = {
    
};

function OrderStatistic(props) {
    const token = useSelector(state => state.auth.token);
    const [analys , setAnalys] = useState([]);
    const [state, setState] = useState();
    const [loading , setLoading] = useState(true);
    const [ordersCount , setOrdersCount] = useState();
    const headers = useMemo(() =>{
        return {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': "*",
            "Authorization":"Bearer "+ token,
        }
    },[token])
    const handleTableChange = () =>{
        setState({});
    }
    useEffect(() =>{
        (async () =>{
            const activePCount = await productApi.count('product/active/count');
            const deactivePCount = await productApi.count('product/deleted/count');
            const activeACount = await articleApi.count('article/count');
            const deactiveACount = await articleApi.count('article/deleted/count');
            const oNew = await orderApi.count({headers ,params : {status : 'unapproved'}});
            const oApproved = await orderApi.count({headers , params:{status : 'approved'}});
            const oComplete = await orderApi.count({headers , params : {status : 'complete'},});
            
            setAnalys([
                {
                    id:1,
                    title : 'Sản phẩm',
                    active : activePCount,
                    delete : deactivePCount,
                    color :'#CCE2CB',
                },
                {
                    id:2,
                    title : 'Bài viết',
                    active : activeACount,
                    delete : deactiveACount,
                    color:'#FFDBCC'
                }
            ])
            setOrdersCount({
                oNew,
                oApproved,
                oComplete,
                
            })
            setLoading(false);
            
        })()
        return () =>{}
    },[headers])
    return (
        !loading ? 
        <>
            
            <Box style={{padding : 20}}>
                <Typography style={{fontSize :22,fontWeight:700,marginBottom:20,}}>
                    Thống kê trang web
                </Typography>
                <Box>
                    <Grid container spacing={0}>
                        {
                            analys.map(x => (
                                <Grid style={{background:`${x.color}` , padding:20, margin :'0 10px' } }key={x.id} item xs={12} sm={12} md={2} lg={2}>
                                    <Typography style={{fontWeight:700,fontSize:20}}>{x.title}</Typography>
                                    <Box style={{display:'flex',flexFlow:'column wrap'}}>
                                        <span style={{marginTop:5, fontWeight:700,}}>{x.active} active </span>
                                        <span style={{marginTop:5,}}>{x.active + x.delete} tổng</span>
                                    </Box>
                                </Grid>
                            ))
                        }
                        <Grid style={{background:`#d4f0f0` , padding:20, margin :'0 10px'} } item xs={12} sm={12} md={2} lg={2}>
                                    <Typography style={{ fontWeight:700,fontSize:20}}>Hoá đơn</Typography>
                                    <Box style={{display:'flex',flexFlow:'column wrap'}}>
                                        <span style={{marginTop:5,}}>{ordersCount.oNew} hoá đơn mới</span>
                                        <span style={{marginTop:5,}}>{ordersCount.oComplete} hoàn thành</span>
                                        <span style={{marginTop:5,}}>{ordersCount.oApproved} đang giao</span>
                                    </Box>
                                </Grid>
                    </Grid>
                </Box>
            </Box>
            <TableOrder onChange={handleTableChange} />
        </>
        :
        <Loading />
    );
}

export default OrderStatistic;