import React from 'react';
import { Link } from 'react-router-dom'
import Scroll from '../../../components/shared/scroll';
import PlayerCheckins from './PlayerCheckins';
import LatestMessages from '../../../components/shared/chat/LatestMessages';
import { format, parseISO } from 'date-fns';
import ProfileImage from '../../../components/shared/profileImage';

function SessionDetails({session}) {
    const formatTime = format(parseISO(session.startDate), 'MMM dd, yyyy @ p')

    return (
        <Scroll>
            <div className='container_border session_specs'>
                <span className='section_label xs bold'>Date, Time & Location</span>
                <ProfileImage
                    player={session.creator}
                />
                <div className='flex_column'>
                    {
                        session.host.id ?
                        <p className='sm'>Hosted by
                            <Link className="bold" to={`/teams/${session.host.id}`}>
                                {session.host.name}
                            </Link>
                            and created by
                            <strong>{session.host.captain.name}</strong>
                        </p> :
                        null
                    }
                    <p className='sm bold'>{session.address}</p>
                    <p className='bold md'>{formatTime}</p>
                </div>
            </div>
            <PlayerCheckins />
            <LatestMessages
                entity={session}
            />

        </Scroll>
    )
}

export default SessionDetails
