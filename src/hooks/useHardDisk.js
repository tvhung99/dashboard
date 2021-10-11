import { useState, useEffect } from 'react';
import hardDiskApi from '../api/hardDiskApi';
export default function useHardDisk(){
    const [hardDisk , setHardDisk] = useState([]);
    useEffect(() => {
        (async () =>{
            const data = await hardDiskApi.get();
            setHardDisk(data)
        })()
    },[])
    return hardDisk;
}