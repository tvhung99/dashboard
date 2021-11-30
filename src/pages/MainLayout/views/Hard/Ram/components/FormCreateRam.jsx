import React ,{useState , useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useRam from '../../../../../../hooks/useRam';
import cateRamApi from '../../../../../../api/cateRamApi';
import { Grid ,MenuItem} from '@material-ui/core';
import SelectField from '../../../../../../components/form-control/SelectField/index';

function FormCreateRam({onSubmit}) {
    const [cateRam , setCateRam] =useState();
    const [loading , setLoading] = useState(true)
    useEffect(() =>{
        (async () =>{
            const data = (await cateRamApi.get()).sort((a , b) => Number(a.capacity_ram.slice(0,-2)) - Number(b.capacity_ram.slice(0,-2)));
            setCateRam(data);
            setLoading(false);
        })()
        return () =>{}
    },[])
    const form = useForm({
        defaultValues:{
            capacity_ram_id : '',
            capacity_ram : '',
        },
        resolver:yupResolver(yup.object({

        }))
    })
    const handleSubmit = (value) =>{

    }
    return (
        !loading && <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid item xs={12} md={12} lg={4} xl={4}>
            <SelectField name="capacity_ram_id" label="Dung lượng RAM"  form={form}>
                <MenuItem  value="">Dung lượng RAM</MenuItem>
                {cateRam.map((br) => (<MenuItem key={br.capacity_ram_id} value={br.capacity_ram_id}>{br.capacity_ram}</MenuItem>))}
            </SelectField>
        </Grid>
    </form>
    );
}

export default FormCreateRam;