"use client"

import React, { useEffect, useState } from 'react';
import { getAll, getActiveTodos, getCompletedTodos } from "@/actions/todo";
import List from './List';
import "../globals.css"
import { Stopwatch } from './Stopwatch';

export default function App () {
    const [activeTodos, setActiveTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const activeTodos = await getActiveTodos();
            setActiveTodos(activeTodos);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const completedTodos = await getCompletedTodos();
            setCompletedTodos(completedTodos);
        };
        fetchData();
    }, []);

    return (
    <div>
        <h1 className="title">Manage Your Todos 🚀</h1>
        <Stopwatch /><br />
        <List activeTodos={activeTodos} setActiveTodos={setActiveTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
    
    </div>
    );
}