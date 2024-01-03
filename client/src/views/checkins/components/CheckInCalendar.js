import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths,addDays, startOfWeek,
    endOfWeek,startOfMonth,endOfMonth,isSameDay, isSameMonth,toDate,
    getMonth, getTime, parseISO
} from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../../../components/shared/button';
import CheckInCalendarItem from './CheckInCalendarItem';
import { TbChevronRight, TbChevronLeft, TbLogout } from 'react-icons/tb';
import IconButton from '../../../components/shared/button/IconButton';
import '../styles.scss';

function CheckInCalendar({checkIns}) {
    const [selectedCheckIn, setSelectedCheckIn] = useState(null)
    const [ day, setDay ] = useState(new Date())
    const [ month, setMonth ] = useState(startOfMonth(day))
    const monthDateFormat = "MMMM yyyy";
    const weekDayDateFormat = "EEE";
    const dayDateFormat = "d";
    let formattedDate = "";
    const weekDays = [];
    const weekRows = [];
    let days = [];
    let weekStartDate = startOfWeek(month);
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const dayStartDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    let date = dayStartDate;

    const checkInDate = (date, checkIn) => {
        return isSameDay(date, parseISO(checkIn.session.startDate))
    }

    for (let i = 0; i < 7; i++) {
        weekDays.push(
          <div className="weekday_container" key={i}>
            {format(addDays(weekStartDate, i), weekDayDateFormat)}
          </div>
        );
    }

    while (date <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(date, dayDateFormat);
            const cloneDay = date;
            days.push(
            <div
                className={`day_container ${
                isSameDay(date, new Date()) ?
                'current'
                :!isSameMonth(date, monthStart)
                ? "off_month"
                : isSameDay(date, day)
                ? "day_selected"
                : ""
                }`}
                key={date}
                onClick={
                    getTime(date) < getTime(startOfMonth(month))
                    ? () => onPrevMonthDateClick(toDate(cloneDay))
                    :  getMonth(date) === getMonth(startOfMonth(month))
                    ? () => onDateClick(toDate(cloneDay))
                    : () => onNextMonthDateClick(toDate(cloneDay))
                }
            >
                {checkIns.filter(checkIn => checkInDate(cloneDay, checkIn)).sort((a,b) => {
                    return new Date(a.session.startDate) - new Date(b.session.startDate)
                }).map(checkIn => (
                    <CheckInCalendarItem
                        key={checkIn.id}
                        checkIn={checkIn}
                        setSelectedCheckIn={setSelectedCheckIn}
                    />
                ))}
                <span className="number">
                    {formattedDate}
                </span>
            </div>
            );
            date = addDays(date, 1);
        }
        weekRows.push(
            <div className="row_grid" key={date}>
                {days}
            </div>
        );
        days = [];
    }

    const onDateClick = (day) => {
        setDay(day);

    };

    const onNextMonthDateClick = (day) => {
        setMonth(addMonths(month, 1))
        setDay(day);
    };

    const onPrevMonthDateClick = (day) => {
        setMonth(subMonths(month, 1))
        setDay(day);
    };
    const nextMonth = () => {
            setMonth(addMonths(month, 1))
    };

    const prevMonth = () => {
            setMonth(subMonths(month, 1))
    };

    return (
        <motion.div className='check_ins_calendar'>
            <div className="calendar_wrapper">
                <div className="month_header">
                    <IconButton
                        styles='header_icon'
                        icon={TbChevronLeft}
                        action={prevMonth}
                    />
                    <h1>
                        {format(month, monthDateFormat)}
                    </h1>
                    <IconButton
                        styles='header_icon'
                        icon={TbChevronRight}
                        action={nextMonth}
                    />
                </div>
                <div className='weekdays_container'>{weekDays}</div>
                <div className="days_container">{weekRows}</div>
            </div>
            <AnimatePresence>
                {
                    selectedCheckIn &&
                    <div className="check_in_list_item flex_spaced selected_check_in">
                        <div>
                            <p className='xs'>{selectedCheckIn.session.name}</p>
                            <p className='sm bold'>{selectedCheckIn.session.Court.address}</p>
                            <p className='md bold'>{selectedCheckIn.session.startDate}</p>
                        </div>
                        <Button
                            label="Check Out"
                            icon={TbLogout}
                            styles="primary"
                        />
                    </div>
                }
            </AnimatePresence>

        </motion.div>
    )
}

export default CheckInCalendar
