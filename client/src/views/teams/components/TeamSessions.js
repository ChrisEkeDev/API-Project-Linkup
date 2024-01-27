import React from 'react'
import { useApp } from '../../../context/AppContext';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTeamSessions } from '../../../store/teams';
import { format, parseISO } from 'date-fns';
import ProfileImage from '../../../components/shared/profileImage'

function TeamSessions() {
    const { navigate } = useApp();
    const { id } = useParams();
    const {
        data: sessions,
        error: sessiosErr,
        isLoading: sessionsLoading
    } = useQuery(['team-sessions', id], () => getTeamSessions(id))

    if (sessionsLoading) return <div>Loading..</div>
    if (sessiosErr) return <div>Error</div>

  return (
    <div className='container_border team_sessions'>
        <span className='section_label xs bold'>Sessions hosted by Team</span>
        {
            sessions.length > 0 ?
            <ul className='team_session_list'>
                {
                    sessions.map(session => (
                        <li onClick={() => navigate(`/sessions/${session.id}`)} className='team_session_item'>
                            <div className="float_left">
                                <ProfileImage
                                    player={session.creator}
                                />
                                <div>
                                    <p className='sm'>{session.name} by <strong>{session.creator.name}</strong></p>
                                    <p className='sm bold'>{session.address}</p>
                                    <p className='md bold'>{format(parseISO(session.startDate), 'MM/dd @ p')}</p>
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
            <div className='no_content'>

            </div>
        }
    </div>
  )
}

export default TeamSessions
