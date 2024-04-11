"use client"

import { useEffect, useState } from 'react';
import { getUserId } from '@/actions/todo';
import DisplayClientId from '../components/DisplayClientId';



export default function Pay() {
    const [userId, setUserId] = useState('ゲスト');

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };

        fetchUserId(); 
    }, []); 

    console.log("テスト用", userId);

    return (
        <>
            <h3>{userId}</h3>
            <a href={`https://buy.stripe.com/test_7sI7uTbwRg49brW8wE?client_reference_id=${userId}`}>サブスク契約</a>
            <br />
            <DisplayClientId />

        </>
    );
}
