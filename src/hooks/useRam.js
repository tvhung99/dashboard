import { useState, useEffect } from 'react';
import ramApi from '../api/ramApi';
export default function useType(){
    const [ram , setRam] = useState([]);
    useEffect(() => {
        (async () =>{
            const data = await ramApi.get();
            setRam(data)
        })()
    },[])
    return ram;
}