import React, { useEffect, useState } from 'react';
import { getAll, getCurrentAll } from "@/actions/todo";
import List from './List';
import "../globals.css"


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
        <h1 className="title">Manage Your Todos 🚀</h1>
        <List todoss={todoss} />
    </div>
    );
}