
import { getOne, remove, update, create, complete, allRemove, revive } from "@/actions/todo";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import '../globals.css'

type Todo = {
    id: number;
    userId: string;
    title: string;
}


const List = ({
    userId, 
    activeTodos,
    completedTodos,
    }: {
    userId: string;
        activeTodos: Array<Todo>;
    completedTodos: Array<Todo>;
    }) => {
    
    const [button, setButton] = useState("Create");
    
    const onDelete = (id:number) => {
        remove(id);
        alert("Good Job 🚀");
      }
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
    })

    const onSubmit = handleSubmit((data: any) => {
        if (data.id == null){
            create(data);
            reset();
            alert("登録しました");
        } else {
            update(data);
            alert("更新しました")
            reset({title:""});
        }
    })
    
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
        alert("Good job 🚀")
    }
    

    const onRevive = async(id:number) => {
        revive(id);
        alert("死者蘇生 ☨")
    }

    const onClear = async() => {
        const isConfirmed = window.confirm("本当に墓地を削除しますか？")

        if (isConfirmed) {
            await allRemove(userId);
            alert ("墓地を綺麗にしました")
        } else {
        alert("キャンセルしました！")
    } }

    const currentTodos = 
            activeTodos.map((todo) => (
            <div key={todo.id} className="container">
                <p className="currentTodos" >{todo.date}：{todo.title}</p>
                <button type="button" className="doneButton" onClick={()=>{onComplete(todo.id)}}>✔︎</button>
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
                    <h3>倒したTodoたち</h3>
                    <button className="clearButton" onClick={()=> {onClear()}}>墓地を綺麗に</button></div>
                {doneTodos}
        </div>
    );
}

export default List;