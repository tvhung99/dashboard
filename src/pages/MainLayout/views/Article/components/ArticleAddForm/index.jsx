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

ArticleAddForm.propTypes = {
    onSubmit : PropTypes.func,
};

function ArticleAddForm({onSubmit}) {
    const [file , setFile] = useState([])
    const [fileName , setFileName] = useState([]);
    const [uploadFile , setUploadFile] = useState();
    const initArticle = {
        title : '',
        short_description:'',
        author : '',
        content:'',
    }
    const handleChange = (e)=>{
        const thumbnail = e.target.files[0];
        setUploadFile(thumbnail)
        const fn = thumbnail.name;
        setFileName(fn);
        const fshow = URL.createObjectURL(thumbnail)
        setFile(fshow);

    }
    const handleSubmit = (values) =>{
        if(values.author === '') values.author = 'Trần Hùng';
        values.thumbnail = fileName[0];
        console.log(values);
        if(uploadFile){
            firebaseUpload(uploadFile)
                .then(() => {
                    console.log('all file upload complete');
                })
                .catch((e) => console.log(e.code))
        }
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
                    <Grid item lg={12}>
                        <InputField form={form} label="Mô tả" name="short_description" />    
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <span>Ảnh sản phẩm </span>
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
                        file && <Grid key={file} item xs={4} md={4} lg={4} xl={4}>
                        <CardMedia
                           
                           component="img"
                           alt="Contemplative Reptile"
                           height="140"
                           image={file}
                           title="Contemplative Reptile"
                       />

                   </Grid>
                                            
             
                    }
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