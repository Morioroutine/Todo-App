'use server'

import db from '@/lib/db'

export const create = async (data: { title: string; }) => {
  await db.todo.create({ data })
}

export const update = async (data: { id: string; title: string }) => {
  await db.todo.update({
    where: {
      id: Number(data.id),
    },
    data: {
      title: data.title,
    },
  });
};

export const deleteUser = async (id: string) => {
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
};//dbから1個だけレコードを引っ張ってくる