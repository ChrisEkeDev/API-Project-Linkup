import React from 'react';
import { Link } from 'react-router-dom'
import Scroll from '../../../components/shared/scroll';
import PlayerCheckins from './PlayerCheckins';
import SessionTopComments from './SessionTopComments';
import { format, parseISO } from 'date-fns';
import ProfileImage from '../../../components/shared/profileImage';
import SectionContainer from '../../../components/shared/layout/SectionContainer';

function SessionDetails({session}) {
    const formatTime = format(parseISO(session.startDate), 'MMM dd, yyyy @ p')
    const id = session.host?.id

    return (
        <Scroll>
            <SectionContainer title='Date, Time & Location'>
                <div className='float_left flex_full pad_full'>
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
                        <p className='bold md accent'>{formatTime}</p>
                    </div>
                </div>
            </SectionContainer>
            <PlayerCheckins />
            {/* <SessionTopComments /> */}
        </Scroll>
    )
}

export default SessionDetails
