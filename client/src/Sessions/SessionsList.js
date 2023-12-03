import React, { useEffect } from 'react'
import SessionItem from './SessionItem';
import useSessions from './hooks/useSessions';
import { sortFunctions } from '../Shared/constants/predefinedValues';
import { useApp } from '../App/Context/AppContext';

function SessionsList() {
    const [ sessions ] = useSessions();
    const { sortBy } = useApp();

    return (
        <div className='sessions__results_list--wrapper'>
            <ul className='sessions__results_list--contents'>
                {sessions.sort(sortFunctions[sortBy]).map(session => (
                    <SessionItem session={session} key={session.id}/>
                ))}
            </ul>
        </div>
    )
}

export default SessionsList
