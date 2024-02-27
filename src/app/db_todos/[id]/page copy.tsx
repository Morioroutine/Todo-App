import React from 'react';
import { getOne } from "@/actions/todo"
import Form from "@/app/db_todos/[id]/form";


export default async function Page({
    
    params: { id },
  }: {
    params: { id: string };
  }) {

    const todo = await getOne( id );
    return <Form todo={todo} />; //ページでデータを取ってクライアントコンポーネントのデータ(form)に渡している
    
  }

  