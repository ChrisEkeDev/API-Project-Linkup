import React from 'react';
import { useSelector } from 'react-redux';

function GroupMemberItem({ organizerId, member}) {
    const { status } = member.Membership;
    const memberships = useSelector(state => state.memberships.memberships)
    const host = ['co-host', 'organizer'];

  return (
    <div className='group_member-wrapper'>
        <div className={`profile_image-wrapper ${host.includes(status) ? 'host-image' :
                    organizerId === member.id ? 'organizer-image' : ''}`}>
            <div className={`group_member-image bg-image`}
                style={{backgroundImage: `url(${member?.profileImage})` }}>
            </div>
        </div>
        <div className='group_member-data'>
            <p>{member.firstName} {member.lastName}</p>
            <p className='small'>{organizerId === member.id ? 'organizer' : status}</p>
        </div>
    </div>
  )
}

export default GroupMemberItem
