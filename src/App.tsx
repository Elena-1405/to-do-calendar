import React, { useState } from 'react';
import { Calendar } from '../src/components/calendar/calendar';


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  }
  return (
    <Calendar selectedDate={selectedDate} onDateClick={handleDateClick} />
  );
}

export default App;
