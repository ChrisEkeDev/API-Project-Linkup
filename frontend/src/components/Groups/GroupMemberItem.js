import React from 'react'

function GroupMemberItem({organizerId, member}) {
    const { status } = member.Membership;
    const host = ['co-host', 'organizer'];

  return (
    <li className='group_member-wrapper'>
        <div className={`group_member-image
            ${host.includes(status) ? 'host-image' :
            organizerId === member.id ? 'organizer-image' : ''}`}>
        </div>
        <div className='group_member-data'>
            <p className='body'>{member.firstName} {member.lastName}</p>
            <p className='small'>{organizerId === member.id ? 'organizer' : status}</p>
        </div>
    </li>
  )
}

export default GroupMemberItem
