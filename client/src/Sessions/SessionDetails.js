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
                <h1>{session.name}</h1>
                <div className='flex'>
                    <TbMapPin className='session__details--icon'/>
                    <p>{session.Court?.address}</p>
                </div>
                <div className='flex'>
                    <TbClock className='session__details--icon'/>
                    {/* <p>{formattedTime}</p> */}
                </div>
            </div>
        </div>
    )
}

export default SessionDetails
