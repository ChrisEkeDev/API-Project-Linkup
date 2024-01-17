import React from 'react'
import { PiCircleBold, PiCheckCircleFill  } from "react-icons/pi";

function SessionHosts(props) {
    const { teams, handleHost, sessionData } = props;
    const currentHostId = sessionData.hostId;

    return (
        <ul className='container_border session_hosts'>
            <span className='section_label xs bold'>Select a Team to Host this Session (Optional)</span>
            {teams.map(team => (
                <li className='session_host' onClick={() => handleHost(team.Team.id)}>
                   {
                    team.Team.id === currentHostId ?
                    <PiCheckCircleFill className='lg' /> :
                    <PiCircleBold className='lg'/>
                   }
                   <div>
                        <p className='md bold'>{team.Team.name}</p>
                        <p>{team.status}</p>
                   </div>
                </li>
            ))}
        </ul>
    )
}

export default SessionHosts
