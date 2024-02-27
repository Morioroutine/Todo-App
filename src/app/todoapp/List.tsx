import { remove } from "@/actions/todo";

const List = ({ todoss } : { todoss: Array<{ id: number; title: string }> }) => {
    
    const onDelete = (id:number) => {
        remove(id);
        alert("Good Job🚀");

        // if(window.confirm("本当に削除しますか？") ){
        //   remove(id);
        //   alert("削除しました");
        // }
      }

    return (
        <div>
            {todoss.map((todo) => (
                <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-left', marginBottom: '10px'}}>
                    <p>#{todo.id} :{todo.title}</p>
                    <button type="button" style={{marginLeft:'20px'}}onClick={()=>{onDelete(todo.id)}}>Done🚀</button>
                </div>
            ))}
        </div>
    );
}

export default List;