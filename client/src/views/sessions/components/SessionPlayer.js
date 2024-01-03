import React from 'react';
import ProfileImage from '../../../components/shared/profileImage';

function SessionPlayer({checkIn}) {
    const { player } = checkIn;

    return (
        <li title={player.name} className='session_player'>
            <ProfileImage
                player={player}
                size={4}
            />
            {/* <p className='xs'>{player?.name}</p> */}
        </li>
    )
}

export default SessionPlayer
