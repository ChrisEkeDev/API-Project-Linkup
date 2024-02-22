import React from 'react'
import { useApp } from '../../../context/AppContext';
import { TbLockOpen, TbLock } from 'react-icons/tb'
import SectionContainer from '../layout/SectionContainer';

function PrivacyToggle(props) {
    const { data, handleToggle } = props;
    const { theme } = useApp();

    return (
        <SectionContainer title='Public or Private'>
            <div className={`toggle_container toggle_container-${theme}`} onClick={handleToggle}>
                <p className={`sm ${!data.private && 'bold'}`}>Public</p>
                    <div className='toggle_switch'>
                        <div className={`toggle_node ${data.private && 'on_private'}`}></div>
                    </div>
                <p className={`sm ${data.private && 'bold'}`}>Private</p>
            </div>
            <div className={`tip tip-${theme}`}>
                {
                    data.private ?
                    <TbLock className='tip_icon'/> :
                    <TbLockOpen className='tip_icon'/>
                }
                <p className='sm bold'>
                {
                    data.private ?
                    'Private teams and sessions are inherently exclusive, requiring new players to gain acceptance by existing players with a rank of co-host or host for teams and the creator of the session.' :
                    'Public teams and sessions are accessible to all players, allowing them to join without needing approval from the host, co-host or the creator of the session.'
                }
                </p>
            </div>
        </SectionContainer>
    )
}

export default PrivacyToggle
