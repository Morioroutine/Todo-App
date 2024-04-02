"use client"

import { useEffect, useState } from 'react';
import { getUserId } from '@/actions/todo';

export default function Pay() {
    const [userId, setUserId] = useState('ゲスト');

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };

        fetchUserId(); 
    }, []); // 空の依存配列でコンポーネントのマウント時にのみ実行

    console.log("テスト用", userId);

    return (
        <>
            <h1>{userId}</h1>
            <a href={`https://buy.stripe.com/test_7sI7uTbwRg49brW8wE?client_reference_id=${userId}`}>サブスク契約</a>
        </>
    );
}