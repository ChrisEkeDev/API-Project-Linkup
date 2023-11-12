
import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlerts } from '../../context/AlertsProvider';
import { thunkGetSingleEvent, thunkDeleteEvent } from '../../store/events';
import DataLoading from '../Loading/DataLoading';
import { thunkGetEventAttendees, thunkUpdateAttendance, thunkGetEventAttendances, thunkDeleteAttendance  } from '../../store/attendances';
import { FaAngleLeft } from 'react-icons/fa';
import { useLoading } from '../../context/LoadingProvider';
import Modal from '../Modal';
import Button from '../Buttons/Button';
import '../ManageGroup/ManageGroup.css';
import EventAttendeeItem from '../Events/EventAttendeeItem'

function ManageEvent() {
    const { eventId } = useParams();
    const [ deleting, setDeleting ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ selectedAttendee, setSelectedAttendee ] = useState(null);
    const { handleAlerts } = useAlerts();
    const { setLoading } = useLoading();
    const user = useSelector(state => state.session.user);
    const event = useSelector(state => state.events.singleEvent);
    const attendees = useSelector(state => state.attendances.eventAttendees)
    const attendances = useSelector(state => state.attendances.eventAttendances);
    const normalizeAttendees = Object.values(attendees);
    const normalizeAttendances = Object.values(attendances)

    const navigate = (route) => {
        history.push(route)
    }

    const handleSelectAttendee = (attendee) => {
        const attendeeData = {}
        const attendance = normalizeAttendances.find(attendance => attendee.id === attendance.userId);
        attendeeData.attendee = attendee
        attendeeData.attendance = attendance;
        setSelectedAttendee(attendeeData)
    }

    const updateAttendeeStatus = (data, status) => {
        const attendeeData = {
            userId: parseInt(data.attendee.id),
            status: status
        }
        return (
            dispatch(thunkUpdateAttendance(data, attendeeData))
            .then(() => handleAlerts({message: 'Status updated'}))
            .catch(async(errors) => {
                const alert = await errors.json();
                handleAlerts(alert)
            })
        )
    }

    const deleteAttendeeStatus = (data) => {
        const attendeeData = {
            userId: parseInt(data.attendee.id),
        }
        return (
            dispatch(thunkDeleteAttendance(data.attendance, attendeeData))
            .then(() => setSelectedAttendee(null))
            .then(() => handleAlerts({message: 'Attendee removed'}))
            .catch(async(errors) => {
                const alert = await errors.json();
                handleAlerts(alert)
            })
        )
    }

    const deleteEvent = (e) => {
        e.preventDefault();
        setLoading(true);
        navigate('/search/events');
        return (
            dispatch(thunkDeleteEvent(event))
            .then((alert) => {
                handleAlerts(alert);
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

    if (user?.id !== event?.Group?.Organizer?.id) return <Redirect to='/'></Redirect>

  return (
    <div className='manage_group-wrapper'>
        {
            deleting ?
            <Modal>
                <form className='modal-contents'>
                    <h2 className='subheading'>Confirm Delete</h2>
                    <p className='body'>Are you sure you want to remove this group?</p>
                    <Button
                        style='spaced'
                        type='primary'
                        label='Yes (Delete Group)'
                        action={(e) => deleteEvent(e)}
                    />
                    <Button
                        style='spaced'
                        type='tertiary'
                        label='No (Keep Group)'
                        action={() => setDeleting(false)}
                    />
                </form>
            </Modal> :
            null
        }
        <header className='manage_group-header'>
            <div className='manage_group-header-contents'>
                <Link className='group-back' to='/dashboard'>
                    <FaAngleLeft className='back-icon'/>
                    Dashboard
                </Link>
                <h1>Manage {event?.name}</h1>
                <div className='manage_group-actions'>
                    <Button
                        style='small-btn'
                        label='Update Event'
                        type='secondary'
                        action={() => navigate(`/update-event/${event?.id}`)}
                    />
                    <Button
                        style='small-btn'
                        label='Delete Event'
                        type='secondary'
                        action={() => setDeleting(true)}
                    />
                </div>
            </div>
        </header>
        <div className='manage_group-contents'>
            <div className='manage_group-grid-wrapper'>
                <div className='manage_group-grid'>
                    <section className='manage_group-members'>
                        <h2 className='subheading'>{normalizeAttendees.length ? 'Attendees' : 'No Attendees'}</h2>
                        {normalizeAttendees.length > 0 &&
                        <ul className='manage_group-members-contents'>
                            {normalizeAttendees.map(attendee => {
                                return (
                                    <li className={`member-wrapper ${selectedAttendee?.attendee?.id === attendee?.id ? 'selected-member' : ''}`} onClick={() => handleSelectAttendee(attendee)} key={attendee.id}>
                                        <EventAttendeeItem organizerId={event?.Group?.Organizer?.id} attendee={attendee}/>
                                    </li>
                                )
                            })}
                        </ul>}
                    </section>
                    <aside className='manage_group-member-actions'>
                        {
                            selectedAttendee ?
                            <>
                            <h2 className='subheading'>Manage Attendee</h2>
                            <div className='member_actions-wrapper'>
                                <header className='member_actions-header'>
                                    <p>{selectedAttendee.attendee.firstName} {selectedAttendee.attendee.lastName}</p>
                                    <p className='small'>{selectedAttendee.attendee.Attendance.status}</p>
                                </header>
                                <div className='member_actions-actions'>
                                    {
                                        selectedAttendee.attendee.Attendance.status === 'waitlist' ?
                                            <Button
                                                style='small-btn'
                                                label='Accept'
                                                type='secondary'
                                                action={() => updateAttendeeStatus(selectedAttendee, 'attending')}
                                            /> :
                                            null
                                    }
                                    {
                                        user?.id === selectedAttendee.attendee.id ?
                                        null :
                                        <Button
                                            style='small-btn'
                                            label='Remove'
                                            type='secondary'
                                            action={() => deleteAttendeeStatus(selectedAttendee)}
                                        />
                                    }


                                </div>
                            </div>
                            </>:
                            null
                        }

                    </aside>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManageEvent
