import React from 'react'
import { PiLockFill, PiLockOpen   } from 'react-icons/pi';

function PrivacyToggle(props) {
    const { data, handleToggle } = props;

    return (
        <>
            <div className='toggle_container' onClick={handleToggle}>
                <p className={`sm ${!data.private && 'bold'}`}>Public</p>
                    <div className='toggle_switch'>
                        <div className={`toggle_node ${data.private && 'on_private'}`}></div>
                    </div>
                <p className={`sm ${data.private && 'bold'}`}>Private</p>
            </div>
            <div className='tip'>
                {
                    data.private ?
                    <PiLockFill className='tip_icon'/> :
                    <PiLockOpen className='tip_icon'/>
                }
                <p className='sm bold'>
                {
                    data.private ?
                    'Private teams and sessions are inherently exclusive, requiring new players to gain acceptance by existing players with a rank of co-host or host for teams and the creator of the session.' :
                    'Public teams and sessions are accessible to all players, allowing them to join without needing approval from the host, co-host or the creator of the session.'
                }
                </p>
            </div>
        </>
    )
}

export default PrivacyToggle
