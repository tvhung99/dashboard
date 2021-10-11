import { useState, useEffect } from 'react';
import CPUApi from '../api/CPUApi';
export default function useCPU(){
    const [cpu , setCpu] = useState([]);
    useEffect(() => {
        (async () =>{
            const data = await CPUApi.get();
            setCpu(data.data)
        })()
    },[])
    return cpu;
}