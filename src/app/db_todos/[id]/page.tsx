

import React from 'react';
import { getOne } from "@/actions/todo";
import Form from "@/app/db_todos/[id]/form";
import { create } from "@/actions/todo"
import { useForm } from 'react-hook-form';
import List from './list';
import Add from './add';
import Delete from "./delete";


const App = () => {
  return (
    <div>
      <Add />
      <List />
      <Delete />
    </div>
  );
};

export default App;
