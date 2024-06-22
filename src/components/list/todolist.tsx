import React, { useState } from 'react';
import { TodoItem } from '../item/todoitem';

interface TodoListProps {
    date: Date;
    todos: ToDo[];
    addTodo: (todo: ToDo) => void;
    removeTodo: (index: number) => void;
}

export interface ToDo {
    title: string
}

export const TodoList: React.FC<TodoListProps> = ({ date, todos, addTodo, removeTodo }) => {
    const [newTodo, setNewTodo] = useState<ToDo>({ title:'' });

    const handleAddTodo = () => {
        addTodo(newTodo);
        setNewTodo({ title:'' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTodo(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleRemoveTodo = (index: number) => {
        removeTodo(index);
    };

    return (
        <div>
            <h3>To do for {date.toDateString()}</h3>
            <input 
                type='text'
                name='title'
                value={newTodo.title}
                onChange={handleChange}
                placeholder='title'
                />
            <button
                onClick={handleAddTodo}
                >
                    Add
            </button>
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