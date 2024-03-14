import React from 'react'
import TeamMember from './TeamMember';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTeamMemberships } from '../../../store/teams';
import SeeMore from '../../../components/shared/button/SeeMore';
import SectionContainer from '../../../components/shared/layout/SectionContainer';

function PlayerMemberships({handleTab}) {
    const { id } = useParams();
    const {
        data: memberships,
        error: membershipsErr,
        isLoading: membershipsLoading
    } = useQuery(['team-memberships', id], () => getTeamMemberships(id))

    if (membershipsLoading) return <div>Loading..</div>
    if (membershipsErr) return <div>Error</div>

    const membershipsData = memberships.data;

    let filteredMemberships = membershipsData.filter(x => x.status !== 'pending')

    return (
        <SectionContainer  title={`${filteredMemberships.length} Player${filteredMemberships.length !== 1  ? 's' : ''} members`}>
            <div className='player_list'>
                {
                    filteredMemberships.slice(0, 5).map((membership) => {
                        return <TeamMember key={membership.id} membership={membership}/>
                    })
                }
                {
                    filteredMemberships.length > 5 &&
                    <SeeMore action={() => handleTab('members')} label={`${filteredMemberships.length - 5} more`} />
                }
            </div>
        </SectionContainer>
  )
}

export default PlayerMemberships
