import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSingleGroup } from '../../store/groups';
import EventItem from '../Events/EventItem';
import Button from '../Buttons/Button';
import './Group.css';
import { FaAngleLeft } from 'react-icons/fa';

function Group() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();
    const user = useSelector(state => state.session.user)
    const group = useSelector(state => state.groups.singleGroup)
    const events = ['past', 'past', 'future', 'future', 'future', 'future', 'past', 'future']

    const navigate = (route) => {
        history.push(route)
    }

    useEffect(() => {
        dispatch(thunkGetSingleGroup(groupId))
    }, [dispatch])


  return (
    <main className='group-wrapper'>
        <header className='group_header-wrapper'>
            <div className='group_header-contents'>
                <Link className='group-back' to='/search/groups'>
                    <FaAngleLeft className='back-icon'/>
                    Groups
                </Link>
                <div className='group-contents'>
                    <div className='group-image'></div>
                    <div className='group_details-wrapper'>
                        <div className='group_details-contents'>
                            <h1 className='heading'>{group?.name}</h1>
                            <small className='body small'>{group?.city}, {group?.state}</small>
                            <small className='body small'>## of events<span> &#8729; </span>{group?.private ? 'Private' : 'Public'}</small>
                            <small className='body small'>Organized by {group?.Organizer?.firstName} {group?.Organizer?.lastName}</small>
                        </div>
                        {
                            user?.id === group?.Organizer?.id ?
                            <div className='group-actions'>
                                <Button
                                    label='Create Event'
                                    type='secondary small-btn'
                                />
                                <Button
                                    label='Update'
                                    type='secondary small-btn'
                                    action={() => navigate(`/update-group/${group?.id}`)}
                                />
                                <Button
                                    label='Delete'
                                    type='secondary small-btn'
                                />
                            </div> :
                            <Button
                                label='Join this group'
                                type='primary'
                            />
                        }

                    </div>
                </div>
            </div>
        </header>
        <section className='group_section-wrapper'>
            <div className='group_section-contents'>
                <header className='group_section-header'>
                    <h2 className='subheading'>Organizer</h2>
                    <p className='body'>{group?.Organizer?.firstName} {group?.Organizer?.lastName}</p>
                </header>
                <article className='group_section-about'>
                    <h2 className='subheading'>What we're about</h2>
                    <p className='body'>{group?.about}</p>
                </article>
                <article className='group_section-events_calendar'>
                    <section className='group_section-events'>
                        {
                           events.filter(e=>e==='future').length ?
                           <div className='group_section-event_list'>
                            <h2 className='subheading'>Upcoming Events ({events.filter(e=>e==='future').length})</h2>
                            <ul>
                                {events.filter(e=>e==='future').map(e => {
                                        return (
                                            <EventItem contained={true} />
                                        )
                                })}
                           </ul>
                           </div>:
                           null
                        }
                        {
                           events.filter(e=>e==='past').length ?
                           <div className='group_section-event_list'>
                            <h2 className='subheading'>Past events ({events.filter(e=>e==='past').length})</h2>
                            <ul>
                                {events.filter(e=>e ==='past').map(e => {
                                        return (
                                            <li><EventItem contained={true} /></li>
                                        )
                                })}
                           </ul>
                           </div>:
                           null
                        }
                    </section>
                    <aside className='group_section-calendar'>

                    </aside>
                </article>
            </div>
        </section>
    </main>
  )
}

export default Group
