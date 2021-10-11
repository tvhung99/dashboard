import { useState, useEffect } from 'react';
import brandApi from '../api/brandApi';
export default function useBrand(){
    const [brand , setBrand] = useState([]);
    useEffect(() => {
        (async () =>{
            const data = await brandApi.get();
            setBrand(data.data)
        })()
    },[])
    return brand;
}