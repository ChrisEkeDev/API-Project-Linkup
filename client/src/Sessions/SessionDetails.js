import React from 'react';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { TbClock, TbMapPin } from 'react-icons/tb';

function SessionDetails() {
    const session = useSelector(state => state.sessions.singleSession);
    if (!session) return <div>loading...</div>

    // const formattedTime = format(parseISO(session?.startDate), 'p');

    return (
        <div className='sessions_details--wrapper'>
            <div className='sessions_details--contents'>
                <div className='detail-grid'>
                    <small>What</small>
                    <p>{session.name}</p>
                </div>
                <div className='detail-grid'>
                    <small>Where</small>
                    <p>{session.Court?.address}</p>
                </div>
                <div className='detail-grid'>
                    <small>When</small>
                    {/* <p>{formattedTime}</p> */}
                    <p>12:55 PM</p>
                </div>
            </div>
        </div>
    )
}

export default SessionDetails
