

import React from 'react';
import { getOne } from "@/actions/todo";
import Form from "@/app/db_todos/[id]/form";
import { create } from "@/actions/todo"
import { useForm } from 'react-hook-form';
import List from './list';
import Add from './add';


const App = () => {
  return (
    <div>
      <Add />
      <List />
    </div>
  );
};

export default App;
