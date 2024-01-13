import React from 'react'
import { PiLockFill, PiLockOpen   } from 'react-icons/pi';

function PrivacyToggle(props) {
    const { teamData, handleToggle } = props;

    return (
        <>
            <div className='toggle_container' onClick={handleToggle}>
                <p className={`sm ${!teamData.private && 'bold'}`}>Public</p>
                    <div className='toggle_switch'>
                        <div className={`toggle_node ${teamData.private && 'on_private'}`}></div>
                    </div>
                <p className={`sm ${teamData.private && 'bold'}`}>Private</p>
            </div>
            <div className='tip'>
                {
                    teamData.private ?
                    <PiLockFill className='tip_icon'/> :
                    <PiLockOpen className='tip_icon'/>
                }
                <p className='sm bold'>
                {
                    teamData.private ?
                    'Private teams are inherently exclusive, requiring new members to gain acceptance by existing members with a rank of co-host or host.' :
                    'Public teams are accessible to all players, allowing them to join without needing approval from the host or co-host.'
                }
                </p>
            </div>
        </>
    )
}

export default PrivacyToggle
