'use server'

import { Today } from '@/app/components/Date';
import db from '@/lib/db'
import { auth } from "@clerk/nextjs";

const getUserId = async () => {
  const result = await auth();
  return  result.userId ?? "ゲスト"
}

export const isLogined = async () => {
  const userId = await getUserId();
  return userId != "ゲスト";
}

export const create = async (data: {id: number; title: string; date: string}) => {
  const userId = await getUserId();
  const date = Today();
  
  const newTodo = await db.todo.create({ data: {...data, userId, date }});
  return newTodo;
}

export const update = async (data: { id: number; title: string }) => {
  const updatedTodo = await db.todo.update({
    where: {
      id: Number(data.id),
    },
    data: {
      title: data.title,
    },
  });
  return updatedTodo;
};


const updateCompletionStatus = async (id: number, completed: boolean) => {
  await db.todo.update({
    where: { id: Number(id) },
    data: { completed },
  });
};

  export const complete = (id: number) =>
    updateCompletionStatus(id, true);

  export const revive = (id: number) =>
    updateCompletionStatus(id, false);


export const allRemove = async () => {
  const userId = await getUserId();

    await db.todo.deleteMany({
      where: {
        userId: userId,
        completed: true,
      },
    });
  };

export const getOne = async (id: number) => {
  const todo = await db.todo.findUnique({
    where: {
      id: Number(id),
    },
  });
  return todo;
};

export const getActiveTodos = async () => {
  const userId = await getUserId();

  const currentActiveTodos = await db.todo.findMany({
    where: {
      userId: userId,
      completed: false,
    },
  });
  return currentActiveTodos
}

  export const getCompletedTodos = async () => {
    const userId = await getUserId();
  
    const currentCompletedTodos = await db.todo.findMany({
      where: {
        userId: userId,
        completed: true,
      },  
    });

  return currentCompletedTodos
};