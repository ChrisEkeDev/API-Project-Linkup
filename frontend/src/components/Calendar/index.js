import React, { useEffect, useState } from 'react';
import { weekDayData, addMonths, sameDay, startOfMonth, startOfWeek, endOfWeek, endOfMonth, addDays } from '../../utils/dates';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './Calendar.css';


function Calendar({dateProp}) {
    const [ date, setDate ] = useState(dateProp || new Date())
    const [ month, setMonth ] = useState(startOfMonth(date.getFullYear(), date.getMonth()))
    let weekStartDate = startOfWeek(month);
    const monthStart = startOfMonth(month.getFullYear(), month.getMonth());
    const monthEnd = endOfMonth(month.getFullYear(), month.getMonth());
    const dayStartDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const weekRows = [];
    let day = dayStartDate;

    // Week Days
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        weekDays.push(
            <div className='calendar-week_day' key={i}>
                <span>{weekDayData[i].short}</span>
            </div>
        )
    }

    let days = [];
    let weekIdx = 0
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            let cloneDay = day;
            days.push(
                <div onClick={() => selectDay(cloneDay)}
                    className={`calendar_day ${sameDay(new Date(), day) ? 'today' : sameDay(date, day) ? 'selected' : ''}`} key={day}>
                    <span>{day.getDate()}</span>
                </div>
            )
            day = addDays(day, 1)
        }
        weekRows.push(
            <div key={weekIdx} className='calendar_week'>
                {days}
            </div>
        )
        days = []
        weekIdx++
    }

    const selectDay = (day) => {
        setDate(new Date(day))
    }

    const nextMonth = () => {
        const nextMonth = addMonths(month, 1)
        setMonth(new Date(nextMonth))
    }

    const prevMonth = () => {
        const prevMonth = addMonths(month, -1)
        setMonth(new Date(prevMonth))
    }



  return (
    <div className='calendar-wrapper'>
        <header className='calendar-header'>
            <FaAngleLeft onClick={() => prevMonth()} className='calendar-button'/>
            <p>{new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(month)}</p>
            <FaAngleRight onClick={() => nextMonth()} className='calendar-button'/>
        </header>
        <section className='calendar-week_days'>{weekDays}</section>
        <section className='calendar-days'>{weekRows}</section>
    </div>
  )
}

export default Calendar
