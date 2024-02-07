import db from "@/lib/db";

export default async function Home() {
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