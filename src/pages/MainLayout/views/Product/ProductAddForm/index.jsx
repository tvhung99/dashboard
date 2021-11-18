import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CardMedia, Grid, Input, MenuItem, Typography } from '@material-ui/core';
import { Label } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import * as yup from "yup";
import productApi from '../../../../../api/productApi';
import InputField from '../../../../../components/form-control/InputField';
import SelectField from '../../../../../components/form-control/SelectField';
import TextEditor from '../../../../../components/form-control/TextEditor';
import useBrand from '../../../../../hooks/useBrand';
import useCard from '../../../../../hooks/useCard';
import useCPU from '../../../../../hooks/useCPU';
import useHardDisk from '../../../../../hooks/useHardDisk';
import useRam from '../../../../../hooks/useRam';
import useScreen from '../../../../../hooks/useScreen';
import useType from '../../../../../hooks/useType';
import { makeStyles } from '@material-ui/core/styles';
import choose from '../../../../../assests/images/choose.png'
import upload from '../../../../../api/upload';
import { useSelector } from 'react-redux';
ProductAddForm.propTypes = {
    onSubmit : PropTypes.func,
};

const useStyles = makeStyles(() =>({
    imageLabel : {
        display:'block',
        width:50,
        height:50,
        background:`url(${choose}) center / contain no-repeat`,
        marginTop:20,
        cursor : 'pointer'
    }
}))

function ProductAddForm({onSubmit}) {
    const classes = useStyles();
    
    const params = useParams();
    const id = params.id;
    const [file , setFile] = useState([])
    const [fileName , setFileName] = useState([]);
    const [imgs , setImgs] = useState([]);
    const [prod , setProd] = useState({});
    const [uploadFile , setUploadFile] = useState();
    const brand = useBrand();
    const hardDisk = useHardDisk();
    const card = useCard();
    const cpu = useCPU();
    const monitor = useScreen();
    const ram = useRam();
    const type = useType();
    const [loading , setLoading]= useState(true)

    const schema = yup.object({
        brand_id: yup.string().required('Vui lòng chọn thương hiệu'),
        screen_id:yup.string().required('Vui lòng chọn màn hình'),
        card_id: yup.string().required('Vui lòng chọn card đồ hoạ'),
        harddisk_id: yup.string().required('Vui lòng chọn ổ cứng'),
        class_id:yup.string().required('Vui lòng chọn dòng máy'),
        cpu_id:yup.string().required('Vui lòng chọn CPU'),
        ram_id:yup.string().required('Vui lòng chọn RAM'),
        product_name: yup.string().required('Vui lòng nhập tên sản phẩm').min(6 , 'Tên sản phẩm phải dài hơn 6 kí tự'),
        mass:yup.string().required('Vui lòng nhập trọng lượng'),
        size:yup.string().required('Vui lòng nhập kích thước'),
        camera:yup.string().required('Vui lòng nhập camera'),
        price:yup.string().required('Vui lòng nhập giá'),
        discount:yup.string().required('Vui lòng nhập giảm giá'),
        images :yup.array().of(yup.string().min(1,'Vui lòng thêm ảnh')).min(1),
        
      })


    useEffect(() => {
        if(id){
            (async () =>{
                const data = await productApi.getById(id);
                if(data){
                    console.log(data);
                    setProd(data)
                    setImgs(data.image_product);
                    setLoading(false);
                    
                    
                }
                return () =>{}
            })()
            
        }
    },[id])
    const initValue = {
        brand_id:prod.brand_id || '',
        cpu_id:prod.cpu_id || '',
        product_name:prod.product_name || '',
        harddisk_id:prod.harddisk_id||"",
        card_id:prod.card_id||'',
        screen_id:prod.screen_id||'',
        class_id:prod.class_id || "",
        ram_id:prod.ram_id||'',
        mass:prod.mass ||'',
        size:prod.size||'',
        camera:prod.camera||'',
        price:prod.price || '',
        discount:prod.discount||'',
        product_detail:prod.product_detail||'',
        images :[],
    }
    const form  = useForm({
        defaultValues: initValue,
        resolver : yupResolver(schema),
    }) 
    useMemo(() =>{
        Object.keys(prod).forEach(key => form.setValue(key, prod[key]))
    },[prod , form])
   
    
    const token = useSelector(state => state.auth.token);
   
    const handleSubmit = async (values) => {
        let formData = new FormData();
        if(uploadFile){
            uploadFile.forEach(file => formData.append('image[]',file));
            const images = await upload.upload(formData , {
                headers : {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': "*",
                    "Authorization":"Bearer "+ token,
                }
            })
            values.images = images;
        }
        else values.image = imgs;
        if(!onSubmit) return;
        onSubmit(values);
       
    }
    const handleChange = (e)=>{
        const list = Array.from(e.target.files);
        setUploadFile(list)
        const fn = (list.reduce((total , next) => total.concat(next.name) ,[]))
        setFileName(fn);
        const fshow = list.reduce((total , next) => total.concat(URL.createObjectURL(next)) , []);
        setFile(fshow);

    }
    const handleArticleImageChange = async (e) =>{
        let formData = new FormData();
        const f = e.target.files;
        Array.from(f).forEach(i =>formData.append("thumbnail",i) )
        
        const url = await upload.upload(formData , {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': "*",
                "Authorization":"Bearer "+ token,
            }
        })
        alert(process.env.REACT_APP_UPLOAD_BACKEND+url);
    
    }

    return (
        <>
        {id && (loading && <Typography>Loading</Typography>)}
        {id ? <Typography>Sửa sản phẩm </Typography> : <Typography>Thêm sản phẩm</Typography> }
        <form onSubmit={form.handleSubmit(handleSubmit)} style={{padding:'30px 20px'}}>
            <Box>
                <Grid container spacing={2} style={{alignItems:'center'}}>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="product_name" label="Tên sản phẩm"  form={form}/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="brand_id" label="Thương Hiệu"  form={form}>
                            <MenuItem  value="">Chọn Thương Hiệu</MenuItem>
                            {brand.map((br) => (<MenuItem key={br.brand_id} value={br.brand_id}>{br.brand_name}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="harddisk_id" label="Ổ cứng"  form={form}>
                            <MenuItem  value="">Chọn Ổ Cứng</MenuItem>
                            {hardDisk.map((item) => (<MenuItem key={item.harddisk_id} value={item.harddisk_id}>{item.capacity_harddisk}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="card_id" label="Card Đồ Hoạ"  form={form}>
                            <MenuItem  value="">Chọn Card Đồ Hoạ</MenuItem>
                            {card.map((item) => (<MenuItem key={item.card_id} value={item.card_id}>{item.card_detail}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="screen_id" label="Màn Hình"  form={form}>
                            <MenuItem  value="">Chọn Màn Hình</MenuItem>
                            {monitor.map((item) => (<MenuItem key={item.screen_id} value={item.screen_id}>{item.screen_detail}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="class_id" label="Dòng Máy"  form={form}>
                            <MenuItem  value="">Chọn Dòng Máy</MenuItem>
                            {type.map((item) => (<MenuItem key={item.class_id} value={item.class_id}>{item.class_name}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="cpu_id" label="CPU"  form={form}>
                            <MenuItem  value="">Chọn CPU</MenuItem>
                            {cpu.map((item) => (<MenuItem key={item.cpu_id} value={item.cpu_id}>{item.cpu_name}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="ram_id" label="RAM"  form={form}>
                            <MenuItem  value="">Chọn RAM</MenuItem>
                            {ram.map((item) => (<MenuItem key={item.ram_id} value={item.ram_id}>{item.ram_detail}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="mass" label="Cân nặng"  form={form}/> 
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="size" label="Kích thước"  form={form}/> 
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="camera" label="Camera"  form={form}/> 
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="price" label="Giá"  form={form}/> 
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="discount" label="Giảm giá(%)"  form={form}/> 
                    </Grid>
                    
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <span>Ảnh sản phẩm </span>
                        <label htmlFor="image" className={classes.imageLabel}></label>
                        <Input type="file" accept="image/*" name="image" id="image" inputProps={{multiple : true}} onChange={handleChange} style={{opacity:0 , visibility:'hidden'}} />
                    </Grid>
                    {
                        imgs.length > 0 && file.length === 0 && imgs.map(x => (
                            <img src={`${process.env.REACT_APP_UPLOAD_BACKEND}/${x.url}`} alt="1" width="200px" />
                        ))
                    }
                    {
                        file.length > 0 && file.map(x => (
                            <Grid key={x} item xs={4} md={4} lg={4} xl={4}>
                                <img src={x} width="100%" alt="a" />
                            </Grid>
                        ))
                    }
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <span>Ảnh để insert bài viêt</span>
                        <label htmlFor="thubmnail" style={{display:'block',
                            width:50,
                            height:50,
                            background:`url(${choose}) center / contain no-repeat`,
                            marginTop:20,
                            cursor : 'pointer'}}>

                        </label>
                        <Input type="file" accept="image/*" name="thumbnail" id="thubmnail" onChange={handleArticleImageChange} style={{opacity:0 , visibility:'hidden'}} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <TextEditor name="product_detail" form={form} />
                    </Grid>
                    
                    
                    <Button type="submit" variant="contained" color="primary" fullWidth >
                    Login
                </Button>
                </Grid>
                
            </Box>
        </form>

        </>
    );
}

export default ProductAddForm;