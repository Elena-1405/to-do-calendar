import React, { useState } from 'react';
import { Calendar, CalendarProps } from '../src/components/calendar/calendar';
import { TodoList, ToDo} from '../src/components/list/todolist';
import { Modal } from '../src/components/modal/modal'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ todos, setTodos ] = useState<{ [key: string]: ToDo[] }>({});
  const [ isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const addTodo = (date: Date, todo: ToDo) => {
    const dateKey = date.toISOString().split('T')[0];
    setTodos((prevTodos) => ({
      ...prevTodos,
      [dateKey]: [...(prevTodos[dateKey] || []), todo],
    }));
  };

  const removeTodo = (date: Date, index: number) => {
    const dateKey = date.toISOString().split('T')[0];
    setTodos((prevTodos) => {
      const updatedTodos = (prevTodos[dateKey] || []).filter((_, i) => i !== index);
      return { ...prevTodos, [dateKey]: updatedTodos };
    });
  };

  const toggleModal = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(!isModalOpen);
  }
  return (
    <>
      <Calendar selectedDate={selectedDate} onDateClick={toggleModal} />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
        <TodoList 
          date={selectedDate} 
          todos={todos[selectedDate.toISOString().split('T')[0]] || []} 
          addTodo={(todo) => addTodo(selectedDate, todo)} 
          removeTodo={(index) => removeTodo(selectedDate, index)}/>
      </Modal>
      )}  
    </>
  );
}

export default App;
