import React from 'react'
import { format, parseISO } from 'date-fns';
import { TbClock } from 'react-icons/tb';

function CheckInCalendarItem({checkIn, setSelectedCheckIn}) {
    const parsedDate = parseISO(checkIn.session.startDate);
    const formattedTime = format(parsedDate, 'h:mm a');

    return (
        <div className='checkin_calendar_item'>
            <div onClick={() => setSelectedCheckIn(checkIn)} className='calendar_item_node'/>
            <div className='calendar_item_menu'>
                <p className='xs'>{checkIn.session.name}</p>
                <div className='float_left'>
                    <TbClock/>
                    <p className='sm bold'>{formattedTime}</p>
                </div>
            </div>
        </div>
    )
}

export default CheckInCalendarItem
