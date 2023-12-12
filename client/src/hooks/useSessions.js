import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetAllSessions } from '../Store/sessions';

const useSessions = () => {
    const dispatch = useDispatch();
    const sessionData = useSelector(state => state.sessions.allSessions);
    const sessions = Object.values(sessionData);

    useEffect(() => {
        const getSessions = async () => {
            try {
                dispatch(thunkGetAllSessions())
            } catch(e) {
                console.log(e)
            }
        }
        getSessions();
    }, [dispatch])

    return { sessions }
}

export default useSessions
