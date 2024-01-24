import React, { useEffect } from 'react';
import DetailsMembers from './DetailsMembers';
import { useApp } from '../../../context/AppContext';
import { useSelector } from 'react-redux'
import Scroll from '../../../components/shared/scroll';
import LatestMessages from '../../../components/shared/chat/LatestMessages';
import { thunkGetSingleTeam } from '../../../store/teams'
import TeamSessions from './TeamSessions';

function TeamDetails() {
    const { dispatch } = useApp();
    const singleTeam = useSelector(state => state.teams.singleTeam);
    const teamMemberships = useSelector(state => state.memberships.teamMemberships)
    const teamMembershipsArr = Object.values(teamMemberships)
    const teamSessions = useSelector(state => state.teams.teamSessions)
    const teamSessionsArr = Object.values(teamSessions)

    useEffect(() => {
        dispatch(thunkGetSingleTeam(singleTeam.id))
    }, [])

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
