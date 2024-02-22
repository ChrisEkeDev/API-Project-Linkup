import React from 'react'
import { useApp } from '../../../context/AppContext';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTeamSessions } from '../../../store/teams';
import { format, parseISO } from 'date-fns';
import SectionContainer from '../../../components/shared/layout/SectionContainer';
import ProfileImage from '../../../components/shared/profileImage'
import NoContent from '../../../components/shared/noContent';
import { Tb123 } from 'react-icons/tb';

function TeamSessions() {
    const { navigate, theme } = useApp();
    const { id } = useParams();
    const {
        data: sessions,
        error: sessiosErr,
        isLoading: sessionsLoading
    } = useQuery(['team-sessions', id], () => getTeamSessions(id))

    if (sessionsLoading) return <div>Loading..</div>
    if (sessiosErr) return <div>Error</div>

    const sessionsData = sessions?.data;

    return (
        <SectionContainer title='Sessions hosted by Team'>
            {
                sessionsData.length > 0 ?
                <ul className='team_session_list'>
                    {
                        sessionsData.map(session => (
                            <li key={session.id} onClick={() => navigate(`/sessions/${session.id}`)} className={`team_session_item team_session_item-${theme}`}>
                                <div className="float_left">
                                    <ProfileImage
                                        player={session.creator}
                                    />
                                    <div>
                                        <p className='sm'>{session.name} by <strong>{session.creator.name}</strong></p>
                                        <p className='sm bold'>{session.address}</p>
                                        <p className='md bold accent'>{format(parseISO(session.startDate), 'MM/dd @ p')}</p>
                                    </div>
                                    </div>
                                    <div className='player_count'>
                                        <h2 className='count accent'>{session.checkInCount}</h2>
                                        <small>Players</small>
                                    </div>
                            </li>
                        ))
                    }
                </ul> :
                <NoContent
                    icon={Tb123}
                    message='No current sessions'
                />
            }
        </SectionContainer>
    )
}

export default TeamSessions
