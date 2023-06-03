import React, { useEffect } from 'react';
import { thunkGetAllEvents } from '../../store/events';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FaCalendarAlt } from 'react-icons/fa';

function DashboardEventItem({id}) {
    const event = useSelector(state => state.events.allEvents[id]);
    const dispatch = useDispatch();
    const history = useHistory();

    const navigate = (route) => {
        history.push(route)
    }

    let formattedDate;
    let formattedTime;
    if (event) {
        const date = new Date(event?.startDate)
        const dateOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }
        formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
        const timeOptions = {
            hour: "numeric",
            minute: "numeric",
        }
        formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date)
    }



    useEffect(() => {
        dispatch(thunkGetAllEvents());
    }, [dispatch])

  return (
        <div onClick={() => navigate(`/events/${id}`)} className='dash_group_item-wrapper'>
            <div className='dash_group_item-image'></div>
            <div className='dash_group_item-information'>
            <h2 className='subheading'>{event?.name} - <span className='body small'>{event?.type}</span></h2>
            <div className='dash_group_item-info_section'>
                <FaCalendarAlt className='dash_group-icon'/>
                <p className='small'>{event && formattedDate} <span> @ </span> {event && formattedTime} </p>
            </div>
            {/* <div className='dash_group_item-info_section'>
                <FaUserFriends className='dash_group-icon'/>
                <p className='small'> members</p>
            </div>
            <div className='dash_group_item-info_section'>
                <FaUserFriends className='dash_group-icon'/>
                <p className='small'> members</p>
            </div> */}
            </div>
        </div>
  )
}

export default DashboardEventItem
