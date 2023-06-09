import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FaCalendarAlt } from 'react-icons/fa';

function DashboardEventItem({id}) {
    const event = useSelector(state => state.events.allEvents[id]);
    const history = useHistory();

    const navigate = (route) => {
        history.push(route)
    }

    const timeOptions = { hour: "numeric", minute: "numeric" }
    const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" }

  return (
        <div onClick={() => navigate(`/events/${id}`)} className='dash_group_item-wrapper'>
            <div className='dash_group_item-image bg-image'  style={{backgroundImage: `url(${event?.previewImage})` }}></div>
            <div className='dash_group_item-information'>
            <h2 className='subheading'>{event?.name} </h2>
            <div className='dash_group_item-info_section'>
                <FaCalendarAlt className='dash_group-icon'/>
                <p className='small'>
                    {new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(event?.startDate))} @
                    {new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(event?.startDate))}
                </p>
            </div>
            </div>
            <span className='status-node body small'>{event?.type}</span>
        </div>
  )
}

export default DashboardEventItem
