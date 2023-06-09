import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlerts } from '../../context/AlertsProvider';
import { thunkGetSingleGroup, thunkDeleteGroup } from '../../store/groups';
import DataLoading from '../Loading/DataLoading';
import { thunkGetGroupMembers, thunkUpdateMembership,thunkGetGroupMemberships, thunkDeleteMembership } from '../../store/memberships';
import { FaAngleLeft } from 'react-icons/fa';
import { useLoading } from '../../context/LoadingProvider';
import Modal from '../Modal';
import Button from '../Buttons/Button';
import './ManageGroup.css';
import GroupMemberItem from '../Groups/GroupMemberItem';
import ManageGroupEventItem from './ManageGroupEventItem';

function ManageGroup() {
    const { groupId } = useParams();
    const [ deleting, setDeleting ] = useState(false);
    const [ tab, setTab ] = useState('members');
    const dispatch = useDispatch();
    const history = useHistory();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ selectedMember, setSelectedMember ] = useState(null);
    const { handleAlerts } = useAlerts();
    const { setLoading } = useLoading();
    const user = useSelector(state => state.session.user);
    const group = useSelector(state => state.groups.singleGroup);
    const members = useSelector(state => state.memberships.groupMembers)
    const memberships = useSelector(state => state.memberships.groupMemberships);
    const events = useSelector(state => state.events.allEvents);
    const normalizedEvents = Object.values(events);
    const groupEvents = normalizedEvents.filter(event => event.groupId === Number(groupId));
    const normalizeMembers = Object.values(members);
    const normalizeMemberships = Object.values(memberships)

    const navigate = (route) => {
        history.push(route)
    }

    const handleSelectMember = (member) => {
        const memberData = {}
        const membership = normalizeMemberships.find(membership => member.id === membership.userId);
        memberData.member = member
        memberData.membership = membership;
        setSelectedMember(memberData)
    }

    const updateMemberStatus = (data, status) => {
        const memberData = {
            memberId: parseInt(data.member.id),
            status: status
        }
        return (
            dispatch(thunkUpdateMembership(data, memberData))
            .then(() => handleAlerts({message: 'Status updated'}))
            .catch(async(errors) => {
                const alert = await errors.json();
                handleAlerts(alert)
            })
        )
    }

    const deleteMemberStatus = (data) => {
        const memberData = {
            memberId: parseInt(data.member.id),
        }
        return (
            dispatch(thunkDeleteMembership(data.membership, memberData))
            .then(() => setSelectedMember(null))
            .then(() => handleAlerts({message: 'Member removed'}))
            .catch(async(errors) => {
                const alert = await errors.json();
                handleAlerts(alert)
            })
        )
    }

    const deleteGroup = (e) => {
        e.preventDefault();
        setLoading(true);
        navigate('/search/groups');
        return (
            dispatch(thunkDeleteGroup(group))
            .then((alert) => {
                handleAlerts(alert);
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

    if (isLoading) return <DataLoading></DataLoading>

    if (user?.id !== group?.organizerId) return <Redirect to='/'></Redirect>

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
        <header className='manage_group-header'>
            <div className='manage_group-header-contents'>
                <Link className='group-back' to='/dashboard'>
                    <FaAngleLeft className='back-icon'/>
                    Dashboard
                </Link>
                <h1>Manage {group.name}</h1>
                <div className='manage_group-actions'>
                    <Button
                        style='small-btn'
                        label='Create Event'
                        type='secondary'
                        action={() => navigate(`/create-event/${group?.id}`)}
                    />
                    <Button
                        style='small-btn'
                        label='Update Group'
                        type='secondary'
                        action={() => navigate(`/update-group/${group?.id}`)}
                    />
                    <Button
                        style='small-btn'
                        label='Delete Group'
                        type='secondary'
                        action={() => setDeleting(true)}
                    />
                </div>
                <div className='manage_group-tabs'>
                    <p onClick={() => setTab('members')} className={`body manage_group-tab ${tab === 'members' ? 'dash_tab--active' : ''}`}>Members</p>
                    <p onClick={() => setTab('events')} className={`body manage_group-tab ${tab === 'events' ? 'dash_tab--active' : ''}`}>Events</p>
                </div>
            </div>
        </header>
        <div className='manage_group-contents'>
            <div className='manage_group-grid-wrapper'>
                <div className='manage_group-grid'>
                    <div>
                        {tab === 'members' ?
                        <section className='manage_group-members'>
                            <h2 className='subheading'>Members</h2>
                            {normalizeMembers.length > 0 &&
                            <ul className='manage_group-members-contents'>
                                {normalizeMembers.map(member => {
                                    return (
                                        <li className={`member-wrapper ${selectedMember?.member?.id === member?.id ? 'selected-member' : ''}`} onClick={() => handleSelectMember(member)} key={member.id}>
                                            <GroupMemberItem organizerId={group?.Organizer?.id} member={member}/>
                                        </li>
                                    )
                                })}
                            </ul>}
                        </section>
                        :
                        <section className='manage_group-events'>
                            <h2 className='subheading'>Events</h2>
                            <ul>
                                {
                                    groupEvents.map((event => {
                                        return (
                                            <li className='event_item-wrapper'>
                                                <Link to={`/manage-event/${event?.id}`} className='event-link'>
                                                    <ManageGroupEventItem key={event?.id} contained={true}  id={event?.id}/>
                                                </Link>
                                            </li>
                                        )
                                    }))
                                }
                            </ul>
                        </section>
                        }
                    </div>
                    {
                        tab === 'members' ?
                        <aside className='manage_group-member-actions'>
                        {
                            selectedMember ?
                            <>
                            <h2 className='subheading'>Manage Member</h2>
                            <div className='member_actions-wrapper'>
                                <header className='member_actions-header'>
                                    <p>{selectedMember.member.firstName} {selectedMember.member.lastName}</p>
                                    <p className='small'>{selectedMember.member.Membership.status}</p>
                                </header>
                                <div className='member_actions-actions'>
                                    {
                                        selectedMember.member.Membership.status === 'member' ?
                                            <Button
                                                style='small-btn'
                                                label='Promote'
                                                type='secondary'
                                                action={() => updateMemberStatus(selectedMember, 'co-host')}
                                            /> :
                                            null
                                    }
                                    {
                                        selectedMember.member.Membership.status === 'pending' ?
                                            <Button
                                                style='small-btn'
                                                label='Approve'
                                                type='secondary'
                                                action={() => updateMemberStatus(selectedMember, 'member')}
                                            /> :
                                            selectedMember.member.Membership.status === 'co-host' ?
                                            <Button
                                                style='small-btn'
                                                label='Demote'
                                                type='secondary'
                                                action={() => updateMemberStatus(selectedMember, 'member')}
                                            /> :
                                            null
                                    }
                                    {
                                        selectedMember.member.Membership.status === 'organizer' ?
                                        null :
                                        <Button
                                            style='small-btn'
                                            label='Remove'
                                            type='secondary'
                                            action={() => deleteMemberStatus(selectedMember)}
                                        />
                                    }
                                </div>
                            </div>
                            </> :
                            null
                            }
                        </aside>:
                    null
                    }

                </div>
            </div>
        </div>
    </div>
  )
}

export default ManageGroup
