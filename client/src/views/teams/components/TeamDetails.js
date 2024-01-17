import React from 'react';
import DetailsMembers from './DetailsMembers';
import { useSelector } from 'react-redux'
import Scroll from '../../../components/shared/scroll';
import LatestMessages from '../../../components/shared/chat/LatestMessages';
import TeamSessions from './TeamSessions';

function TeamDetails() {
    const singleTeam = useSelector(state => state.teams.singleTeam);
    const teamMemberships = useSelector(state => state.memberships.teamMemberships)
    const teamMembershipsArr = Object.values(teamMemberships)
    const teamSessions = useSelector(state => state.teams.teamSessions)
    const teamSessionsArr = Object.values(teamSessions)


    return (
        <Scroll>
            <DetailsMembers
                memberships={teamMembershipsArr}
            />
            <LatestMessages
                entity={singleTeam}
            />
            <TeamSessions
                sessions={teamSessionsArr}
            />
        </Scroll>
    )
}

export default TeamDetails
