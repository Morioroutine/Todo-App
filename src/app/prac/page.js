"use client"

import React, {useState} from 'react';
import {useForm} from "react-hook-form";


function App () {

const {register, handleSubmit} = useForm();
const onSubmit = (data) => console.log(data) 
const [opentext, setOpentext] = useState(false);

const buttonAlert = () => {
 alert('clicked')
}

const text = `
何でこんなことになったのか
君にわかるだろうか？
大したことないと言いつつ
頑張ろうや
`

return(
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" {...register("email")} />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input id="password" {...register("password")} type="password"/>
        </div>
        <button type="submit">Login</button>
        </form>
        <h3>{text}</h3>
        <button onClick={buttonAlert}>Alert</button>

    </div>
)

}

export default App;

