import { complete, allRemove, revive, isLogined } from "@/actions/todo";
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
        const loggedIn = await isLogined();
        const stateRevive = () => {
            setCompletedTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id)); //prevTodosから特定のidを除外
                const revivedTodo = completedTodos.find(todo => todo.id === id); //特定のidをrevivedTodoとする
                    if (revivedTodo == null){
                        return
                    }
            setActiveTodos((prevTodos) => [...prevTodos, {...revivedTodo,}]);
        }

        if (loggedIn){ //ログイン時はdbアクセス
        await revive(id);
        stateRevive();
        
        } else {
        stateRevive();
        }}

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