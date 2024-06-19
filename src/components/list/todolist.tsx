import React, { useState } from 'react';
import { TodoItem } from '../item/todoitem';

interface TodoListProps {
    date: Date;
    todos: [];
    addTodo: (todo: ToDo) => void;
    removeTodo: (index: number) => void;
}

interface ToDo {
    title: string;
    description: string;
}

export const TodoList: React.FC<TodoListProps> = ({date, todos, addTodo, removeTodo}) => {
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
            <input 
                type='text'
                name='description'
                value={newTodo.description}
                onChange={handleChange}
                placeholder='description'
                />
            <button
                onClick={handleAddTodo}
                >
                    Add
            </button>
             <ul>
                {todos.map((todo: string, index: number) => (
                    <li key={index}>
                        <TodoItem
                          key={index}
                         item={todo}
                         onRemove={(() => handleRemoveTodo(index))}
                        />
                    </li>
                ))}
            </ul> 
        </div>
    )
}