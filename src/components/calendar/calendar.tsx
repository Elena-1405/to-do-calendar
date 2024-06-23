import React from 'react';
import { ToDo } from '../list/todolist';
import styles from './calendar.module.css';


export interface CalendarProps {
    selectedDate: Date;
    todos: { [key: string]: ToDo[] };
    onDateClick: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({selectedDate, todos, onDateClick}) => {
    const startOfMonth = (date: Date): Date => {
        return new Date(date.getFullYear(), date.getMonth(), 1)
    }

    const endOfMonth = (date: Date): Date => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0)
    }

    const eachDayOfInterval = (start: Date, end: Date): Date[]=> {
        const days: Date[] = [];
        const currentDate = new Date(start);

    while (currentDate <= end) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
        return days;
};

const formatDay = (date: Date): string => {
    return date.getDate().toString();
};

const formatMonth = (date: Date): string => {
    return date.toLocaleString('default', {month: 'long'});
};


const start = startOfMonth(selectedDate);
const end = endOfMonth(selectedDate);
const days = eachDayOfInterval(start, end);

const dayElement = days.map((day) => {
    const dayString = day.toISOString().split('T')[0];
    const hasTodos = todos[dayString] && todos[dayString].length > 0;
    const dayClassName = hasTodos ? `${styles.day} ${styles.hasTodos}` : styles.day;

    return (
        <div
                className={dayClassName}
                key={day.toString()}
                onClick={() => onDateClick(day)}>
                    {formatDay(day)}
            </div>
    );
});

return (
    <div className={styles.calendar}>
        <h2>{formatMonth(selectedDate)}</h2>
        {dayElement}
    </div>
);
};
