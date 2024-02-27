import { useForm } from 'react-hook-form'
import { create } from "@/actions/todo";

const Add = () => {
    const {register, handleSubmit, formState: { errors }, reset,} = useForm({
    })
  
    const onSubmit = handleSubmit((data: any) => { 
      create(data);
      reset();
      alert("登録しました");
    })
  
    return (
      <form onSubmit={onSubmit}>
          <input {...register('title', { required: 'Type Todo!' })} />
          <button type="submit">
              Create
          </button>
          {errors.title && <p>{errors.title.message}</p>}
      </form>
    )
  };
  
  export default Add;
