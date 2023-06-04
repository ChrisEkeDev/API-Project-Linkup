import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSingleEvent, thunkDeleteEvent } from '../../store/events';
import { useLoading } from '../../context/LoadingProvider';
import { useAlerts } from '../../context/AlertsProvider';
import Modal from '../Modal';
import { FaRegClock, FaMapPin, FaDollarSign, FaAngleLeft } from 'react-icons/fa';
import './Event.css';

function Event() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const user = useSelector(state => state.session.user)
  const event = useSelector(state => state.events.allEvents[eventId]);
  const eventDetails = useSelector(state => state.events.singleEvent);

  let formattedStartDate;
  let formattedEndDate;
  let formattedStartTime;
  let formattedEndTime;

  if (event) {
    const startDate = new Date(event?.startDate);
    const endDate = new Date(event?.endDate);
    const dateOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    }
    formattedStartDate = new Intl.DateTimeFormat('en-US', dateOptions).format(startDate);
    formattedEndDate = new Intl.DateTimeFormat('en-US', dateOptions).format(endDate);
    const timeOptions = {
        hour: "numeric",
        minute: "numeric",
    }
    formattedStartTime = new Intl.DateTimeFormat('en-US', timeOptions).format(startDate);
    formattedEndTime = new Intl.DateTimeFormat('en-US', timeOptions).format(endDate);
  }

  const navigate = (route) => {
    history.push(route)
  }

  useEffect(() => {
    dispatch(thunkGetSingleEvent(eventId))
  }, [dispatch])

  return (
    <main className='event-wrapper'>
        <header className='event_header-wrapper'>
          <div className='event_header-contents'>
            <Link className='group-back' to='/search/events'>
              <FaAngleLeft className='back-icon'/>
              Events
            </Link>
            <h1 className='heading'>{event?.name}</h1>
            <p className='body small'>Hosted by <span className='caps'>{eventDetails?.Group?.Organizer?.firstName} {eventDetails?.Group?.Organizer?.lastName}</span></p>
          </div>
        </header>
        <section className='event_section-wrapper' >
          <div className='event_section-contents' >
            <div className='event_section-information' >
              <div className='event_section-image'></div>
              <aside className='event_section-aside'>
                  <div onClick={() => navigate('/groups/1')} className='event_section-group'>
                    <div className='event_section-group_image'></div>
                    <div className='event_section-group_info'>
                      <p className='body bold'>{eventDetails?.Group?.name}</p>
                      <p className='body small'>{eventDetails?.Group?.private ? 'Private' : 'Public'}</p>
                    </div>
                  </div>
                  <div className='event_section-details'>
                    <div className='event_section-details_item'>
                      <FaRegClock className='icon'/>
                      <p className='small'>
                        START - {event && formattedStartDate} @ {event && formattedStartTime}<br/>
                        END - {event && formattedEndDate} @ {event && formattedEndTime}
                      </p>
                    </div>
                    <div className='event_section-details_item'>
                      <FaDollarSign className='icon'/>
                      <p className='small'>{event?.price > 0 ? event?.price.toFixed(2) : 'FREE'}</p>
                    </div>
                    <div className='event_section-details_item'>
                      <FaMapPin className='icon'/>
                      <p className='small'>{event?.type}</p>
                    </div>
                  </div>
              </aside>
            </div>
            <h2 className='subheading'>Details</h2>
            <p className='body'>{event?.description}</p>
          </div>
        </section>
    </main>
  )
}

export default Event
