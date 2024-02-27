"use client";

import { NextPage } from "next";
import { useForm } from 'react-hook-form'
import { create } from "@/actions/todo"

const Add: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
  })

  const onSubmit = handleSubmit((data: any) => {
    create(data);
    reset();
    alert("登録しました");
  })

  return (
    <form onSubmit={onSubmit}>
        <input {...register('title')} />
        <button type="submit">
            登録
        </button>
    </form>
  )
};

export default Add;