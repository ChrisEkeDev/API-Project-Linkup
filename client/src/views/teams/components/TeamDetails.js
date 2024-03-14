import React from 'react';
import PlayerMemberships from './PlayerMemberships';
import Scroll from '../../../components/shared/scroll';
import LatestMessages from '../../../components/shared/chat/LatestMessages';
import TeamSessions from './TeamSessions';

function TeamDetails({team, handleTab}) {

    return (
        <Scroll>
            <PlayerMemberships handleTab={handleTab} />
            <TeamSessions />
            {/* <LatestMessages entity={team} /> */}
        </Scroll>
    )
}

export default TeamDetails
