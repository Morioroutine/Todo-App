"use client"

import React, {useState} from "react";
import {useForm} from "react-hook-form";

function TodoApp(){
    const {register, handleSubmit, reset } = useForm();
    const [todos, setTodos] = useState([]);
    const [deletedTodos, setDeletedTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});

    const onSubmit = (data) => {
        if (isEditing) {
            const updateTodos = [...todos];
            updateTodos[currentTodo.index] = data.todo;
            setTodos(updatedTodos);
            setIsEditing(false);
        } else {
            setTodos([...todos, data.todo]);
        }
        reset(); //入力フィールドをリセット
    }

    const removeTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        const deletedItem = todos[index];
        setTodos(newTodos);
        setDeletedTodos([...deletedTodos, deletedItem]); //削除された項目を追加
    }

    const editTodo = (todo,index) => {
        setIsEditing(true);
        setCurrentTodo({ text: todo, index});
        reset({ todo });
    }

    const renderTodoForm = () => (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("todo")} placeholder="新しいTodoを入力" defaultValue = {currentTodo.text} />
        <button type = "submit">{isEditing ? "保存" : "追加"}</button>
        </form>
    );

    return(
        <div>
            {renderTodoForm()}
            <ul>
                {todos.map((todo,index) => (
                    <li key = {index} className="todo-iten">
                        {todo}
                        <button onClick={() => removeTodo(index)}>done!!</button>
                        <button onClick={() => editTodo(todo,index)}>編集</button>
                    </li>
            ))}
             </ul>
                <h3>今日倒した敵たち</h3>
                <ul>
                    {deletedTodos.map((todo,index) => (
                        <li key = {index} className="deleted-todo-item">
                            {todo}
                        </li>
                    ))}
                </ul>
        </div>
    );
}

export default TodoApp;