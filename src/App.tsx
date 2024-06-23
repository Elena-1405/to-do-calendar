import React, { useState } from 'react';
import { Calendar, CalendarProps } from '../src/components/calendar/calendar';
import { TodoList, ToDo} from '../src/components/list/todolist';
import { Modal } from '../src/components/modal/modal';

const users = ['user1', 'user2'];

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ todos, setTodos ] = useState<{ [key: string]: {[date: string]: ToDo[] }}>({
    user1: {},
    user2: {},
  });
  const [currentUser, setCurrentUser] = useState<string>('user1');
  const [ isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const addTodo = (date: Date, todo: ToDo) => {
    const dateString = date.toISOString().split('T')[0];
    setTodos((prevTodos) => ({
      ...prevTodos, [currentUser]: {
        ...prevTodos[currentUser],
        [dateString]: [...(prevTodos[currentUser][dateString] || []), todo],
      }  
    }));
  };

  const removeTodo = (date: Date, index: number) => {
    const dateString= date.toISOString().split('T')[0];
    setTodos((prevTodos) => {
      const userTodos = {...prevTodos[currentUser]};
      if (userTodos[dateString]) {
        userTodos[dateString] = userTodos[dateString].filter((_, i) => i !== index);
      }
      return { ...prevTodos, [currentUser]: userTodos };
    });
  };

  const toggleModal = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(!isModalOpen);
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUser(e.target.value);
  };

  return (
    <>
    <h1>Календарь и список задач</h1>
    <select value={currentUser} onChange={handleUserChange}>
      {users.map((user) => (
        <option key={user} value={user}>
          {user}
        </option>
      ))}
    </select>
      <Calendar selectedDate={selectedDate} onDateClick={toggleModal} todos={todos[currentUser]}/>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
        <TodoList 
          date={selectedDate} 
          todos={todos[currentUser][selectedDate.toISOString().split('T')[0]] || []} 
          addTodo={(todo) => addTodo(selectedDate, todo)} 
          removeTodo={(index) => removeTodo(selectedDate, index)}/>
      </Modal>
      )}  
    </>
  );
}

export default App;
