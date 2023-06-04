import React, { useState } from 'react';
import DashboardGroupItem from './DashboardGroupItem';
import Button from '../Buttons/Button';

function DashboardGroups({user, groups}) {
    const [tab, setTab] = useState('organizer');
    const organizedGroups = groups.filter(group => group.organizerId === user?.id);
    const memberOfGroups = groups.filter(group => group.organizerId !== user?.id);

  return (
    <div className='dashboard_groups-wrapper'>
        <h2>My Groups</h2>
        <div className='dashboard_groups-tabs'>
            <p onClick={() => setTab('organizer')} className={`body dash_tab ${tab === 'organizer' ? 'dash_tab--active' : ''}`}>Organizer</p>
            <p onClick={() => setTab('member')} className={`body dash_tab ${tab === 'member' ? 'dash_tab--active' : ''}`}>Member</p>
        </div>
        <section className='dashboard_groups-groups'>
            {
                tab === 'organizer' ?
                <ul>
                {organizedGroups.length === 0 ?
                <div className='dash-no_groups'>
                    <p className='body small'>You haven't created any groups yet.</p>
                    <Button
                        type='primary'
                        style='small-btn'
                        label='Start a group'
                    />
                </div>
                :
                organizedGroups.map((group => {
                    return (
                        <DashboardGroupItem key={group.id} group={group} organizer={true}/>
                    )
                }))}
                </ul> :
                <ul>
                {memberOfGroups.length === 0 ?
                <div className='dash-no_groups'>
                    <p className='body small'>You aren't a member of any groups yet.</p>
                    <Button
                        type='primary'
                        style='small-btn'
                        label='Search Groups'
                    />
                </div>
                :
                memberOfGroups.map((group => {
                    return (
                        <DashboardGroupItem key={group.id} group={group}/>
                    )
                }))}
                </ul>
            }
        </section>
    </div>
  )
}

export default DashboardGroups
