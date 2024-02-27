"use client";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { update } from "@/actions/todo";
import { remove } from "@/actions/todo";
// delete import 

const Page: NextPage = ({ todo }: { todo: {id:number; title:string} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: todo,
  });

  const onSubmit = handleSubmit((data: any) => {
    update(data);
    reset();
    alert("更新しました");
  });

  const onDelete = () => {
    if(window.confirm("本当に削除しますか？") ){
      remove(todo.id);
      alert("削除しました");
    }
  }


  return (
    <form onSubmit={onSubmit}>
      <input {...register("title")} />
      <button type="submit">更新</button>
      <button type="button" onClick={onDelete}>削除</button>
    </form>
  );
};

export default Page;