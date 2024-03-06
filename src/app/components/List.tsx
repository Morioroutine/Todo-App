
import { getOne, remove, update, create } from "@/actions/todo";
import { useState } from "react";
import { useForm } from 'react-hook-form'

const List = ({ todoss } : { todoss: Array<{ id: number; userid: string; title: string }> }) => {
    
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
    
    const ListStyle = 
            todoss.map((todo) => (
            <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-left', marginBottom: '10px'}}>
                <p>#{todo.id} :User{todo.userid}:{todo.title}</p>
                <button type="button" style={{marginLeft:'20px'}}onClick={()=>{onDelete(todo.id)}}>Done🚀</button>
                <button type="button" style={{marginLeft:'20px'}}onClick={()=>{onUpdate(todo.id)}}>Edit</button>
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
                {ListStyle}
        </div>
    );
}

export default List;