import React from 'react'

function PlayerItem({player}) {
  return (
    <li className='players__item'>
        <div className='players__item--wrapper'>
          <div className='players__item--image' style={{backgroundImage: `url(${player.profileImage})`}}/>
        </div>
        <span className='players__item--name'>{player?.name}</span>
    </li>
  )
}

export default PlayerItem
