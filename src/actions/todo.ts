'use server'

import { Today } from '@/app/components/Date';
import db from '@/lib/db'
import { auth, currentUser } from "@clerk/nextjs";

export const create = async (data: {id: number; title: string; date: string}) => {
  const { userId } = auth();
  const date = Today();
  console.log("データチェック")
  console.log(data)
  console.log(data.title)
  console.log(userId)
  console.log(date)
  await db.todo.create({ data: {...data, userId: userId, date: date }});
}

export const update = async (data: { id: number; title: string }) => {
  await db.todo.update({
    where: {
      id: Number(data.id),
    },
    data: {
      title: data.title,
    },
  });
};

export const remove = async (id: number) => {
  await db.todo.delete({
    where: {
      id: Number(id),
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
  const todos = await db.todo.findMany();

  return todos;
};