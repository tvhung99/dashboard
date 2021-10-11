import { useState, useEffect } from 'react';
import typeApi from '../api/typeApi';
export default function useType(){
    const [type , setType] = useState([]);
    useEffect(() => {
        (async () =>{
            const data = await typeApi.get();
            setType(data.data)
        })()
    },[])
    return type;
}