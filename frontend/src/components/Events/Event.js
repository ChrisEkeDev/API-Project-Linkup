import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSingleEvent, thunkDeleteEvent } from '../../store/events';
import { thunkGetEventAttendees, thunkGetEventAttendances, thunkDeleteAttendance, thunkAddAttendance } from '../../store/attendances';
import EventAttendeeItem from './EventAttendeeItem';
import Button from '../Buttons/Button';
import { useLoading } from '../../context/LoadingProvider';
import { useAlerts } from '../../context/AlertsProvider';
import DataLoading from '../Loading/DataLoading';
import Modal from '../Modal';
import { FaRegClock, FaMapPin, FaDollarSign, FaAngleLeft } from 'react-icons/fa';
import './Event.css';



function Event() {
  const [ deleting, setDeleting ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleAlerts } = useAlerts();
  const { setLoading } = useLoading();
  const { eventId } = useParams();
  // Store Data
  const user = useSelector(state => state.session.user)
  const event = useSelector(state => state.events.singleEvent);
  const attendees = useSelector(state => state.attendances.eventAttendees)
  const attendances = useSelector(state => state.attendances.eventAttendances)
  // Normalized Data
  const normalizedAttendees = Object.values(attendees);
  const normalizedAttendances = Object.values(attendances);
  // User Data
  const myAttendance = normalizedAttendances.find(attendance => user?.id === attendance?.userId)
  // Time Options
  const dateOptions = { year: "numeric", month: "numeric", day: "numeric" }
  const timeOptions = { hour: "numeric", minute: "numeric" }

  const isOrganizer = user?.id === event?.Group?.Organizer?.id || myAttendance?.status === 'co-host'
  const navigate = (route) => {
    history.push(route)
  }

  const order = {
        'organizer': 0,
        'co-host': 1,
        'attending': 2,
        'waitlist': 3
  }

  const sortMembers = (a, b) => {
      if (a === b) return 0
      return a < b ? -1 : 1
  }

  const deleteAttendanceStatus = () => {
    const attendeeData = {
        userId: parseInt(user.id),
    }
    return (
        dispatch(thunkDeleteAttendance(myAttendance, attendeeData))
        .then(() => handleAlerts({message: 'Attendance removed'}))
        .catch(async(errors) => {
            const alert = await errors.json();
            handleAlerts(alert)
        })
    )
}

const requestAttendance = () => {
  return (
      dispatch(thunkAddAttendance(event.id))
      .then(() => handleAlerts({message: 'Attendance requested'}))
      .catch(async(error) => {
          handleAlerts(error)
      })
  )
}

  const deleteEvent = (e) => {
    e.preventDefault();
    setLoading(true)
    return (
        dispatch(thunkDeleteEvent(event))
        .then((alert) => {
            handleAlerts(alert);
            navigate(`/groups/${event.groupId}`);
            setLoading(false);
        })
        .catch(async(errors) => {
            handleAlerts({message: 'There was an issue deleting your event'})
            setLoading(false)
        })
    )
}

  useEffect(() => {
    dispatch(thunkGetSingleEvent(eventId))
    .then(() => dispatch(thunkGetEventAttendees(eventId)))
    .then(() => dispatch(thunkGetEventAttendances(eventId)))
    .then(() => setIsLoading(false))
  }, [dispatch])


  if (isLoading) return <DataLoading></DataLoading>

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
              <div className='event_section-image bg-image' style={{backgroundImage: `url(${event?.EventImages[0]?.url})` }}></div>
              <aside className='event_section-aside'>
                  <div onClick={() => navigate('/groups/1')} className='event_section-group'>
                    <div className='event_section-group_image bg-image'  style={{backgroundImage: `url(${event?.Group?.GroupImages[0]?.url})` }}></div>
                    <div className='event_section-group_info'>
                      <p className='body bold'>{event?.Group?.name}</p>
                      <p className='body small'>{event?.Group?.private ? 'Private' : 'Public'}</p>
                    </div>
                  </div>
                  <div className='event_section-details'>
                    <div className='event_section-details_item'>
                      <FaRegClock className='icon'/>
                      <p className='small'>
                        START - {new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(event?.startDate))} <span> &#8729; </span>
                                {new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(event?.startDate))}<br/>
                        END - {new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(event?.endDate))} <span> &#8729; </span>
                              {new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(event?.endDate))}
                      </p>
                    </div>
                    <div className='event_section-details_item'>
                      <FaDollarSign className='icon'/>
                      <p className='small'>{event?.price > 0 ? `$${Number(event?.price).toFixed(2)}` : 'FREE'}</p>
                    </div>
                    <div className='event_section-details_item'>
                      <FaMapPin className='icon'/>
                      <p className='small'>{event?.type}</p>
                    </div>
                    <div>

                    <div className='event-actions'>
                    {isOrganizer ?
                    <>
                      <Button
                        style='small-btn'
                        type='tertiary'
                        label='Update'
                        action={() => navigate(`/update-event/${event?.id}`)}
                      />
                      <Button
                        style='small-btn'
                        type='tertiary'
                        label='Delete'
                        action={() => setDeleting(true)}
                      />
                      </> :
                      null }
                      {!user ?
                      null :
                      myAttendance?.status === 'waitlist' ?
                      <Button
                        style='small-btn'
                        type='secondary'
                        label='Withdraw Request'
                        action={() => deleteAttendanceStatus()}
                      /> :
                      myAttendance?.status === 'attending' || myAttendance?.status === 'co-host' ?
                      <Button
                        style='small-btn'
                        type='secondary'
                        label='Remove Attendance'
                        action={() => deleteAttendanceStatus()}
                      /> :
                      !myAttendance && !isOrganizer ?
                      <Button
                        style='small-btn'
                        type='secondary'
                        label='Request Attendance'
                        action={() => requestAttendance()}
                      /> :
                      null
                      }
                    </div>
                    </div>
                  </div>
              </aside>
            </div>
            <div className='event_details-section'>
              <h2 className='subheading'>Description</h2>
              <p className='body'>{event?.description}</p>
            </div>
            {normalizedAttendees.length > 0 ?
            <div className='event_details-section'>
              <div className='heading_link-wrapper'>
                <h2 className='subheading'>Attendees</h2>
                {normalizedAttendees?.length > 8 ? <Link to='/manage-event/1'>See all</Link> : null}
              </div>
              <ul>
                {
                  normalizedAttendees?.sort((a, b) => {
                    let idxRes = sortMembers(order[a?.Attendance?.status], order[b?.Attendance?.status])
                    if (idxRes === 0) return sortMembers(a?.Attendance?.status, b?.Attendance?.status)
                    else return idxRes
                }).slice(0,8).map(attendee => {
                    return (
                      <EventAttendeeItem key={attendee.id} organizerId={event?.Group?.Organizer?.id} attendee={attendee}/>
                    )
                  })
                }
              </ul>
            </div>
            :
            <div className='event_details-section'>
              <div className='heading_link-wrapper'>
                <h2 className='subheading'>No Attendees</h2>
              </div>
            </div>
            }

          </div>
        </section>
    </main>
  )
}

export default Event
