
import { getOne, update, create, complete, allRemove, revive } from "@/actions/todo";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import '../globals.css'

type Todo = {
    id: number;
    userId: string;
    title: string;
    date: string;
}

const List = ({
    activeTodos,
    setActiveTodos,
    completedTodos,
    setCompletedTodos,
    }: {
    activeTodos: Array<Todo>;
    completedTodos: Array<Todo>;
    setActiveTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    }) => {
    
    const [button, setButton] = useState("Create");
    const [clickedId, setClickedId] = useState<number|null>(null);
    const [bouncedId, setBouncedId] = useState<number|null>(null);
    
    // const onDelete = (id:number) => {
    //     remove(id);
    //     alert("Good Job 🚀");
    //   }
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Todo>({
    })

    const handleTodoClick = (id: number) => {
        setBouncedId(id);
        setClickedId(prevId => prevId === id ? null : id); 
        setTimeout(() => setBouncedId(null), 500); 
      };

    const onSubmit = handleSubmit(async (data: any) => {
        if (data.id == null){
            const newTodo = await create(data);
            if (newTodo) {
                setActiveTodos((prevTodos) => [...prevTodos, newTodo]); 
            } else {
                alert("登録に失敗しました");
            }
            reset();
        } else {
            const updatedTodo = await update(data);
            if (updatedTodo) {
                setActiveTodos(prevTodos => prevTodos.map(todo => {
                    if (todo.id === Number(data.id)) {
                        return updatedTodo;
                    }
                    return todo;
                }));
                alert("更新しました");
                reset({ title: ""}); 
            } else {
                alert("更新に失敗しました");
            }
        }
    });
    
    const onUpdate = async (id: number) => {
        const todo = await getOne(id);
        
        if(todo == null){
            return 
        }  else {
            reset(todo)
            setButton("Update")
            }
        }

    const onComplete = async(id:number) => {
        await complete(id);
        //alert("Good job 🚀")
        setActiveTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
        const completedTodo = activeTodos.find(todo => todo.id === id);
        if (completedTodo == null){
            return
        }//completedTodoにnullが入るケースを除外してあげる
        setCompletedTodos((prevTodos) => [...prevTodos, {...completedTodo,}]);
    }
    

    const onRevive = async(id:number) => {
        await revive(id);
        //alert("死者蘇生 ☨");
        setCompletedTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
        const revivedTodo = completedTodos.find(todo => todo.id === id);
        if (revivedTodo == null){
            return
        }//同上
        setActiveTodos((prevTodos) => [...prevTodos, {...revivedTodo,}]);
    }

    const onClear = async() => {
        const isConfirmed = window.confirm("本当に墓地を削除しますか？")

        if (isConfirmed) {
            await allRemove();
            alert ("墓地を綺麗にしました")
            setCompletedTodos((prevTodos) => [])
        } else {
        alert("キャンセルしました！")
    } }

    const currentTodos = 
            activeTodos.map((todo) => (
            <div key={todo.id} className="container">
                <p 
                className={`currentTodos ${bouncedId === todo.id ? 'bounce' : ''} ${clickedId === todo.id ? 'clicked' : ''}`}
                onClick={() => handleTodoClick(todo.id)}
                >{todo.date}：{todo.title}</p>
                <button type="button" className="doneButton" onClick={()=>{onComplete(todo.id)}}>✔</button>
                <button type="button" className="editButton" onClick={()=>{onUpdate(todo.id)}}>✍️</button>
            </div>))

    const doneTodos = 
            completedTodos.map((todo) => (
                <div key={todo.id} className="container">
                    <p className="completedTodos" >{todo.date}：{todo.title}</p>
                    <button type="button" className="doneButton" onClick={()=>{onRevive(todo.id)}}>✝</button>
                </div>))

    return (
        <div>
            <form onSubmit={onSubmit}>
                {/* <input type="hidden" {...register('id')} /> */}
                <input {...register('title', { required: 'Type Todo!' })} />
                <button type="submit">
                    {button}
                </button>
                {errors.title && <p>{errors.title.message}</p>}
            </form>
                {currentTodos}
                <div className="container">
                    <h3 className="subtitle">Completed Todos!</h3>
                    <button className="clearButton" onClick={()=> {onClear()}}>墓地を綺麗に</button></div>
                {doneTodos}
        </div>
    );
}

export default List;