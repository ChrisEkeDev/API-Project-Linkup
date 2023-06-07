import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DashboardGroupItem from './DashboardGroupItem';
import Button from '../Buttons/Button';

function DashboardGroups({myMemberships}) {
    const [tab, setTab] = useState('organizer');
    const normalizedMemberships = Object.values(myMemberships);
    const organizedMemberships = normalizedMemberships.filter(membership => membership.status === 'organizer');
    const approvedMemberships = normalizedMemberships.filter(membership => membership.status === 'member');
    const pendingMemberships = normalizedMemberships.filter(membership => membership.status === 'pending');
    const history = useHistory();

    const navigate = (route) => {
        history.push(route)
    }


  return (
    <div className='dashboard_groups-wrapper'>
        <h2 className='subheading'>My Groups</h2>
        <div className='dashboard_groups-tabs'>
            <p onClick={() => setTab('organizer')} className={`body dash_tab ${tab === 'organizer' ? 'dash_tab--active' : ''}`}>Organizer</p>
            <p onClick={() => setTab('member')} className={`body dash_tab ${tab === 'member' ? 'dash_tab--active' : ''}`}>Member</p>
            <p onClick={() => setTab('pending')} className={`body dash_tab ${tab === 'pending' ? 'dash_tab--active' : ''}`}>Pending</p>
        </div>
        <section className='dashboard_groups-groups'>
            {
                tab === 'organizer' ?
                <ul>
                {organizedMemberships.length ?
                organizedMemberships.map((group => {
                    return (
                        <DashboardGroupItem key={group.id} data={group}/>
                    )
                }))
                :
                <div className='dash-no_groups'>
                    <p className='body small'>You haven't created any groups yet.</p>
                    <Button
                        type='primary'
                        style='small-btn'
                        label='Start a group'
                        action={() => navigate('/group/new')}
                    />
                </div>
                }
                </ul> :
                tab === 'member' ?
                <ul>
                {approvedMemberships.length ?
                approvedMemberships.map((group => {
                    return (
                        <DashboardGroupItem key={group.id} data={group}/>
                    )
                }))
                :
                <div className='dash-no_groups'>
                    <p className='body small'>You aren't a member of any groups yet.</p>
                    <Button
                        type='primary'
                        style='small-btn'
                        label='Search Groups'
                        action={() => navigate('/search/groups')}
                    />
                </div>
                }
                </ul> :
                <ul>
                {pendingMemberships.length ?
                pendingMemberships.map((group => {
                    return (
                        <DashboardGroupItem key={group.id} data={group}/>
                    )
                }))
                :
                <div className='dash-no_groups'>
                    <p className='body small'>You don't have any pending requests yet.</p>
                    <Button
                        type='primary'
                        style='small-btn'
                        label='Search Groups'
                        action={() => navigate('/search/groups')}
                    />
                </div>
                }
                </ul>
            }
        </section>
    </div>
  )
}

export default DashboardGroups
