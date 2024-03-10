
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";

export default async function Result() {
  const {userId} = auth();

  if(!userId) {
    return <p>Now Loading...</p>;
   }

  const todos = await db.todo.findMany({
    where: {
      userId: userId,
    }
  });

  return (
    <>
      {todos.map((todo, index) => (
        <div key={todo.id}>
          <p>{todo.date}: {todo.id} :{todo.title}: {todo.userId}</p>
        </div>
      ))}
    </>
  );
      };