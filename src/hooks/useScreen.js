import { useState, useEffect } from 'react';
import screenApi from '../api/screenApi';
export default function useScreen(){
    const [screen , setScreen] = useState([]);
    useEffect(() => {
        (async () =>{
            const data = await screenApi.get();
            setScreen(data)
        })()
    },[])
    return screen;
}