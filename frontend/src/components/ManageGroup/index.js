import React, { useEffect, useState } from 'react';
import { Link, useParams, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlerts } from '../../context/AlertsProvider';
import { thunkGetSingleGroup } from '../../store/groups';
import { thunkGetMembers, thunkUpdateMembership, thunkDeleteMemnership } from '../../store/memberships';
import { FaAngleLeft } from 'react-icons/fa';
import Button from '../Buttons/Button';
import './ManageGroup.css';
import GroupMemberItem from '../Groups/GroupMemberItem';

function ManageGroup() {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ selectedMember, setSelectedMember ] = useState(null);
    const { handleAlerts } = useAlerts();
    const group = useSelector(state => state.groups.singleGroup);
    const members = useSelector(state => state.memberships.currentMembers)
    const memberships = useSelector(state => state.memberships.memberships);
    const normalizeMembers = Object.values(members);
    const normalizeMemberships = Object.values(memberships)

    console.log(selectedMember)

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
            dispatch(thunkUpdateMembership(data.membership, memberData))
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
            dispatch(thunkDeleteMemnership(data.membership, memberData))
            .catch(async(errors) => {
                const alert = await errors.json();
                handleAlerts(alert)
            })
        )
    }

    useEffect(() => {
        dispatch(thunkGetSingleGroup(groupId))
        .then(() => dispatch(thunkGetMembers(groupId)))
        .then(() => setIsLoading(false))
    }, [dispatch])

    if (isLoading) return <div className='loading'>Loading...</div>

  return (
    <div className='manage_group-wrapper'>
        <header className='manage_group-header'>
            <div className='manage_group-header-contents'>
                <Link className='group-back' to='/dashboard'>
                    <FaAngleLeft className='back-icon'/>
                    Dashboard
                </Link>
                <h1>Manage {group.name}</h1>
                <div className='manage_group-actions'>
                    <Button style='small-btn' label='Create Event' type='secondary'/>
                    <Button style='small-btn' label='Update Group' type='secondary'/>
                    <Button style='small-btn' label='Delete Group' type='secondary'/>
                </div>
            </div>
        </header>
        <div className='manage_group-contents'>
            <div className='manage_group-grid-wrapper'>
                <div className='manage_group-grid'>
                    <section className='manage_group-members'>
                        <h2 className='subheading'>Members</h2>
                        <ul>
                            {normalizeMembers.map(member => {
                                return (
                                    <li className={`member-wrapper ${selectedMember?.member?.id === member?.id ? 'selected-member' : ''}`} onClick={() => handleSelectMember(member)} key={member.id}>
                                        <GroupMemberItem organizerId={group?.Organizer?.id} member={member}/>
                                    </li>
                                )
                            })}
                        </ul>
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
