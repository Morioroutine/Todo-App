"use client"

import React, { useEffect, useState } from 'react';
import { getAll } from "@/actions/todo"
import List from './List'
import Add from './Add';
import LoginBtn from '@/app/view/login-btn'


export default function Page () {
    const [todoss, setTodoss] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const todosData = await getAll();
            setTodoss(todosData);
        };
        fetchData();
    }, []);

    return (
    <div>
        <h1>Manage Your Todos 🚀</h1>
        <List todoss={todoss} />
    </div>
    );
}