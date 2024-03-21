import { useState, useEffect } from 'react';
import { getActiveTodos, getCompletedTodos } from '@/actions/todo';
import { Todo } from '../Type/todo';

export const useTodos = () => {
    const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchTodos = async () =>{
            const [active, completed] = await Promise.all([getActiveTodos(), getCompletedTodos()])
            //const active = await getActiveTodos();
            //const completed = await getCompletedTodos();
            setActiveTodos(active);
            setCompletedTodos(completed);
        };
        fetchTodos();
    }, []);

    return {activeTodos, setActiveTodos, completedTodos, setCompletedTodos};
};