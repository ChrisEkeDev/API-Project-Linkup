import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlerts } from '../../context/AlertsProvider';
import { thunkGetSingleGroup, thunkDeleteGroup } from '../../store/groups';
import { thunkGetGroupMembers, thunkUpdateMembership,thunkGetGroupMemberships, thunkDeleteMembership } from '../../store/memberships';
import { FaAngleLeft } from 'react-icons/fa';
import { useLoading } from '../../context/LoadingProvider';
import Modal from '../Modal';
import Button from '../Buttons/Button';
import './ManageGroup.css';
import GroupMemberItem from '../Groups/GroupMemberItem';

function ManageGroup() {
    const { groupId } = useParams();
    const [ deleting, setDeleting ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ selectedMember, setSelectedMember ] = useState(null);
    const { handleAlerts } = useAlerts();
    const { setLoading } = useLoading();
    const group = useSelector(state => state.groups.singleGroup);
    const members = useSelector(state => state.memberships.groupMembers)
    const memberships = useSelector(state => state.memberships.groupMemberships);
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
        setSelectedMember(null)
        return (
            dispatch(thunkUpdateMembership(data.membership, memberData))
            .then(() => dispatch(thunkGetGroupMembers(groupId)))
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
        setSelectedMember(null)
        return (
            dispatch(thunkDeleteMembership(data.membership, memberData))
            .then(() => handleAlerts({message: 'Member removed'}))
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
            </div>
        </header>
        <div className='manage_group-contents'>
            <div className='manage_group-grid-wrapper'>
                <div className='manage_group-grid'>
                    <section className='manage_group-members'>
                        <h2 className='subheading'>Members</h2>
                        {normalizeMembers.length > 0 &&
                        <ul>
                            {normalizeMembers.map(member => {
                                return (
                                    <li className={`member-wrapper ${selectedMember?.member?.id === member?.id ? 'selected-member' : ''}`} onClick={() => handleSelectMember(member)} key={member.id}>
                                        <GroupMemberItem organizerId={group?.Organizer?.id} member={member}/>
                                    </li>
                                )
                            })}
                        </ul>}
                    </section>
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
                                        <Button
                                            style='small-btn'
                                            label='Remove'
                                            type='secondary'
                                            action={() => deleteMemberStatus(selectedMember)}
                                        />

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

export default ManageGroup
