import { useState, useEffect } from 'react';
import cardApi from '../api/cardApi';
export default function useCard(){
    const [card , setCard] = useState([]);
    useEffect(() => {
        (async () =>{
            const data = await cardApi.get();
            setCard(data.data)
        })()
    },[])
    return card;
}