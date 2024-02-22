import React from 'react'
import { useApp } from '../../../context/AppContext';
import { TbCircle, TbCircleCheck } from 'react-icons/tb';
import { useQuery } from 'react-query';
import { getMyMemberships } from '../../../store/auth'
import SectionContainer from '../../../components/shared/layout/SectionContainer';
import List from '../../../components/shared/layout/List';

function SessionHosts(props) {
    const { data: memberships, error: membershipsError, isLoading: membershipsLoading } = useQuery(['my-memberships'], getMyMemberships)
    const { handleHost, sessionData } = props;
    const { theme } = useApp();
    const currentHostId = sessionData.hostId;

    if (membershipsLoading) return <div>Loading...</div>
    if (membershipsError) return <div>Error!</div>

    const membershipsData = memberships.data;
    const authTeams = membershipsData?.filter(membership => membership.status === 'host' || membership.status === 'co-host');

    return (
        <>
        {
            authTeams?.length > 0 ?
            <SectionContainer title='Select a Team to Host this Session (Optional)'>
                <List>
                {authTeams.map(team => (
                    <li key={team.Team.id} className={`session_host session_host-${theme}`} onClick={() => handleHost(team.Team.id)}>
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
                </List>
            </SectionContainer>
            : null
        }
        </>

    )
}

export default SessionHosts
