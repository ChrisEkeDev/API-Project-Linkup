import React from 'react'
import { useSelector } from 'react-redux';
import PlayerItem from './playerItem';

function PlayerList() {
  const data = useSelector(state => state.checkIns.sessionCheckIns)
  const currentPlayers = Object.values(data);

  return (
    <ul className='players__list'>
        {
          currentPlayers.map(player => (
            <PlayerItem player={player.player}/>
          ))
        }
    </ul>
  )
}

export default PlayerList
