import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import articleApi from '../../../../../../api/articleApi';
import Loading from '../../../../../../components/Loading';

const head = ['', 'Tiêu đề' , 'Tác giả'];
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

          padding:'5px!important',
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
        margin:'0 10px',
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

function TableArticle(props) {
    const token = useSelector((state) => state.auth.token);
    const [isDeleted, setIsDeleted] = useState(false); 
    const [check,setCheck] = useState(false);
    const [articles , setArticles] = useState([]);
    const navigate = useNavigate();
    const [count , setCount] = useState();
    const [page , setPage] = useState(1);
    const [filter,setFilter] = useState({page : page});
    const [loading,setLoading] = useState(true);
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': "*",
        "Authorization":"Bearer "+ token,
    }
    useEffect(() =>{
        (async () =>{
            setLoading(true)
            try {
                const {data , last_page , current_page} = !isDeleted ? await articleApi.getActive(filter) : await articleApi.getDeleted(filter);
                setArticles(data);
                setCount(last_page);
                console.log(last_page);
                setPage(current_page);
                setLoading(false);
            } catch (error) {
                
            }
        })()
    },[check ,filter , isDeleted])
    const classes = useStyles();
    const updateArticle =(id) =>{
        navigate('/bai-viet/cap-nhat/'+id)
    }
    const removeArticle = async (article) =>{
        if(article.deleted_at){
            alert('Không thể xoá sản phẩm đã xoá');
            return;
        }
        const config = {headers}
        await articleApi.remove(article.news_id , config);
        setCheck((prev) => !prev)
    }
    const undoDelete = async (article) =>{
        const config = {headers}
        await articleApi.undo(article.news_id,config);
        setCheck((prev) => !prev)
    }
    const handlePaginationChange = (e,page) =>{
        setFilter({
            ...filter,
            page : page,
        })

    }
    const showDeleted =() =>{
        setIsDeleted(true);
        setFilter({
            ...filter,
            page : 1,
        })
    }
    const showActive =() =>{
        setIsDeleted(false);
        setFilter({
            ...filter,
            page : 1,
        })
    }
    return (
        <Box>
            <Box className={classes.root}>
                <Box style={{margin:'10px 0'}}>
                <Button onClick={showDeleted} className={isDeleted ? classes.activeBtn : classes.btn}>Đã Xoá</Button> <Button className={!isDeleted ? classes.activeBtn : classes.btn} onClick={showActive}>Active</Button>
                </Box>

                {
                !loading ? 
                <Table className={classes.table}>
                    <TableHead className={classes.head}>
                        <TableRow>
                            {head.map((x , index) => <TableCell className={classes.cellHeader} key={index}>{x}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles && articles.map((article) =>{
                            return (
                                <TableRow key={article.news_id} className={classes.row}>
                                    <TableCell className={classes.cell}>
                                         <Button disabled={!!article.deleted_at} className={classes.update} onClick={() => updateArticle(article.news_id , article)}>Sửa</Button>
                                        {!article.deleted_at && <Button className={classes.delete} onClick={() => removeArticle(article)}>Xoá</Button>}
                                        {article.deleted_at && <Button className={classes.undo} onClick={() => undoDelete(article)}>Undo</Button>}
                                    </TableCell >
                                    <TableCell className={classes.cell}>{article.title}</TableCell>
                                    <TableCell className={classes.cell}>{article.author}</TableCell>
                                    
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table> : <Loading />
                }
                <Box className={classes.paginate}>
                    <Pagination page={page} count={count} onChange={handlePaginationChange} />
                </Box>
            </Box>
        </Box>
    );
}

export default TableArticle;