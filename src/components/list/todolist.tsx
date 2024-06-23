import React, { useState } from 'react';
import { TodoItem } from '../item/todoitem';
import { SubmitHandler, useForm } from 'react-hook-form';

interface TodoListProps {
    date: Date;
    todos: ToDo[];
    addTodo: (todo: ToDo) => void;
    removeTodo: (index: number) => void;
}

export interface ToDo {
    title: string
}

interface FormData {
    title: string
}

export const TodoList: React.FC<TodoListProps> = ({ date, todos, addTodo, removeTodo }) => {
    //const [newTodo, setNewTodo] = useState<ToDo>({ title:'' });
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = data => {
        addTodo({
            title: data.title,
        });
        reset();
    };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setNewTodo(prevState => ({
    //         ...prevState, [name]: value
    //     }));
    // };

    const handleRemoveTodo = (index: number) => {
        removeTodo(index);
    };

    return (
        <div>
            <h3>To do for {date.toDateString()}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
            <input 
                type='text'
                {...register('title', { required: 'Заполните поле'})}
                placeholder='title'
                />
                {errors.title && <div style={{color: 'red'}}>{errors.title.message}</div>}
                </div>
            <button
                type='submit'
                >
                    Add
            </button>
            </form>
             <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <TodoItem
                          key={index}
                          item={`${todo.title}` }
                          onRemove={(() => handleRemoveTodo(index))}
                        />
                    </li>
                ))}
            </ul> 
        </div>
    )
}