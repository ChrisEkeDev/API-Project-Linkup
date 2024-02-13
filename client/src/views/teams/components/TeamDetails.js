import React from 'react';
import PlayerMemberships from './PlayerMemberships';
import Scroll from '../../../components/shared/scroll';
import LatestMessages from '../../../components/shared/chat/LatestMessages';
import TeamSessions from './TeamSessions';

function TeamDetails({team}) {

    return (
        <Scroll>
            <PlayerMemberships />
            {/* <LatestMessages entity={team} /> */}
            <TeamSessions />
        </Scroll>
    )
}

export default TeamDetails
