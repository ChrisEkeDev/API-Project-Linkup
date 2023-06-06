import React from 'react';

function EventAttendeeItem({organizerId, attendee}) {

  return (
    <div className='attendee_item-wrapper'>
        <div className={`attendee_item-image-wrapper ${organizerId === attendee.id ? 'organizer-image' : ''}`}>
            <div className='attendee_item-image bg-image' style={{backgroundImage: `url(${attendee?.profileImage})`}}>
            </div>
        </div>
        <p>{attendee.firstName} {attendee.lastName}</p>
        <p className='small'>{attendee?.Attendance?.status}</p>
    </div>
  )
}

export default EventAttendeeItem
