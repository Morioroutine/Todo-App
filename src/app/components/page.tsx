"use client"

import React from 'react';
import { useTodos } from '../hooks/useTodos';
import List from './List';
import "../globals.css"
import { Stopwatch } from './Stopwatch';

export default function App () {
    const { activeTodos, setActiveTodos, completedTodos, setCompletedTodos } = useTodos();

    return (
    <div>
        <h1 className="title">Manage Your Todos 🚀</h1>
        <Stopwatch /><br />
        <List 
        activeTodos={activeTodos}
        setActiveTodos={setActiveTodos}
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos}
         />
    </div>
    );
}