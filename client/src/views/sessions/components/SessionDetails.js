import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Scroll from '../../../components/shared/scroll';
import { useApp } from '../../../context/AppContext';
import PlayerCheckins from './PlayerCheckins';
import LatestMessages from '../../../components/shared/chat/LatestMessages';
import { format, parseISO } from 'date-fns';
import ProfileImage from '../../../components/shared/profileImage';
import { thunkGetSingleSession } from '../../../store/sessions'

function SessionDetails() {
    const { dispatch } = useApp();
    const singleSession = useSelector(state => state.sessions.singleSession);
    const formatTime = format(parseISO(singleSession.startDate), 'MMM dd, yyyy @ p')

    useEffect(() => {
        dispatch(thunkGetSingleSession(singleSession.id))
    }, [])

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
                        <p className='sm'>Hosted by
                            <Link className="bold" to={`/teams/${singleSession.Team.id}`}>
                                {singleSession.Team.name}
                            </Link>
                            and created by
                            <strong>{singleSession.Team.captain.name}</strong>
                        </p> :
                        null
                    }
                    <p className='sm bold'>{singleSession.address}</p>
                    <p className='bold md'>{formatTime}</p>
                </div>
            </div>
            <PlayerCheckins />
            <LatestMessages
                entity={singleSession}
            />

        </Scroll>
    )
}

export default SessionDetails