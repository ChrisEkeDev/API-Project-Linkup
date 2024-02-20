import React from 'react';
import { Link } from 'react-router-dom'
import Scroll from '../../../components/shared/scroll';
import PlayerCheckins from './PlayerCheckins';
import SessionTopComments from './SessionTopComments';
import { format, parseISO } from 'date-fns';
import ProfileImage from '../../../components/shared/profileImage';

function SessionDetails({session}) {
    const formatTime = format(parseISO(session.startDate), 'MMM dd, yyyy @ p')
    const id = session.host?.id

    return (
        <Scroll>
            <section className='container_border session_specs'>
                <span className='section_label xs bold'>Date, Time & Location</span>
                <ProfileImage
                    player={session.creator}
                />
                <div className='flex_column'>
                    {
                        id ?
                        <p className='sm'>
                            <Link className="bold" to={`/teams/${session.host.id}`}>
                               Hosted by {session.host.name}
                            </Link> | Created by <strong>{session.creator.name}</strong>
                        </p> :
                        <p className='sm'>
                            <strong>{session.creator.name}</strong>
                        </p>
                    }
                    <p className='sm bold'>{session.address}</p>
                    <p className='bold md'>{formatTime}</p>
                </div>
            </section>
            <PlayerCheckins />
            {/* <SessionTopComments /> */}
        </Scroll>
    )
}

export default SessionDetails
