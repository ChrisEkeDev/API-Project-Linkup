import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function useSessions() {
    const sessionsData = useSelector(state => state.sessions.allSessions);
    const allSessions = Object.values(sessionsData);
    const [sessions, setSessions ] = useState(allSessions);
    // console.log(new Date());
    // console.log(new Date(sessions[0].endDate))
    // console.log(new Date(sessions[0].endDate) > new Date());

    const filterSessions = () => {
        const newSessions = sessions.filter(session => new Date(session.endDate) > new Date());
        setSessions(newSessions);
    }

    useEffect(() => {
        filterSessions();
    }, [])

    return [sessions, setSessions]
}

export default useSessions
