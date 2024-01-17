import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Scroll from '../../../components/shared/scroll';
import SessionInformation from './SessionInformation';
import SessionCheckIns from './SessionCheckIns';
import LatestMessages from '../../../components/shared/chat/LatestMessages';
import { format, parseISO } from 'date-fns';
import ProfileImage from '../../../components/shared/profileImage';

function SessionDetails() {
    const singleSession = useSelector(state => state.sessions.singleSession);
    const sessionCheckIns = useSelector(state => state.checkIns.sessionCheckIns)
    const sessionCheckInsArr = Object.values(sessionCheckIns)
    const formatTime = format(parseISO(singleSession.startDate), 'MMM dd, yyyy @ p')

    return (
        <Scroll>
            <div className='container_border session_specs'>
                <span className='section_label xs bold'>Date, Time & Location</span>
                <ProfileImage
                    player={singleSession.creator}
                />
                <div className='flex_column'>
                    {
                        singleSession.hostId ?
                        <p className='sm'>Hosted by <Link className="bold" to={`/teams/${singleSession.Team.id}`}>{singleSession.Team.name}</Link> and created by <strong>{singleSession.Team.captain.name}</strong></p> :
                        null
                    }
                    <p className='sm bold'>{singleSession.address}</p>
                    <p className='bold md'>{formatTime}</p>
                </div>
            </div>
            <SessionCheckIns
                checkIns={sessionCheckInsArr}
                />
            <LatestMessages
                entity={singleSession}
            />

        </Scroll>
    )
}

export default SessionDetails
