import React, { useEffect } from 'react'
import SessionItem from './SessionItem';
import useSessions from '../hooks/useSessions';
import { sortFunctions } from '../../../constants/constants';
import { useApp } from '../../..//context/AppContext';

function SessionsList() {
    const [ sessions ] = useSessions();
    const { sortBy } = useApp();

    return (
        <ul className='session--list'>
            {sessions.sort(sortFunctions[sortBy]).map(session => (
                <SessionItem session={session} key={session.id}/>
            ))}
        </ul>
    )
}

export default SessionsList
