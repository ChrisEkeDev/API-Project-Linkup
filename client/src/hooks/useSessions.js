import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetAllSessions } from '../store/sessions';

const useSessions = () => {
    const dispatch = useDispatch();
    const sessionData = useSelector(state => state.sessions.allSessions);
    const sessions = Object.values(sessionData);
    const [ loading, setLoading] = useState(true)

    useEffect(() => {
        const getSessions = async () => {
            try {
                const res = await dispatch(thunkGetAllSessions());
                if (res.status === 200) {
                    setLoading(false)
                }
            } catch(e) {
                console.log(e)
            }
        }
        getSessions()
    }, [dispatch])

    return { loading, sessions }
}

export default useSessions
