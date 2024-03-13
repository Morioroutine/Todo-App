'use server'

import { Today } from '@/app/components/Date';
import db from '@/lib/db'
import { auth, currentUser } from "@clerk/nextjs";


export const create = async (data: {id: number; title: string; date: string}) => {
  const result = auth();
  let userId = result.userId ?? "ゲスト"

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

export const complete = async (id: number) => {
  await db.todo.update({
    where: {
      id: Number(id),
    },
    data: {
      completed: true,
    },
  });
};

export const revive = async (id: number) => {
  await db.todo.update({
    where: {
      id: Number(id),
    },
    data: {
      completed: false,
    },
  });
};

//個別のremoveは使っていない
export const remove = async (id: number) => {
  await db.todo.delete({
    where: {
      id: Number(id),
    },
  });
};

export const allRemove = async (userId: string) => {
    await db.todo.deleteMany({
      where: {
        userId: userId,
        completed: true,
      },
    });
  };

export const getOne = async (id) => {
  const todo = await db.todo.findUnique({
    where: {
      id: Number(id),
    },
  });

  return todo;
};

export const getAll = async () => {
  const allTodos = await db.todo.findMany();

  return allTodos;
};

export const getActiveTodos = async () => {
  const result = auth();
  let userId;

  if (result.userId == null) {
    userId = "ゲスト"
  } else {
    userId = result.userId;
  }

  const currentActiveTodos = await db.todo.findMany({
    where: {
      userId: userId,
      completed: false,
    },
  });
  return currentActiveTodos
}

  export const getCompletedTodos = async () => {
    const result = auth();
    let userId;
  
    if (result.userId == null) {
      userId = "ゲスト"
    } else {
      userId = result.userId;
    }
  
    const currentCompletedTodos = await db.todo.findMany({
      where: {
        userId: userId,
        completed: true,
      },  
    });

  return currentCompletedTodos
};