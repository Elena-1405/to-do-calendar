import React, { useState } from 'react';
import { Calendar, CalendarProps } from '../src/components/calendar/calendar';
import { TodoList, ToDo} from '../src/components/list/todolist';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ todos, setTodos ] = useState<ToDo[]>([]);

  const addTodo = (newTodo: ToDo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  }
  return (
    <>
      <Calendar selectedDate={selectedDate} onDateClick={handleDateClick} />
      <TodoList date={selectedDate} todos={todos} addTodo={addTodo} removeTodo={removeTodo}/>
    </>
  );
}

export default App;
