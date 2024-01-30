'use server'

import db from '@/lib/db'

export const create = async (data: { title: string; }) => {
  await db.todo.create({ data })
}