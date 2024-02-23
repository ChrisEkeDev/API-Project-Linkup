import React from 'react'
import { format, parseISO } from 'date-fns';
import { TbBallBasketball, TbClock } from 'react-icons/tb';
import { useApp } from '../../../context/AppContext'

function CheckInCalendarItem({checkIn, setSelectedCheckIn}) {
    const { theme } = useApp();
    const parsedDate = parseISO(checkIn.session.startDate);
    const formattedTime = format(parsedDate, 'h:mm a');

    return (
        <div className={`checkin_calendar_item checkin_calendar_item-${theme}`}>
            <TbBallBasketball onClick={() => setSelectedCheckIn(checkIn)} className='calendar_item_node'/>
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
