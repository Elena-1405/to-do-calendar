import React, { useState } from 'react';

interface TodoListProps {
    date: Date;
    todo: string;
    addTodo: (todo: ToDo) => void;
    removeTodo: (index: number) => void;
}

interface ToDo {
    title: string;
    description: string;
}

export const TodoList: React.FC<TodoListProps> = ({date, todo, addTodo, removeTodo}) => {
    const [newTodo, setNewTodo] = useState<ToDo>({title:'', description: ''});

    const handleAddTodo = () => {
        addTodo(newTodo);
        setNewTodo({title:'', description: ''});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTodo(prevState => ({
            ...prevState, [name]: value
        }));
    };

    return (
        <div>
            <h3>todo for {date.toDateString()}</h3>
            <input 
                type='text'
                value={newTodo.title}/>
            <button>Add</button>
        </div>
    )
}