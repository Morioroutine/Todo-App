import { getOne, complete, allRemove, revive, isLogined } from "@/actions/todo";
import  { Todo } from "../Type/todo" //型

export const useTodoActions = (
    activeTodos: Todo[],
    setActiveTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos: Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    ) => {
    

    const onComplete = async (id: number) => {
        const loggedIn = await isLogined(); 
    
        if (loggedIn) {
            await complete(id);
        }
    
        setActiveTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
        
        const completedTodo = activeTodos.find(todo => todo.id === id);
        if (completedTodo != null) {
            setCompletedTodos((prevTodos) => [...prevTodos, {...completedTodo, completed: true }]);
        }
    };
    

    const onRevive = async(id:number) => {
        await revive(id);
        setCompletedTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
        const revivedTodo = completedTodos.find(todo => todo.id === id);
        if (revivedTodo == null){
            return
        }
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

  
    return { onComplete, onRevive, onClear };
  };