import React , {useState} from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { Box, Button, Grid, TextField, Input, CardMedia } from '@material-ui/core';
import InputField from '../../../../../../components/form-control/InputField/index';
import TextEditor from '../../../../../../components/form-control/TextEditor';
import { yupResolver } from '@hookform/resolvers/yup';
import firebaseUpload from '../../../../../../ulitilize/FirebaseUpload';
import choose from '../../../../../../assests/images/choose.png'
import upload from '../../../../../../api/upload';
import { useSelector } from 'react-redux';

ArticleAddForm.propTypes = {
    onSubmit : PropTypes.func,
};

function ArticleAddForm({onSubmit}) {
    const [file , setFile] = useState([])
    const [fileName , setFileName] = useState();
    const [uploadFile , setUploadFile] = useState();
    const token = useSelector((state) => state.auth.token);
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
            // const fn = thumbnail.name;
            // setFileName(fn);
            const fshow = URL.createObjectURL(thumbnail)
            setFile(fshow);
        }

    }
    // const uploadImg = async (formData ) =>{
    //     return await upload.upload(formData , {
    //         headers : {
    //             'Content-Type': 'application/json;charset=UTF-8',
    //             'Access-Control-Allow-Origin': "*",
    //             "Authorization":"Bearer "+ token,
    //         }
    //     })
    // }
    const handleArticleImageChange = async (e) =>{
        let formData = new FormData();
        const f = e.target.files;
        Array.from(f).forEach(i =>formData.append("image[]",i) )
        
        const url = await upload.upload(formData , {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': "*",
                "Authorization":"Bearer "+ token,
            }
        })
        alert(process.env.REACT_APP_UPLOAD_BACKEND+url[0].url);
    


    }
    const handleSubmit = async (values) =>{
        const formData = new FormData();
        formData.append("thumbnail" ,uploadFile);
        const url = await upload.upload(formData , {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': "*",
                "Authorization":"Bearer "+ token,
            }
        })
        if(values.author === '') values.author = 'Trần Hùng';
        values.thumbnail = url;
        console.log(values);
    
        if(!onSubmit) return;
        onSubmit(values)
    }
    const shema = yup.object({
        title : yup.string().required('Vui lòng nhập tên bài viết'),
        short_description : yup.string().required('Vui lòng nhập nội dung mô tả'),
        content : yup.string().required('Vui lòng nhập nội dung'),
    })
    const form = useForm({
        defaultValues : initArticle,
        resolver:yupResolver(shema),
    })
    return (
        <Box>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <InputField form={form} label="Tiêu đề" name="title" />
                    </Grid>
                    <Grid item lg={6}>
                        <InputField form={form} label="Tác giả" name="author" />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <span>Ảnh thumbnail</span>
                        <label htmlFor="thumbnail" style={{display:'block',
                            width:50,
                            height:50,
                            background:`url(${choose}) center / contain no-repeat`,
                            marginTop:20,
                            cursor : 'pointer'}}>

                        </label>
                        <Input type="file" accept="image/*" name="thumbnail" id="thumbnail" onChange={handleChange} style={{opacity:0 , visibility:'hidden'}} />
                    </Grid>
                    {
                        file.length > 0 && <Grid key={file} item xs={12} md={12} lg={12} xl={12}>
                                <img src={file} width="25%" alt="a" />
                        </Grid>
                    }
                    <Grid item lg={12} md={8}>
                        <InputField form={form} label="Mô tả" name="short_description" />    
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <span>Ảnh để insert bài viêt</span>
                        <label htmlFor="image" style={{display:'block',
                            width:50,
                            height:50,
                            background:`url(${choose}) center / contain no-repeat`,
                            marginTop:20,
                            cursor : 'pointer'}}>

                        </label>
                        <Input type="file" accept="image/*" name="image" id="image" onChange={handleArticleImageChange} style={{opacity:0 , visibility:'hidden'}} />
                    </Grid>
                    <Grid item lg={12}>
                        <TextEditor form={form} label="Nội dung" name="content" />
                    </Grid>
                    <Button type="submit">Thêm bài viết</Button>
                </Grid>
            </form>
        </Box>
    );
}

export default ArticleAddForm;