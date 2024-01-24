import React from 'react'
import { useSelector } from 'react-redux'
import { thunkDeleteSession } from '../../../store/sessions'
import { useApp } from '../../../context/AppContext';

function useDeleteSession() {
    const { dispatch, navigate, handleAlerts, setLoading } = useApp();
    const sessionId = useSelector(state => state.sessions.singleSession).id;

    const deleteSession =  async () => {
        setLoading(true);
        try {
            const res = await dispatch(thunkDeleteSession(sessionId))
            handleAlerts(res)
            navigate('/sessions')
            if ( res.status >= 400) {
                throw new Error()
            }
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return { deleteSession }
}

export default useDeleteSession
