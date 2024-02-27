"use client"

import React, { useEffect, useState } from 'react';
import { getAll } from "@/actions/todo"
import List from './List'
import Add from './Add';

export default function Page () {
    const [todoss, setTodoss] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const todosData = await getAll();
            setTodoss(todosData);
        };
        fetchData();
    }, []);

    return (
    <div>
        <h1>Manage Your Todos 🚀</h1>
        <Add />
        <List todoss={todoss} />
    </div>
    );
}

// import React from 'react';
// import { getAll, getOne } from "@/actions/todo"
// import List from './List'


// export default function Page () {
//     const todoss = getAll()

//     return (
//     <div>
//         <h1>Hello World</h1>
//         <List todoss={todoss} />
//     </div>
//         )
// }
