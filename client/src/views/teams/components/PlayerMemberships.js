import React from 'react'
import TeamMember from './TeamMember';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTeamMemberships } from '../../../store/teams';
import ClickDragScroll from '../../../components/shared/clickDragScroll';

function PlayerMemberships() {
    const { id } = useParams();
    const {
        data: memberships,
        error: membershipsErr,
        isLoading: membershipsLoading
    } = useQuery(['team-memberships', id], () => getTeamMemberships(id))

    if (membershipsLoading) return <div>Loading..</div>
    if (membershipsErr) return <div>Error</div>

    let filteredMemberships = memberships.filter(x => x.status !== 'pending')

    return (
        <ClickDragScroll title={`${filteredMemberships.length} Member${filteredMemberships.length === 1 ? null : 's'}`}>
            {
                filteredMemberships.map((membership) => {
                    return <TeamMember key={membership.id} membership={membership}/>
                })
            }
        </ClickDragScroll>
  )
}

export default PlayerMemberships
