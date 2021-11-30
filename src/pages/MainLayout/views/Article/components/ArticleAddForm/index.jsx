import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Input, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState  , useMemo} from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from "yup";
import upload from '../../../../../../api/upload';
import choose from '../../../../../../assests/images/choose.png';
import InputField from '../../../../../../components/form-control/InputField/index';
import TextEditor from '../../../../../../components/form-control/TextEditor';
import { makeStyles } from '@material-ui/core/styles';
import articleApi from '../../../../../../api/articleApi';
import { useParams } from 'react-router';

ArticleAddForm.propTypes = {
    onSubmit : PropTypes.func,
    isEdit : PropTypes.bool,
};
const useStyles = makeStyles(() =>({
    root :{

    },
    title:{
        fontSize:22,
        fontWeight:700,
        color:'orange'
    },
    btn:{
        background:'orange',
        fontWeight:'700',
        color:'white'
    }

}))

function ArticleAddForm({onSubmit , isEdit}) {
    const [file , setFile] = useState([])
    const [uploadFile , setUploadFile] = useState();
    const token = useSelector((state) => state.auth.token);
    const [article , setArticle] = useState({});
    const [thumbnail , setThumbnail] = useState();
    const [loading,setLoading] = useState(true)
    const params = useParams();
    const id = params.id;
    const initArticle = {
        title : '',
        short_description:'',
        author : '',
        content:'',
    }
    const handleChange = (e)=>{
        const thumbnail = e.target.files[0];
        setUploadFile(thumbnail)
        if(thumbnail){
            const fshow = URL.createObjectURL(thumbnail)
            setFile(fshow);
        }

    }
    const uploadImg = async (formData ) =>{
        return await upload.upload(formData , {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': "*",
                "Authorization":"Bearer "+ token,
            }
        })
    }
    const handleArticleImageChange = async (e) =>{
        let formData = new FormData();
        const f = e.target.files;
        Array.from(f).forEach(i =>formData.append("image[]",i) )
        const url = await uploadImg(formData);
        alert(process.env.REACT_APP_UPLOAD_BACKEND+url[0].url);
    }
    const handleSubmit = async (values) =>{
        if(uploadFile){
            const formData = new FormData();
            formData.append("thumbnail" ,uploadFile);
            const url = await uploadImg(formData);
            if(values.author === '') values.author = 'Trần Hùng';
            values.thumbnail = url;
        }
        else values.thumbnail = thumbnail;
        if(!onSubmit) return;
        onSubmit(values)
    }
    useEffect(() =>{
        isEdit &&  (async () =>{
            const data = await articleApi.getById(id);

            if(data){
                setArticle(data)
                setThumbnail(data.thumbnail);
                setLoading(false);
            }
            return () =>{}
        })()
    },[isEdit,id])
    const shema = yup.object({
        title : yup.string().required('Vui lòng nhập tiêu đề bài viết'),
        short_description : yup.string().required('Vui lòng nhập nội dung mô tả ngắn'),
        content : yup.string().required('Vui lòng nhập nội dung'),
    })
    const form = useForm({
        defaultValues : initArticle,
        resolver:yupResolver(shema),
    })
    useMemo(() =>{
        Object.keys(article).forEach(key => form.setValue(key, article[key]))
    },[article , form ])
   

    
    const classes = useStyles();
    return (
        <Box style={{padding:'20px'}}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography className={classes.title} >Thêm bài viết mới</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputField form={form} label="Tiêu đề" name="title" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputField form={form} label="Tác giả" name="author" />
                    </Grid>
                    <Grid item xs={12} md={3} lg={2} xl={2}>
                        <span>Ảnh thumbnail</span>
                        <label htmlFor="thumbnail" style={{display:'block',
                            width:50,
                            height:50,
                            background:`url(${choose}) center / contain no-repeat`,
                            marginTop:20,
                            cursor : 'pointer'}}>

                        </label>
                        <Input type="file" accept="image/*" name="thumbnail" id="thumbnail" onChange={handleChange} style={{opacity:0 , visibility:'hidden'}} />
                        {
                        thumbnail && file.length === 0 && 
                            <img src={`${process.env.REACT_APP_UPLOAD_BACKEND}/${thumbnail}`} alt="1" width="200px" />
                    
                    }
                        {file.length > 0 &&<img src={file} width="100%" alt="The thumbnail of the article" className="" />}
                    </Grid>
                    
                    <Grid item lg={12} md={8}>
                        <InputField form={form} label="Nội dung ngắn" name="short_description" />    
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <span>Ảnh insert bài viết.</span>
                        <label htmlFor="image" style={{display:'block',
                            width:50,
                            height:50,
                            background:`url(${choose}) center / contain no-repeat`,
                            marginTop:20,
                            cursor : 'pointer'}}>

                        </label>
                        <Input type="file" accept="image/*" name="image" id="image" onChange={handleArticleImageChange} style={{opacity:0 , visibility:'hidden'}} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextEditor form={form} label="Nội dung" name="content" />
                    </Grid>
                    <Button className={classes.btn} fullWidth type="submit">{isEdit ? 'Sửa bài viết' : 'Thêm bài viết'}</Button>
                </Grid>
            </form>
        </Box>
    );
}

export default ArticleAddForm;