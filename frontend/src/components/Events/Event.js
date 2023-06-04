import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSingleEvent, thunkDeleteEvent } from '../../store/events';
import Button from '../Buttons/Button';
import { useLoading } from '../../context/LoadingProvider';
import { useAlerts } from '../../context/AlertsProvider';
import Modal from '../Modal';
import { FaRegClock, FaMapPin, FaDollarSign, FaAngleLeft } from 'react-icons/fa';
import './Event.css';



function Event() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleAlerts } = useAlerts();
  const { setLoading } = useLoading();
  const { eventId } = useParams();
  const user = useSelector(state => state.session.user)
  const event = useSelector(state => state.events.allEvents[eventId]);
  const [ deleting, setDeleting ] = useState(false)

  console.log(event)

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

  const deleteEvent = (e) => {
    e.preventDefault();
    setLoading(true)
    return (
        dispatch(thunkDeleteEvent(event))
        .then((alert) => {
            handleAlerts(alert);
            navigate('/search/events');
            setLoading(false);
        })
        .catch(async(errors) => {
            console.log(errors)
            setLoading(false)
        })
    )
}

  useEffect(() => {
    dispatch(thunkGetSingleEvent(eventId))
  }, [dispatch])

  return (
    <main className='event-wrapper'>
      {
            deleting ?
            <Modal>
                <form className='modal-contents'>
                    <h2 className='subheading'>Confirm Delete</h2>
                    <p className='body'>Are you sure you want to remove this event?</p>
                    <Button
                        style='spaced'
                        type='primary'
                        label='Yes (Delete Event)'
                        action={(e) => deleteEvent(e)}
                    />
                    <Button
                        style='spaced'
                        type='tertiary'
                        label='No (Keep Event)'
                        action={() => setDeleting(false)}
                    />
                </form>
            </Modal> :
            null
        }
        <header className='event_header-wrapper'>
          <div className='event_header-contents'>
            <Link className='group-back' to='/search/events'>
              <FaAngleLeft className='back-icon'/>
              Events
            </Link>
            <h1 className='heading'>{event?.name}</h1>
            <p className='body small'>Hosted by <span className='caps'>{event?.Group?.Organizer?.firstName} {event?.Group?.Organizer?.lastName}</span></p>
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
                      <p className='body bold'>{event?.Group?.name}</p>
                      <p className='body small'>{event?.Group?.private ? 'Private' : 'Public'}</p>
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
                    {user?.id === event?.Group?.Organizer?.id ?
                    <div className='event-actions absolute'>
                    <Button
                      style='small-btn'
                      type='secondary'
                      label='Update'
                      action={() => navigate(`/update-event/${event?.id}`)}
                    />
                    <Button
                      style='small-btn'
                      type='secondary'
                      label='Delete'
                      action={() => setDeleting(true)}
                    />
                    </div> :
                    null }

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
