import db from "@/lib/db";

const List = async () => {
    const todos = await db.todo.findMany();
  
    return (
      <>
        {todos.map((todo, index) => (
          <div key={todo.id}>
            <p>{todo.id}:{todo.title}</p>
          </div>
        ))}
      </>
    );
  } 

  export default List;

  