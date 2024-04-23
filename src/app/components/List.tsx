
import { getOne, update, create, complete, allRemove, revive, isLogined } from "@/actions/todo";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import '../globals.css'
import { Today } from "./Date";
import  { Todo } from "../Type/todo" 
import { useTodoActions } from "./useTodoActions";

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
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Todo>({
        defaultValues: {
        title: "",
        }
    });

    const handleTodoClick = (id: number) => {
        setBouncedId(id);
        setClickedId(prevId => prevId === id ? null : id); 
        setTimeout(() => setBouncedId(null), 100); 
      };

    const { onComplete, onRevive, onClear } = useTodoActions(activeTodos, setActiveTodos, completedTodos, setCompletedTodos);

    const saveTodo = async (data: any) => {
      const loggedIn = await isLogined();

      if (!loggedIn) { // 非ログイン：ローカル状態のみ更新
        if (data.id == null) {
          const date = Today();
          const tempId = Date.now();
  
          const newTodo = { ...data, date, id: tempId };
          setActiveTodos(prevTodos => [...prevTodos, newTodo]);
        } else {
          setActiveTodos(prevTodos => prevTodos.map(todo =>
              todo.id === data.id ? { ...todo, ...data } : todo //dataでtodoを上書き。実質追加だが、同じプロパティは上書きされる
            )
          );
        }
      } else { // ログイン：DBでデータを作成または更新
        try {
          if (data.id == null) {
            const newTodo = await create(data);
            setActiveTodos(prevTodos => [...prevTodos, newTodo]);
          } else {
            const updatedTodo = await update(data);
            setActiveTodos(prevTodos => prevTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
          }
        } catch (error) {
          alert("操作に失敗しました");
        }
      }
      reset({ title: ""});
      setButton("Create");
    }

    const onSubmit = handleSubmit(async (data: any) => {
      await saveTodo(data);
    });


    const onUpdate = async (id: number) => {
        let todo;
        const loggedIn = await isLogined();
    
        if (loggedIn) {
            todo = await getOne(id);
        } else {
            todo = activeTodos.find(todo => todo.id === id);
        }
        if (todo) {
            reset(todo);
            setButton("Update");
        } else {
            alert('更新するTodoが見つかりません。');
        }
    };

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
                <input {...register('title', { required: 'Type Todo!' })} />
                <button type="submit">
                    {button}
                </button>
                {errors.title && <p>{errors.title.message}</p>}
            </form>
                {currentTodos}
                <div className="container">
                    <h3 className="subtitle">Completed Todos!</h3>
                    <button className="clearButton" onClick={()=> {onClear()}}>Clear All</button></div>
                {doneTodos}
        </div>
    );
}

export default List;