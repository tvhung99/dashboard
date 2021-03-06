import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Input, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as yup from "yup";
import productApi from '../../../../../api/productApi';
import upload from '../../../../../api/upload';
import choose from '../../../../../assests/images/choose.png';
import InputField from '../../../../../components/form-control/InputField';
import SelectField from '../../../../../components/form-control/SelectField';
import TextEditor from '../../../../../components/form-control/TextEditor';
import Loading from '../../../../../components/Loading';
import useBrand from '../../../../../hooks/useBrand';
import useCard from '../../../../../hooks/useCard';
import useCPU from '../../../../../hooks/useCPU';
import useHardDisk from '../../../../../hooks/useHardDisk';
import useRam from '../../../../../hooks/useRam';
import useScreen from '../../../../../hooks/useScreen';
import useType from '../../../../../hooks/useType';
ProductAddForm.propTypes = {
    onSubmit : PropTypes.func,
    isEdit : PropTypes.bool,
};

const useStyles = makeStyles(() =>({
    imageLabel : {
        display:'block',
        width:50,
        height:50,
        background:`url(${choose}) center / contain no-repeat`,
        marginTop:20,
        cursor : 'pointer'
    },
    title:{
        margin:'20px 0',
        padding:'0 20px',
        fontSize:22,
        fontWeight:700,
        color:'orange'

    }
}))

function ProductAddForm({onSubmit , isEdit}) {
    const classes = useStyles();
    
    const params = useParams();
    const id = params.id;
    const [file , setFile] = useState([])
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
    const [loading , setLoading]= useState(true);

    const schema = yup.object({
        brand_id: yup.string().required('Vui l??ng ch???n th????ng hi???u'),
        screen_id:yup.string().required('Vui l??ng ch???n m??n h??nh'),
        card_id: yup.string().required('Vui l??ng ch???n card ????? ho???'),
        harddisk_id: yup.string().required('Vui l??ng ch???n ??? c???ng'),
        class_id:yup.string().required('Vui l??ng ch???n d??ng m??y'),
        cpu_id:yup.string().required('Vui l??ng ch???n CPU'),
        ram_id:yup.string().required('Vui l??ng ch???n RAM'),
        product_name: yup.string().required('Vui l??ng nh???p t??n s???n ph???m').min(6 , 'T??n s???n ph???m ph???i d??i h??n 6 k?? t???'),
        mass:yup.string().required('Vui l??ng nh???p tr???ng l?????ng'),
        size:yup.string().required('Vui l??ng nh???p k??ch th?????c'),
        camera:yup.string().required('Vui l??ng nh???p camera'),
        price:yup.string().required('Vui l??ng nh???p gi??'),
        discount:yup.string().required('Vui l??ng nh???p gi???m gi??'),
        images :yup.array().of(yup.string().min(1,'Vui l??ng th??m ???nh')).min(1),
        
      })


    useEffect(() => {
        isEdit &&  (async () =>{
            const data = await productApi.getById(id);
            if(data){
                setProd(data)
                setImgs(data.image_product);
                setLoading(false);
            }
            return () =>{}
        })()

    },[isEdit,id])
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
    },[prod , form ])
   
    
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
        else values.images = imgs; // values.image n???u l???i
        if(!onSubmit) return;
        onSubmit(values);
       
    }
    const handleChange = (e)=>{
        const list = Array.from(e.target.files);
        setUploadFile(list)
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
        alert(process.env.REACT_APP_UPLOAD_BACKEND + url);
    
    }

    return (
        <>
        {isEdit && (loading && <Loading />)}
        <Typography className={classes.title}>{isEdit ? "S???a s???n ph???m" : "Th??m s???n ph???m m???i"}</Typography>
        <form onSubmit={form.handleSubmit(handleSubmit)} style={{padding:'30px 20px'}}>
            <Box>
                <Grid container spacing={2} style={{alignItems:'center'}}>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="product_name" label="T??n s???n ph???m"  form={form}/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="brand_id" label="Th????ng Hi???u"  form={form}>
                            <MenuItem  value="">Ch???n Th????ng Hi???u</MenuItem>
                            {brand.map((br) => (<MenuItem key={br.brand_id} value={br.brand_id}>{br.brand_name}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="harddisk_id" label="??? c???ng"  form={form}>
                            <MenuItem  value="">Ch???n ??? C???ng</MenuItem>
                            {hardDisk.map((item) => (<MenuItem key={item.harddisk_id} value={item.harddisk_id}>{item.capacity_harddisk}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="card_id" label="Card ????? Ho???"  form={form}>
                            <MenuItem  value="">Ch???n Card ????? Ho???</MenuItem>
                            {card.map((item) => (<MenuItem key={item.card_id} value={item.card_id}>{item.card_detail}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="screen_id" label="M??n H??nh"  form={form}>
                            <MenuItem  value="">Ch???n M??n H??nh</MenuItem>
                            {monitor.map((item) => (<MenuItem key={item.screen_id} value={item.screen_id}>{item.screen_detail}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="class_id" label="D??ng M??y"  form={form}>
                            <MenuItem  value="">Ch???n D??ng M??y</MenuItem>
                            {type.map((item) => (<MenuItem key={item.class_id} value={item.class_id}>{item.class_name}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="cpu_id" label="CPU"  form={form}>
                            <MenuItem  value="">Ch???n CPU</MenuItem>
                            {cpu.map((item) => (<MenuItem key={item.cpu_id} value={item.cpu_id}>{item.cpu_name}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <SelectField name="ram_id" label="RAM"  form={form}>
                            <MenuItem  value="">Ch???n RAM</MenuItem>
                            {ram.map((item) => (<MenuItem key={item.ram_id} value={item.ram_id}>{item.ram_detail}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="mass" label="C??n n???ng"  form={form}/> 
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="size" label="K??ch th?????c"  form={form}/> 
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="camera" label="Camera"  form={form}/> 
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="price" label="Gi??"  form={form}/> 
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                        <InputField name="discount" label="Gi???m gi??(%)"  form={form}/> 
                    </Grid>
                    
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <span>???nh s???n ph???m </span>
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
                        <span>???nh ????? insert b??i vi??t</span>
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
                    
                    
                    <Button type="submit" variant="contained" style={{background:'orange' , color:'white' , fontWeight:700}} fullWidth >
                        {isEdit ? 'S???a s???n ph???m' : 'Th??m s???n ph???m'}
                    </Button>
                </Grid>
                
            </Box>
        </form>

        </>
    );
}

export default ProductAddForm;