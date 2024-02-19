import React from 'react'
import { TbCircle, TbCircleCheck } from 'react-icons/tb';
import { useQuery } from 'react-query';
import { getMyMemberships } from '../../../store/auth'

function SessionHosts(props) {
    const { data: memberships, error: membershipsError, isLoading: membershipsLoading } = useQuery(['my-memberships'], getMyMemberships)
    const { handleHost, sessionData } = props;
    const currentHostId = sessionData.hostId;
    console.log(sessionData)

    if (membershipsLoading) return <div>Loading...</div>
    if (membershipsError) return <div>Error!</div>

    const membershipsData = memberships.data;
    const authTeams = membershipsData?.filter(membership => membership.status === 'host' || membership.status === 'co-host');

    return (
        <>
        {
            authTeams?.length > 0 ?
            <ul className='container_border session_hosts'>
                <span className='section_label xs bold'>Select a Team to Host this Session (Optional)</span>
                {authTeams.map(team => (
                    <li key={team.Team.id} className='session_host' onClick={() => handleHost(team.Team.id)}>
                    {
                        team.Team.id === currentHostId ?
                        <TbCircleCheck className='lg' /> :
                        <TbCircle className='lg'/>
                    }
                    <div>
                            <p className='md bold'>{team.Team.name}</p>
                            <p>{team.status}</p>
                    </div>
                    </li>
                ))}
            </ul> :
            null
        }
        </>

    )
}

export default SessionHosts
