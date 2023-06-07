import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSingleGroup, thunkDeleteGroup,  } from '../../store/groups';
import { thunkGetGroupMembers, thunkGetGroupMemberships, thunkDeleteMembership, thunkAddMembership } from '../../store/memberships';
import { FaAngleLeft } from 'react-icons/fa';
import { useLoading } from '../../context/LoadingProvider';
import { useAlerts } from '../../context/AlertsProvider';
import Modal from '../Modal';
import EventItem from '../Events/EventItem';
import Button from '../Buttons/Button';
import './Group.css';
import GroupMemberItem from './GroupMemberItem';

function Group() {
    const [ deleting, setDeleting ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    // Hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const { handleAlerts } = useAlerts();
    const { setLoading } = useLoading();
    const { groupId } = useParams();
    // Store Data
    const user = useSelector(state => state.session.user)
    const group = useSelector(state => state.groups.singleGroup);
    const events = useSelector(state => state.events.allEvents);
    const members = useSelector(state => state.memberships.groupMembers);
    const memberships = useSelector(state => state.memberships.groupMemberships)
    // Normalized Data
    const normalizedEvents = Object.values(events);
    const normalizeMembers = Object.values(members);
    const normalizeMemberships = Object.values(memberships)
    // Group Data
    const groupEvents = normalizedEvents.filter(event => event.groupId === Number(groupId));
    const upcomingEvents = groupEvents.filter(event => new Date(event.startDate).getTime() > new Date().getTime());
    const pastEvents = groupEvents.filter(event => new Date(event.startDate).getTime() < new Date().getTime());
    // User Data
    const myMembership = normalizeMemberships.find(membership => user.id === membership.userId)

    const navigate = (route) => {
        history.push(route)
    }

    const deleteMemberStatus = (data) => {
        const memberData = {
            memberId: parseInt(user.id),
        }
        return (
            dispatch(thunkDeleteMembership(myMembership, memberData))
            .catch(async(errors) => {
                const alert = await errors.json();
                handleAlerts(alert)
            })
        )
    }

    const joinAsMember = () => {
        return (
            dispatch(thunkAddMembership(group.id))
            .catch(async(errors) => {
                const alert = await errors.json();
                handleAlerts(alert)
            })
        )
    }

    const deleteGroup = (e) => {
        e.preventDefault();
        setLoading(true)
        return (
            dispatch(thunkDeleteGroup(group))
            .then((alert) => {
                handleAlerts(alert);
                navigate('/search/groups');
                setLoading(false);
            })
            .catch(async(errors) => {
                handleAlerts({message: 'There was an issue deleting your group'})
                setLoading(false)
            })
        )
    }

    useEffect(() => {
        dispatch(thunkGetSingleGroup(groupId))
        .then(() => dispatch(thunkGetGroupMembers(groupId)))
        .then(() => dispatch(thunkGetGroupMemberships(groupId)))
        .then(() => setIsLoading(false))
    }, [dispatch])

    if (isLoading) return <div className='loading'>Loading...</div>

  return (
    <main className='group-wrapper'>
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
                        action={(e) => deleteGroup(e)}
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
        <header className='group_header-wrapper'>
            <div className='group_header-contents'>
                <Link className='group-back' to='/search/groups'>
                    <FaAngleLeft className='back-icon'/>
                    Groups
                </Link>
                <div className='group-contents'>
                    {group ? <div className='group-image bg-image' style={{backgroundImage: `url(${group?.GroupImages[0]?.url})` }}></div> : null }
                    <div className='group_details-wrapper'>
                        <div className='group_details-contents'>
                            <h1 className='heading'>{group?.name}</h1>
                            <small className='body small'>{group?.city}, {group?.state}</small>
                            <small className='body small'>{groupEvents?.length} {groupEvents?.length === 1 ? 'event' : 'events'}<span> &#8729; </span>{group?.private ? 'Private' : 'Public'}</small>
                            <small className='body small'>Organized by <span className='caps'>{group?.Organizer?.firstName} {group?.Organizer?.lastName}</span></small>
                        </div>
                        {
                            user?.id === group?.Organizer?.id ?
                            <div className='group-actions'>
                                <Button
                                    label='Create Event'
                                    type='secondary small-btn'
                                    action={() => navigate(`/create-event/${group?.id}`)}
                                />
                                <Button
                                    label='Update'
                                    type='secondary small-btn'
                                    action={() => navigate(`/update-group/${group?.id}`)}
                                />
                                <Button
                                    label='Delete'
                                    type='secondary small-btn'
                                    action={() => setDeleting(true)}
                                />
                            </div> :
                            null}
                            {
                            myMembership &&  user?.id !== group?.Organizer?.id && myMembership.status !== 'pending' ?
                            <Button
                                label='Leave this group'
                                type='secondary'
                                style='small-btn'
                                action={() => deleteMemberStatus(myMembership)}
                            /> :
                            !myMembership ?
                            <Button
                                label='Join this group'
                                type='primary'
                                style='small-btn'
                                action={() => joinAsMember()}
                            />:
                            myMembership.status === 'pending' ?
                            <Button
                                label='Withdraw Request'
                                type='secondary'
                                style='small-btn'
                                action={() => joinAsMember()}
                            />:
                            null
                            }
                    </div>
                </div>
            </div>
        </header>
        <section className='group_section-wrapper'>
            <div className='group_section-contents'>
                <header className='group_section-header'>
                    <h2 className='subheading'>Organizer</h2>
                    <p className='body'><span className='caps'>{group?.Organizer?.firstName} {group?.Organizer?.lastName}</span></p>
                </header>
                <article className='group_section-about'>
                    <h2 className='subheading'>What we're about</h2>
                    <p className='body'>{group?.about}</p>
                </article>
                <article className='group_section-events_calendar'>
                    <section className='group_section-events'>
                        {
                           upcomingEvents?.length ?
                           <div className='group_section-event_list'>
                            <h2 className='subheading'>Upcoming Events ({upcomingEvents?.length})</h2>
                            <ul>
                                {upcomingEvents?.map(event => {
                                        return (
                                            <EventItem key={event?.id}  contained={true} id={event?.id} />
                                        )
                                })}
                           </ul>
                           </div>:
                           null
                        }
                        {
                           pastEvents?.length ?
                           <div className='group_section-event_list'>
                            <h2 className='subheading'>Past events ({pastEvents?.length})</h2>
                            <ul>
                                {pastEvents?.map(event => {
                                        return (
                                            <EventItem key={event?.id} contained={true} id={event?.id} />
                                        )
                                })}
                           </ul>
                           </div>:
                           null
                        }
                    </section>
                    <aside className='group_aside-wrapper'>
                        <div className='group_aside-members'>
                            <div className='heading_link-wrapper'>
                                <h2 className='subheading'>Members</h2>
                                {normalizeMembers.length > 8 ? <Link to='/manage-group/1'>See all</Link> : null}
                            </div>
                            <ul>
                                {normalizeMembers?.reduce((acc, member) => {
                                    if (member.status === 'organizer') return [ member, ...acc ]
                                    if (member.status === 'pending') return [  ...acc, member ]
                                    return [ ...acc, member ]
                                }, []).slice(0,8).map(member => {
                                    return (
                                        <li key={member.id}>
                                            <GroupMemberItem organizerId={group?.Organizer?.id} member={member} />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </aside>
                </article>
            </div>
        </section>
    </main>
  )
}

export default Group
