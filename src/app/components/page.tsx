import React, { useEffect, useState } from 'react';
import { getAll, getCurrentAll } from "@/actions/todo";
import List from './List';


export default function App () {
    const [todoss, setTodoss] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const todosData = await getCurrentAll();
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