import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CardMedia, Grid, Input, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
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
import firebaseUpload from '../../../../../ulitilize/FirebaseUpload';

ProductAddForm.propTypes = {
    onSubmit : PropTypes.func,
};

function ProductAddForm({onSubmit}) {
    const [file , setFile] = useState([])
    const [fileName , setFileName] = useState([]);
    const [uploadFile , setUploadFile] = useState();
    const brand = useBrand();
    const hardDisk = useHardDisk();
    const card = useCard();
    const cpu = useCPU();
    const monitor = useScreen();
    const ram = useRam();
    const type = useType();
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
        image :yup.array().of(yup.string().min(1,'Vui lòng thêm ảnh')).min(1),
        
      })
    const form = useForm({
        defaultValues:{
            brand_id:'',
            cpu_id:'',
            product_name:'',
            harddisk_id:"",
            card_id:'',
            screen_id:'',
            class_id:"",
            ram_id:'',
            mass:'',
            size:'',
            camera:'',
            price:'',
            discount:'',
            product_detail:'',
            image :'',
        },
        resolver : yupResolver(schema),
    })
   
    const handleSubmit = (values) => {
        values['image'] = fileName;
        firebaseUpload(uploadFile)
            .then(() => {
                console.log('all file upload complete');
                if(!onSubmit) return;
                onSubmit(values);
            })
            .catch((e) => console.log(e.code))
    }
    const handleChange = (e)=>{
        const list = Array.from(e.target.files);
        setUploadFile(list)
        const fn = (list.reduce((total , next) => total.concat(next.name) ,[]))
        setFileName(fn);
        const fshow = list.reduce((total , next) => total.concat(URL.createObjectURL(next)) , []);
        setFile(fshow);

    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} style={{padding:'30px 20px'}}>
            <Box>
                <Grid container spacing={2} style={{alignItems:'center'}}>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <InputField name="product_name" label="Tên sản phẩm"  form={form}/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <SelectField name="brand_id" label="Thương Hiệu"  form={form}>
                            <MenuItem  value="">Chọn Thương Hiệu</MenuItem>
                            {brand.map((br) => (<MenuItem key={br.brand_id} value={br.brand_id}>{br.brand_name}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <SelectField name="harddisk_id" label="Ổ cứng"  form={form}>
                            <MenuItem  value="">Chọn Ổ Cứng</MenuItem>
                            {hardDisk.map((item) => (<MenuItem key={item.harddisk_id} value={item.harddisk_id}>{item.capacity_harddisk}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <SelectField name="card_id" label="Card Đồ Hoạ"  form={form}>
                            <MenuItem  value="">Chọn Card Đồ Hoạ</MenuItem>
                            {card.map((item) => (<MenuItem key={item.card_id} value={item.card_id}>{item.card_detail}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <SelectField name="screen_id" label="Màn Hình"  form={form}>
                            <MenuItem  value="">Chọn Màn Hình</MenuItem>
                            {monitor.map((item) => (<MenuItem key={item.screen_id} value={item.screen_id}>{item.screen_detail}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <SelectField name="class_id" label="Dòng Máy"  form={form}>
                            <MenuItem  value="">Chọn Dòng Máy</MenuItem>
                            {type.map((item) => (<MenuItem key={item.class_id} value={item.class_id}>{item.class_name}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <SelectField name="cpu_id" label="CPU"  form={form}>
                            <MenuItem  value="">Chọn CPU</MenuItem>
                            {cpu.map((item) => (<MenuItem key={item.cpu_id} value={item.cpu_id}>{item.cpu_name}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <SelectField name="ram_id" label="RAM"  form={form}>
                            <MenuItem  value="">Chọn RAM</MenuItem>
                            {ram.map((item) => (<MenuItem key={item.ram_id} value={item.ram_id}>{item.ram_detail}</MenuItem>))}
                        </SelectField>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3} xl={3}>
                        <InputField name="mass" label="Cân nặng"  form={form}/> 
                    </Grid>
                    <Grid item xs={3} md={3} lg={3} xl={3}>
                        <InputField name="size" label="Kích thước"  form={form}/> 
                    </Grid>
                    <Grid item xs={3} md={3} lg={3} xl={3}>
                        <InputField name="camera" label="Camera"  form={form}/> 
                    </Grid>
                    <Grid item xs={3} md={3} lg={3} xl={3}>
                        <InputField name="price" label="Giá"  form={form}/> 
                    </Grid>
                    <Grid item xs={3} md={3} lg={3} xl={3}>
                        <InputField name="discount" label="Giảm giá(%)"  form={form}/> 
                    </Grid>
                    
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Input type="file" accept="image/*" name="image" inputProps={{multiple : true}} onChange={handleChange} />

                    </Grid>
                    {
                        file.length > 0 && file.map(x => (
                            

                            <Grid key={x} item xs={4} md={4} lg={4} xl={4}>
                                 <CardMedia
                                    
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image={x}
                                    title="Contemplative Reptile"
                                />

                            </Grid>
                           
                        ))
                                            
             
                    }
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <TextEditor name="product_detail" form={form} />
                    </Grid>
                    
                    
                    <Button type="submit" variant="contained" color="primary" fullWidth >
                    Login
                </Button>
                </Grid>
                
            </Box>
        </form>
    );
}

export default ProductAddForm;