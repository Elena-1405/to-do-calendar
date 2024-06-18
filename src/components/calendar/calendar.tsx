import React from 'react';
import styles from './calendar.module.css';

export interface CalendarProps {
    selectedDate: Date;
    onDateClick: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({selectedDate, onDateClick}) => {
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

return (
    <div className={styles.calendar}>
        <h2>{formatMonth(selectedDate)}</h2>
        {days.map((day) => (
            <div
                className={styles.day}
                key={day.toString()}
                onClick={() => onDateClick(day)}>
                    {formatDay(day)}
            </div>
        ))}
    </div>
)
}
